'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import Image from 'next/image';
import LogoSvg from '/assets/logo/logo-no-background.svg';
import { Button } from "@/components/ui/button";
import GithubSvc from '/assets/github-mark/github-mark.svg';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-foreground p-4 fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center">
            <Image src={LogoSvg} alt="Logo" width={120} height={40} />
          </Link>
          <Link href="/showcase" className="text-foreground hover:text-primary font-medium">
            Showcase
          </Link>
          <Link href="/docs" className="text-foreground hover:text-primary font-medium">
            Docs
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {pathname.startsWith('/docs') && <ThemeToggle />}
          <Button
            variant="outline"
            size="icon"
            asChild
          >
            <a
              href="https://github.com/kopecmaciej/vi-mongo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={GithubSvc} alt="GitHub" className="h-4 w-4 dark:invert" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
