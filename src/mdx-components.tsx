import type { MDXComponents } from 'mdx/types'
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ src, alt }) => <Image src={src as string} alt={alt as string} className="mb-4" />,
    Button: ({ children, href }) => <Button asChild><a href={href}>{children}</a></Button>,
    ...components,
  }
}
