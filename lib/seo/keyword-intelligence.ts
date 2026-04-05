import { blogConfig } from "@/app/config/blogConfig";
import { experienceConfig } from "@/app/config/experienceConfig";
import { allProjects } from "@/app/config/projectConfig";
import { techStack } from "@/app/config/techstack";

type DevToTag = {
  name?: string;
};

type HackerNewsItem = {
  type?: string;
  title?: string;
  score?: number;
};

const DEV_TO_TAGS_ENDPOINT = "https://dev.to/api/tags?per_page=40";
const HN_TOP_STORIES_ENDPOINT =
  "https://hacker-news.firebaseio.com/v0/topstories.json";
const HN_ITEM_ENDPOINT = "https://hacker-news.firebaseio.com/v0/item";

const CACHE_REVALIDATE_SECONDS = 60 * 60 * 12;
export const SEO_KEYWORD_CACHE_TAG = "seo-keyword-trends-v1";

const CORE_BRAND_KEYWORDS = [
  "md taqui imam",
  "taqui imam",
  "taqui",
  "imam",
  "taqui in",
  "taqui.in",
  "md taqui",
  "md taqui imam developer",
];

const PORTFOLIO_INTENT_KEYWORDS = [
  "software engineer",
  "full stack developer",
  "web developer",
  "frontend developer",
  "backend developer",
  "javascript developer",
  "typescript developer",
  "next.js developer",
  "react developer",
  "developer portfolio",
  "software developer portfolio",
];

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "up",
  "with",
  "your",
  "show",
  "ask",
  "new",
  "best",
  "using",
  "use",
  "this",
]);

const TECH_SIGNAL_TERMS = new Set([
  "ai",
  "api",
  "backend",
  "cloud",
  "code",
  "coding",
  "css",
  "database",
  "dev",
  "developer",
  "devops",
  "engineering",
  "frontend",
  "fullstack",
  "git",
  "github",
  "javascript",
  "nextjs",
  "nodejs",
  "openai",
  "postgres",
  "postgresql",
  "programming",
  "python",
  "react",
  "redux",
  "rust",
  "saas",
  "software",
  "tailwind",
  "typescript",
  "web",
  "webdev",
]);

const KEYWORD_ALIASES: Record<string, string> = {
  nextjs: "next.js",
  reactjs: "react",
  nodejs: "node.js",
  webdev: "web development",
  frontend: "frontend development",
  backend: "backend development",
  fullstack: "full stack development",
  javascript: "javascript",
  typescript: "typescript",
};

function normalizeKeyword(value: string): string | null {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9.+#\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return null;

  const aliased = KEYWORD_ALIASES[cleaned] ?? cleaned;
  const tokens = aliased.split(" ");

  if (tokens.length === 1) {
    if (aliased.length < 2 || STOP_WORDS.has(aliased)) return null;
  }

  if (!/[a-z]/.test(aliased)) return null;
  if (aliased.length > 48) return null;

  return aliased;
}

function extractWords(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function isLikelyTechKeyword(keyword: string, domainSet: Set<string>): boolean {
  if (domainSet.has(keyword)) return true;

  const compact = keyword.replace(/\./g, "").replace(/\s+/g, "");
  if (TECH_SIGNAL_TERMS.has(compact)) return true;

  return keyword.split(" ").some((token) => {
    const normalizedToken = token.replace(/\./g, "");
    return TECH_SIGNAL_TERMS.has(normalizedToken);
  });
}

function addKeyword(
  scoreMap: Map<string, number>,
  rawKeyword: string,
  score: number,
  domainSet: Set<string>
) {
  const normalized = normalizeKeyword(rawKeyword);
  if (!normalized) return;
  if (!isLikelyTechKeyword(normalized, domainSet)) return;

  scoreMap.set(normalized, (scoreMap.get(normalized) ?? 0) + score);
}

function collectDomainKeywords(): Set<string> {
  const keywords = new Set<string>();

  const addMany = (values: string[]) => {
    for (const value of values) {
      const normalized = normalizeKeyword(value);
      if (normalized) keywords.add(normalized);
    }
  };

  addMany(CORE_BRAND_KEYWORDS);
  addMany(PORTFOLIO_INTENT_KEYWORDS);

  for (const stack of Object.values(techStack)) {
    addMany([stack.name]);
  }

  for (const project of allProjects) {
    addMany([project.name, project.description, ...project.features]);
    addMany(project.technologies.map((tech) => tech.name));
  }

  for (const blog of blogConfig) {
    addMany([blog.title, ...blog.tags]);
  }

  for (const experience of experienceConfig) {
    addMany([
      experience.position,
      ...experience.technologies.map((tech) => tech.name),
      ...experience.description,
    ]);
  }

  const tokenCandidates = new Set<string>();
  for (const keyword of keywords) {
    for (const token of extractWords(keyword)) {
      if (token.length > 2 && !STOP_WORDS.has(token)) {
        tokenCandidates.add(token);
      }
    }
  }

  for (const token of tokenCandidates) {
    const normalized = normalizeKeyword(token);
    if (normalized) keywords.add(normalized);
  }

  return keywords;
}

function extractTechKeywordsFromHeadline(
  title: string,
  domainSet: Set<string>
): string[] {
  const tokens = extractWords(title).filter(
    (token) => token.length > 2 && !STOP_WORDS.has(token)
  );

  const extracted = new Set<string>();

  for (const token of tokens) {
    const normalized = normalizeKeyword(token);
    if (!normalized) continue;
    if (isLikelyTechKeyword(normalized, domainSet)) extracted.add(normalized);
  }

  for (let i = 0; i < tokens.length - 1; i += 1) {
    const phrase = `${tokens[i]} ${tokens[i + 1]}`;
    const normalized = normalizeKeyword(phrase);
    if (!normalized) continue;
    if (isLikelyTechKeyword(normalized, domainSet)) extracted.add(normalized);
  }

  return Array.from(extracted);
}

async function fetchDevToTrendingTags(): Promise<string[]> {
  try {
    const response = await fetch(DEV_TO_TAGS_ENDPOINT, {
      headers: { "user-agent": "portfolio-seo-keywords/1.0" },
      next: {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: [SEO_KEYWORD_CACHE_TAG],
      },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as DevToTag[];
    if (!Array.isArray(data)) return [];

    return data
      .map((tag) => tag.name)
      .filter((name): name is string => Boolean(name));
  } catch {
    return [];
  }
}

async function fetchHackerNewsTitles(): Promise<Array<{ title: string; score: number }>> {
  try {
    const topStoriesResponse = await fetch(HN_TOP_STORIES_ENDPOINT, {
      headers: { "user-agent": "portfolio-seo-keywords/1.0" },
      next: {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: [SEO_KEYWORD_CACHE_TAG],
      },
    });

    if (!topStoriesResponse.ok) return [];

    const storyIds = (await topStoriesResponse.json()) as number[];
    if (!Array.isArray(storyIds) || storyIds.length === 0) return [];

    const targetIds = storyIds.slice(0, 20);
    const stories = await Promise.all(
      targetIds.map(async (id) => {
        try {
          const response = await fetch(`${HN_ITEM_ENDPOINT}/${id}.json`, {
            headers: { "user-agent": "portfolio-seo-keywords/1.0" },
            next: {
              revalidate: CACHE_REVALIDATE_SECONDS,
              tags: [SEO_KEYWORD_CACHE_TAG],
            },
          });

          if (!response.ok) return null;

          const item = (await response.json()) as HackerNewsItem;
          if (item?.type !== "story" || !item.title) return null;

          return {
            title: item.title,
            score: item.score ?? 1,
          };
        } catch {
          return null;
        }
      })
    );

    return stories.filter(
      (story): story is { title: string; score: number } => Boolean(story)
    );
  } catch {
    return [];
  }
}

export async function getSeoKeywordPool(limit = 32): Promise<string[]> {
  const domainKeywords = collectDomainKeywords();
  const scoreMap = new Map<string, number>();

  for (const keyword of CORE_BRAND_KEYWORDS) {
    addKeyword(scoreMap, keyword, 50, domainKeywords);
  }

  for (const keyword of PORTFOLIO_INTENT_KEYWORDS) {
    addKeyword(scoreMap, keyword, 24, domainKeywords);
  }

  for (const keyword of domainKeywords) {
    addKeyword(scoreMap, keyword, 12, domainKeywords);
  }

  const [devToTags, hackerNewsStories] = await Promise.all([
    fetchDevToTrendingTags(),
    fetchHackerNewsTitles(),
  ]);

  devToTags.forEach((tag, index) => {
    const weight = Math.max(4, 30 - index);
    addKeyword(scoreMap, tag, weight, domainKeywords);
  });

  hackerNewsStories.forEach((story, index) => {
    const headlineWeight = Math.max(3, 25 - index) + Math.max(1, story.score / 40);
    const headlineKeywords = extractTechKeywordsFromHeadline(
      story.title,
      domainKeywords
    );

    for (const keyword of headlineKeywords) {
      addKeyword(scoreMap, keyword, headlineWeight, domainKeywords);
    }
  });

  const sortedKeywords = Array.from(scoreMap.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .map(([keyword]) => keyword);

  if (sortedKeywords.length === 0) {
    return [...CORE_BRAND_KEYWORDS, ...PORTFOLIO_INTENT_KEYWORDS].slice(0, limit);
  }

  return sortedKeywords.slice(0, limit);
}
