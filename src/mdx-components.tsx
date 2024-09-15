import type { MDXComponents } from 'mdx/types'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const customStyle = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#1E1E1E',
    borderRadius: '6px',
    padding: '1em',
    marginBottom: '1em',
  },
}

const CodeBlock = ({ className, children }) => {
  const language = className ? className.replace('language-', '') : 'text'
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 rounded-bl px-2 py-1 text-xs">
        {language}
      </div>
      <SyntaxHighlighter language={language} style={customStyle}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ src, alt }) => <Image src={src as string} alt={alt as string} className="mb-4" />,
    Button: ({ children, href }) => <Button asChild><a href={href}>{children}</a></Button>,
    code: CodeBlock,
    ...components,
  }
}
