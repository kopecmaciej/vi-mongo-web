'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebar = [
  { name: 'Introduction', href: '/docs/introduction' },
  { name: 'Installation', href: '/docs/installation' },
  { name: 'Getting Started', href: '/docs/getting-started' },
  { name: 'Features', href: '/docs/features' },
  { name: 'Usage', href: '/docs/usage' },
  { name: 'Configuration', href: '/docs/configuration' },
  { name: 'Troubleshooting', href: '/docs/troubleshooting' },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

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
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start text-sm ${
                    isActive 
                      ? 'bg-secondary text-secondary-foreground font-semibold'
                      : 'hover:bg-secondary/50 transition-colors'
                  }`}
                  asChild
                >
                  <Link href={item.href} className="flex items-center">
                    {item.name}
                  </Link>
                </Button>
              )
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
  )
}