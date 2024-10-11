import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vi Mongo - TUI for MongoDB",
  description:
    "Vi Mongo is a fast and efficient TUI for MongoDB database management, designed for developers who love to work in the terminal.",
  openGraph: {
    title: "Vi Mongo - TUI for MongoDB",
    description:
      "Vi Mongo is a fast and efficient TUI for MongoDB database management, designed for developers who love to work in the terminal.",
    url: "https://vi-mongo.com",
    siteName: "Vi Mongo",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} min-h-screen flex flex-col relative
        bg-gradient-custom-light dark:bg-gradient-custom-dark
        from-gradient-start-light from-30% via-gradient-middle-light to-gradient-end-light to-70%
        dark:from-gradient-start-dark dark:from-30% dark:via-gradient-middle-dark dark:to-gradient-end-dark dark:to-70%`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-grow relative z-10 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
