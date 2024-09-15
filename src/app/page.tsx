"use client";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { motion } from "framer-motion";
import Image from "next/image";
import InterfaceImage from "/assets/vi-mongo/interface.png";
// Add these imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const words = [
  { text: "Manage" },
  { text: "MongoDB" },
  { text: "with" },
  { text: "Vi Mongo" },
];

const MainPage = () => {
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
          className="relative w-full max-w-6xl mx-auto rounded-md overflow-hidden shadow-2xl"
        >
          <Image
            src={InterfaceImage}
            alt="Vi Mongo Interface"
          />
        </motion.div>

        <section id="features" className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {feature.icon}
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by [No one yet]</h2>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const features = [
  {
    icon: "🚀",
    title: "Fast Performance",
    description: "Optimized for speed, Vi Mongo ensures quick database operations.",
  },
  {
    icon: "🔒",
    title: "Secure Access",
    description: "Built-in security features to protect your MongoDB data.",
  },
  {
    icon: "🖥️",
    title: "Intuitive UI",
    description: "User-friendly terminal interface for efficient database management.",
  },
  // Add more features as needed
];

export default MainPage;
