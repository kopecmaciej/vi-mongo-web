"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  Book,
  ChevronDown,
  ChevronUp,
  Download,
  Home,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const sidebar = [
  { name: "Introduction", href: "/docs/introduction", icon: Home },
  { name: "Installation", href: "/docs/installation", icon: Download },
  { name: "Usage", href: "/docs/usage", icon: Book },
  {
    name: "Configuration",
    href: "/docs/configuration",
    icon: Settings,
    children: [
      {
        name: "General Configuration",
        href: "/docs/configuration#general-configuration",
      },
      { name: "Styling", href: "/docs/configuration#styling-configuration" },
      {
        name: "Keybindings",
        href: "/docs/configuration#keybindings-configuration",
      },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="container mx-auto py-10 flex">
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 mr-8 hidden md:block"
      >
        <ScrollArea className="h-[calc(100vh-100px)] pr-4">
          <div className="space-y-2">
            {sidebar.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <div key={item.name}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start text-sm ${
                      isActive
                        ? "bg-secondary text-secondary-foreground font-semibold"
                        : "hover:bg-secondary/50 transition-colors"
                    }`}
                    asChild
                  >
                    <Link href={item.href} className="flex items-center">
                      <Icon size={20} className="mr-2" />
                      {item.name}
                      {item.children && (
                        <button
                          onClick={() => toggleSection(item.name)}
                          className="ml-auto"
                        >
                          {expandedSections.includes(item.name) ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </button>
                      )}
                    </Link>
                  </Button>
                  {item.children && expandedSections.includes(item.name) && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Button
                            key={child.name}
                            variant={isChildActive ? "secondary" : "ghost"}
                            className={`w-full justify-start text-sm ${
                              isChildActive
                                ? "bg-secondary text-secondary-foreground font-semibold"
                                : "hover:bg-secondary/50 transition-colors"
                            }`}
                            asChild
                          >
                            <Link
                              href={child.href}
                              className="flex items-center"
                            >
                              {child.name}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </motion.aside>
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
}
