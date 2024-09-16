"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const features = [
  {
    title: "Intuitive Command Interface",
    description: "Navigate and manage your MongoDB databases with ease using familiar vi-like commands.",
    icon: "🖥️",
  },
  {
    title: "Real-time Data Visualization",
    description: "View your data in customizable tables and charts for quick insights.",
    icon: "📊",
  },
  {
    title: "Advanced Query Builder",
    description: "Construct complex queries with a user-friendly interface, no need to memorize syntax.",
    icon: "🔍",
  },
  {
    title: "Performance Optimization",
    description: "Identify and optimize slow queries with built-in performance analysis tools.",
    icon: "⚡",
  },
];

export const Showcase = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose vi-mongo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900 text-white">
                <CardContent className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
                <CardFooter className="text-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Learn More
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
