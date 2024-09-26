"use client";

import { Showcase } from "@/components/Showcase";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ShowcasePage() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);
  return <Showcase />;
}
