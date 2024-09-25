"use client";

import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import InterfaceImage from "/assets/vi-mongo/interface-dark.png";
import { FeatureCard } from "@/components/FeatureCard";
import { Eye, Filter, Layout, Palette, Wrench, Zap } from "lucide-react";

const words = [
  { text: "Manage" },
  { text: "MongoDB", className: "dark:text-[#1a3626]" },
  { text: "with" },
  { text: "Vi" },
  { text: "Mongo" },
];

const MainPage = () => {
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { amount: 0.2 }); // Removed 'once: true'

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
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            A fast and efficient CLI tool for MongoDB database management,
            designed for developers who love to work in the terminal.
          </p>
          <div className="mt-10 space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-[#112419] hover:bg-[#1a3626] text-white"
            >
              <a href="/showcase">Showcase</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-white border-[#112419] hover:bg-[#112419] hover:text-white"
            >
              <a href="/docs/installation">How to install</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-[0_0_50px_rgba(17,36,25,0.5)]"
        >
          <div className="overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
            <Image
              src={InterfaceImage}
              alt="Vi Mongo Interface"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <section ref={featuresRef} className="mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Vi Mongo provides the following features:
          </motion.h2>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
          >
            <FeatureCard
              icon={<Eye className="w-6 h-6" />}
              title="Document View and Modification"
              description="Easily view and modify MongoDB documents with an intuitive interface."
            />
            <FeatureCard
              icon={<Filter className="w-6 h-6" />}
              title="Smart Filtering and Sorting"
              description="Filter and sort data with autocomplete for efficient data management."
            />
            <FeatureCard
              icon={<Layout className="w-6 h-6" />}
              title="Versatile Views"
              description="Multiple view options to suit different data exploration needs."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Intelligent Peeking"
              description="Quick data preview with a smart highlight system for faster insights."
            />
            <FeatureCard
              icon={<Wrench className="w-6 h-6" />}
              title="Simple Configuration"
              description="Easy setup and configuration to get you started quickly."
            />
            <FeatureCard
              icon={<Palette className="w-6 h-6" />}
              title="Theme Customization"
              description="Multiple themes to personalize your MongoDB management experience."
            />
          </motion.div>
        </section>
      </main>
    </div>
  );
};
export default MainPage;
