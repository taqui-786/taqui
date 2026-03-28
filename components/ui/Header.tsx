import GitHubHeaderBtn from "./GithubHeaderBtn";
import { Link } from "next-view-transitions";
import { ThemeTogglerButton } from "../animate-ui/components/buttons/theme-toggler";
import HeaderNavLinks from "./HeaderNavLinks";
import Image from "next/image";

function Header() {
  return (
    <header className="container mx-auto max-w-full md:max-w-3xl px-4 sticky top-0 z-50 rounded-md py-4 bg-background/95 supports-backdrop-filter:backdrop-blur-sm supports-backdrop-filter:bg-background/80">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <HeaderNavLinks />
        </div>

        <div className="flex items-center gap-2">
          <GitHubHeaderBtn />

          <ThemeTogglerButton
            variant={"secondary"}
            size={"lg"}
            direction="ttb"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
