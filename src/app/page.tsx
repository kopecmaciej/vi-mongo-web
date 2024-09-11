"use client";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { motion } from "framer-motion";

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
    text: "Vi Mongo",
  },
];

const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
              <a href="https://github.com/kopecmaciej/vi-mongo#installation">
                Install
              </a>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
