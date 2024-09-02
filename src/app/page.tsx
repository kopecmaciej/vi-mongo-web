'use client'

import React from 'react';
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";

const words = [
  {
    text: "Manage",
  },
  {
    text: "MongoDB",
  },
  {
    text: "with",
  },
  {
    text: "Vi-Mongo",
  },
];

const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <TypewriterEffect words={words} />
          <TextGenerateEffect words="Intuitive Terminal UI for MongoDB" />
          <p className="mt-4 text-xl text-gray-300">
            A fast and efficient CLI tool for MongoDB database management.
          </p>
          <div className="mt-8 space-x-4">
            <Button asChild>
              <a href="#features">Features</a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/kopecmaciej/vi-mongo#installation">Install</a>
            </Button>
          </div>
        </motion.div>
        
        <section id="features" className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Intuitive Navigation for MongoDB databases</li>
            <li>Document Management: View, create, update, duplicate, and delete</li>
            <li>Collection Management: Create and delete collections</li>
            <li>Autocomplete for collection names, database names, and MongoDB commands</li>
            <li>Query History for easy access to previous queries</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
