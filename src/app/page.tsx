"use client";

import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import InterfaceImageDark from "/assets/vi-mongo/interface-dark.png";
import InterfaceImageLight from "/assets/vi-mongo/interface-light.png";

const words = [
  { text: "Manage" },
  { text: "MongoDB" },
  { text: "with" },
  { text: "Vi-Mongo" },
];

const MainPage = () => {
  const { resolvedTheme } = useTheme();

  const getInterfaceImage = () => {
    return resolvedTheme === "dark" ? InterfaceImageDark : InterfaceImageLight;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow px-4 py-12">
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
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A fast and efficient CLI tool for MongoDB database management,
            designed for developers who love working in the terminal.
          </p>
          <div className="mt-10 space-x-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <a href="/showcase">Showcase</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/docs/installation">How to install</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden"
        >
          <div className="overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
            <Image
              src={getInterfaceImage()}
              alt="Vi Mongo Interface"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by [No one yet]
          </h2>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
