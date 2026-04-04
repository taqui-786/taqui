"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
];
function HeaderNavLinks() {
  const params = usePathname();
  return (
    <nav className="flex items-center gap-3 md:gap-4 text">
      <AnimatePresence>
        {params !== "/" && (
          <motion.div
            initial={{ opacity: 0, width: 0, scale: 0.9 }}
            animate={{ opacity: 1, width: 44, scale: 1 }}
            exit={{ opacity: 0, width: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            style={{ originX: 0 }}
            className="overflow-hidden shrink-0 will-change-auto"
          >
            <Link href="/" className="block w-11 h-11">
              <div className="size-11 rounded-md bg-blue-300 overflow-hidden flex items-end p-0">
                <Image
                  src={"/taqui-removebg-preview.png"}
                  alt="logo"
                  loading="lazy"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover scale-[1.3] translate-y-1.5 transition-transform duration-200 ease-in-out hover:scale-125"
                />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          data-active={params === link.href && params !== "/"}
          className="[@media(hover:hover)_and_(pointer:fine)]:hover:underline text-title [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-2 [@media(hover:hover)_and_(pointer:fine)]:hover:underline-offset-4 data-[active=true]:underline-offset-4 data-[active=true]:decoration-2 data-[active=true]:underline transition-all"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default HeaderNavLinks;
