import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight as codeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Pre = ({ children }: { children: React.ReactNode }) => {
  const childrenArray = React.Children.toArray(children);
  const code = childrenArray[0] as React.ReactElement;
  const className = code.props.className || "";
  const language = className.replace(/language-/, "");
  const codeText = code.props.children.trim();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <div className="bg-zinc-200 text-gray-700 px-4 text-sm rounded-t-lg flex justify-between items-center">
          <span>{language}</span>
          <Tooltip>
            <div className="flex items-center">
              {copied && (
                <span className="text-xs text-blue-500 mr-2">Copied!</span>
              )}
              <Button
                onClick={handleCopy}
                className="bg-transparent text-gray-500 hover:bg-zinc-300"
                size="sm"
              >
                <Copy size={16} />
              </Button>
            </div>
          </Tooltip>
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
          {codeText}
        </SyntaxHighlighter>
      </div>
    </TooltipProvider>
  );
};

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
    pre: ({ children, ...props }) => <Pre {...props}>{children}</Pre>,
    code: ({ children, ...props }) => (
      <code
        className="bg-gray-100 text-[#047097] px-1 py-0.5 rounded"
        {...props}
      >
        {children}
      </code>
    ),
    hr: () => <hr className="mb-6 h-px border-0 bg-pink-100" />,
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-gray-700">{children}</ul>
    ),
    li: ({ children }) => <li className="text-base">{children}</li>,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-800">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold m-0 mb-2 text-gray-800">
        {children}
      </h2>
    ),
    ...components,
  };
}
