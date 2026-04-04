'use client';
import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight03Icon } from '@hugeicons/core-free-icons';
import { useQuery } from '@tanstack/react-query';

import { GithubIcon } from '../customIcons';

const GitHubHeaderBtn: React.FC = () => {
  const { data: stars } = useQuery({
    queryKey: ['github-stars'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/repos/taqui-786/taqui');
      if (!res.ok) return null;
      const data = await res.json();
      return data.stargazers_count as number;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  });

  const formattedStars = stars !== undefined && stars !== null
    ? new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(stars)
    : '00';

  return (
    <a href="https://github.com/taqui-786/taqui" target="_blank" rel="noreferrer">
      <div className="text-title group flex items-center gap-2 border-r pr-2">
        <GithubIcon size='20' className='group-hover:hidden block transition-all duration-300 ease-in-out' />
        <HugeiconsIcon icon={ArrowUpRight03Icon} className='size-5 group-hover:block hidden transition-all duration-300 ease-in-out' />
        <span className="text-sm"> {formattedStars}</span>
      </div>
    </a>
  );
};

export default GitHubHeaderBtn;
