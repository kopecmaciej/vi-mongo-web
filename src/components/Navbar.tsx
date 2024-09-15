'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import Image from 'next/image';
import LogoSvg from '/assets/logo/logo-no-background.svg';
import { Button } from "@/components/ui/button";
import GithubSvc from '/assets/github-mark/github-mark.svg';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center">
            <Image src={LogoSvg} alt="Logo" width={120} height={40} />
          </Link>
          <Link href="/showcase" className="text-gray-700 hover:text-green-600 font-medium">
            Showcase
          </Link>
          <Link href="/docs" className="text-gray-700 hover:text-blue-600 font-medium">
            Docs
          </Link>
        </div>
        <div className="flex items-center space-x-6">
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
              <Image src={GithubSvc} alt="GitHub" className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
