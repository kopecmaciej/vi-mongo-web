"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import Github from "/public/github.svg";
import LogoSvg from "/public/logo/logo-no-background.svg";

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div
      className={`text-foreground p-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-gradient-custom-dark" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center">
            <Image src={LogoSvg} alt="Logo" width={120} height={40} />
          </Link>
          <Link
            href="/showcase"
            className="text-foreground hover:text-primary font-medium"
          >
            Showcase
          </Link>
          <Link
            href="/docs"
            className="text-foreground hover:text-primary font-medium"
          >
            Docs
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {pathname.startsWith("/docs") && <ThemeToggle />}
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com/kopecmaciej/vi-mongo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={Github}
                alt="GitHub"
                className="h-4 w-4 dark:invert"
              />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
