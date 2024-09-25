"use client";

import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Eye, Filter, Layout, Palette, Wrench, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AutocompleteImage from "/assets/vi-mongo/autocomplete.png";
import ConnectionListImage from "/assets/vi-mongo/connection-list.png";
import InterfaceImage from "/assets/vi-mongo/interface.png";
import ThemeSwitcherImage from "/assets/vi-mongo/theme-switcher.png";

const words = [
  { text: "Manage" },
  { text: "MongoDB", className: "dark:text-green-900" },
  { text: "with" },
  { text: "Vi" },
  { text: "Mongo" },
];

const MainPage = () => {
  const { setTheme } = useTheme();
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { amount: 0.2 });

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  const images = [
    {
      src: InterfaceImage,
      description: "Intuitive interface",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      src: ConnectionListImage,
      description: "Change and manage connections easly",
      icon: <Layout className="w-6 h-6" />,
    },
    {
      src: AutocompleteImage,
      description: "Autocompletion and syntax validation",
      icon: <Filter className="w-6 h-6" />,
    },
    {
      src: ThemeSwitcherImage,
      description: "Theme Customization",
      icon: <Palette className="w-6 h-6" />,
    },
  ];

  const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <div className="container flex flex-col mx-auto rounded-lg overflow-hidden">
        <div className="flex justify-between p-4 gap-4">
          {images.map((image, index) => (
            <motion.button
              key={index}
              className={`flex flex-col border-2 border-green-950 items-center py-2 rounded-lg ${
                index === currentIndex ? "bg-green-800" : "hover:bg-green-700"
              } flex-1`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-green-800 p-2 rounded-full mb-2">
                {image.icon}
              </div>
              <p className="text-sm text-white text-center">{image.description}</p>
            </motion.button>
          ))}
        </div>
        <div className="relative h-[800px]">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex].src}
                alt={`Feature ${currentIndex + 1}`}
                objectFit="contain"
                className="rounded-b-lg"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
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
            duration={1}
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
        >
          <Carousel />
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
