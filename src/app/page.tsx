"use client";

import { Carousel } from "@/components/Home/Carousel";
import { FeatureCard } from "@/components/Home/FeatureCard";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { WobbleCard } from "@/components/ui/wobble-card";
import { motion, useInView } from "framer-motion";
import {
  Eye,
  Filter,
  GitBranch,
  Keyboard,
  Layout,
  Palette,
  Server,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MainPage = () => {
  const { setTheme } = useTheme();
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { amount: 0.2 });

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow px-4 py-12">
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-0 md:pt-10">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            <TypewriterEffect
              words={[
                { text: "Manage" },
                { text: "MongoDB", className: "dark:text-green-700 " },
                { text: "with" },
              ]}
              className="sm:text-2xl md:text-4xl lg:text-7xl mb-6"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Image
                src="/logo/logo-no-background.svg"
                alt="Vi Mongo Logo"
                width={400}
                height={100}
                className="inline-block"
              />
            </motion.div>
          </h1>
          <TextGenerateEffect
            words={
              "A fast and efficient CLI tool for MongoDB database management, designed for developers who love to work in the terminal."
            }
            className="dark:text-gray-300 max-w-2xl text-center mx-auto"
          />
          <div className="mt-10 flex justify-center space-x-4">
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
        </div>
        <Carousel />

        {/* Why Vi Mongo */}
        <section className="mt-20 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefits of Vi Mongo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            <WobbleCard containerClassName="bg-[#112419] h-full">
              <div className="flex flex-col items-center text-center">
                <Terminal className="w-12 h-12 mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
                <p className="text-sm text-gray-300">
                  While it&apos;s not a full replacement for apps like MongoDB
                  Compass, it&apos;s a great tool for everyday tasks.
                </p>
              </div>
            </WobbleCard>
            <WobbleCard containerClassName="bg-[#112419] h-full">
              <div className="flex flex-col items-center text-center">
                <Keyboard className="w-12 h-12 mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">
                  Lightning-Fast Interactions
                </h3>
                <p className="text-sm text-gray-300">
                  Terminal-based with keyboard shortcuts for rapid data entry
                  and modifications.
                </p>
              </div>
            </WobbleCard>
            <WobbleCard containerClassName="bg-[#112419] h-full">
              <div className="flex flex-col items-center text-center">
                <Server className="w-12 h-12 mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">Server-Friendly</h3>
                <p className="text-sm text-gray-300">
                  Ideal for servers without desktop environments, ensuring
                  seamless management anywhere.
                </p>
              </div>
            </WobbleCard>
            <WobbleCard containerClassName="bg-[#112419] h-full">
              <div className="flex flex-col items-center text-center">
                <GitBranch className="w-12 h-12 mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">
                  Continuous Evolution
                </h3>
                <p className="text-sm text-gray-300">
                  Actively developed with regular updates, bringing you features
                  and improvements.
                </p>
              </div>
            </WobbleCard>
          </div>
        </section>

        <section ref={featuresRef} className="mt-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Additional Features
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

        <section>
          <div className="flex justify-center">
            <Image
              src={`/vi-mongo/autocomplete_laptop.webp`}
              alt="Autocomplete laptop"
              width={2400}
              height={1350}
              quality={100}
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              className="w-full h-auto max-w-[1920px] mx-auto"
            />
          </div>
        </section>
      </div >
    </div >
  );
};

export default MainPage;
