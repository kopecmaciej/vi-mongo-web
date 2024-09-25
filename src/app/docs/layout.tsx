"use client";

import DocsLayout from "@/components/Docs/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <DocsLayout>{children}</DocsLayout>
  );
}
