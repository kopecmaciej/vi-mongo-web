"use client";

import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto py-10 flex">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow max-w-3xl px-4 sm:px-6 lg:px-8"
      >
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default Layout;