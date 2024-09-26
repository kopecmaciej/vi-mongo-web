'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight as lightTheme, coldarkDark as darkTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@/components/ui/button";

export function ThemeAwarePre({ children, ...props }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Pre theme={resolvedTheme} {...props}>{children}</Pre>;
}

const Pre = ({ children, theme }: { children: React.ReactNode; theme?: string }) => {
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
        <div className="bg-zinc-200 dark:bg-[#212e22] text-gray-700 dark:text-gray-300 px-4 text-sm rounded-t-lg flex justify-between items-center">
          <span>{language}</span>
          <Tooltip>
            <div className="flex items-center">
              {copied && (
                <span className="text-xs text-blue-500 mr-2">Copied!</span>
              )}
              <Button
                onClick={handleCopy}
                className="bg-transparent text-green-900 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                size="sm"
              >
                <Copy size={16} />
              </Button>
            </div>
          </Tooltip>
        </div>
        <SyntaxHighlighter
          language={language}
          style={theme === "light" ? lightTheme : darkTheme}
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