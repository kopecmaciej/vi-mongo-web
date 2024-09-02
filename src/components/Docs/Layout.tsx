'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

const sidebar = [
  { name: 'About Vi Mongo', href: '/docs/about' },
  { name: 'Installation', href: '/docs/installation' },
  { name: 'Getting Started', href: '/docs/getting-started' },
  { name: 'Features', href: '/docs/features' },
  { name: 'Usage', href: '/docs/usage' },
  { name: 'Configuration', href: '/docs/configuration' },
  { name: 'Troubleshooting', href: '/docs/troubleshooting' },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-10 flex">
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 mr-8"
      >
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-1">
            {sidebar.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </motion.aside>
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </div>
  )
}