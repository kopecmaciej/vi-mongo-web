import React from 'react';
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ src, alt }) => <Image src={src as string} alt={alt as string} className="mb-4" />,
    Button: ({ children, href }) => <Button asChild><a href={href}>{children}</a></Button>,
    pre: ({ children }) => {
      const childrenArray = React.Children.toArray(children);
      const code = childrenArray[0] as React.ReactElement;
      const className = code.props.className || '';
      const language = className.replace(/language-/, '');

      return (
        <div className="relative">
          <div className="absolute top-0 right-0 bg-gray-700 text-gray-200 px-2 py-1 text-xs rounded-tr">
            {language}
          </div>
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{
              margin: 0,
              borderRadius: '0.375rem',
              padding: '1rem',
            }}
          >
            {code.props.children.trim()}
          </SyntaxHighlighter>
        </div>
      );
    },
    ...components,
  }
}
