import { Button } from "@/components/ui/button";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight as codeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
    pre: ({ children }) => {
      const childrenArray = React.Children.toArray(children);
      const code = childrenArray[0] as React.ReactElement;
      const className = code.props.className || "";
      const language = className.replace(/language-/, "");

      return (
        <div className="relative">
          <div className="bg-zinc-200 text-gray-700 px-4 py-2 text-sm rounded-t-lg">
            {language}
          </div>
          <SyntaxHighlighter
            language={language}
            style={codeStyle}
            customStyle={{
              margin: 0,
              borderRadius: "0 0 0.375rem 0.375rem",
              padding: "1rem",
            }}
          >
            {code.props.children.trim()}
          </SyntaxHighlighter>
        </div>
      );
    },
    ...components,
  };
}
