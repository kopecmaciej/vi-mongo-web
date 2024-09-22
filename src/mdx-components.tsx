import { Button } from "@/components/ui/button";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import React from "react";
import { ThemeAwarePre } from "@/components/ThemeAwarePre";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ src, alt }) => (
      <Image src={src as string} alt={alt as string} className="mb-4" />
    ),
    Button: ({ children, href }) => (
      <Button asChild>
        <a href={href}>{children}</a>
      </Button>
    ),
    pre: ({ children, ...props }) => <ThemeAwarePre {...props}>{children}</ThemeAwarePre>,
    code: ({ children, ...props }) => (
      <code
        className="bg-gray-100 dark:bg-gray-800 text-[#047097] dark:text-[#4ec9b0] px-1 py-0.5 rounded"
        {...props}
      >
        {children}
      </code>
    ),
    hr: () => <hr className="mb-6 h-px border-0 bg-pink-100 dark:bg-pink-900" />,
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>
    ),
    li: ({ children }) => <li className="text-base">{children}</li>,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold m-0 mb-2 text-gray-800 dark:text-gray-200">
        {children}
      </h2>
    ),
    ...components,
  };
}
