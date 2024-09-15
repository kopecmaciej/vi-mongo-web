"use client";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { motion } from "framer-motion";
import Image from "next/image";
import InterfaceImage from "/assets/vi-mongo/interface.png";

const words = [
  { text: "Manage" },
  { text: "MongoDB" },
  { text: "with" },
  { text: "Vi Mongo" },
];

const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <TypewriterEffect words={words} />
          <TextGenerateEffect
            words="Intuitive Terminal UI for MongoDB"
            className="text-2xl mt-4"
          />
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            A fast and efficient CLI tool for MongoDB database management,
            designed for developers who love working in the terminal.
          </p>
          <div className="mt-10 space-x-4">
            <Button asChild size="lg">
              <a href="#features">Explore Features</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/docs/installation">
                Install Now
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl"
        >
          <Image
            src={InterfaceImage}
            alt="Vi Mongo Interface"
            layout="responsive"
            className="w-full h-auto"
          />
        </motion.div>

        <section id="features" className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          {/* Add your features here */}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
