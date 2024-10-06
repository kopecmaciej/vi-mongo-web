"use client";

import { SidebarItems } from "@/components/Docs/Sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import Github from "/public/github.svg";
import LogoSvg from "/public/logo/logo-no-background.svg";

const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
};

const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return { isOpen, toggle };
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    href={href}
    className="text-foreground hover:text-primary font-medium"
    onClick={onClick}
  >
    {children}
  </Link>
);

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 p-4 bg-background rounded-lg shadow-lg">
      <ScrollArea className="h-[calc(100vh-100px)]">
        <nav className="flex flex-col space-y-4">
          <NavLink href="/showcase" onClick={onClose}>Showcase</NavLink>
          <NavLink href="/docs" onClick={onClose}>Docs</NavLink>
          {pathname.startsWith("/docs") && (
            <div className="mt-4 space-y-2">
              {SidebarItems.map((item) => (
                <div key={item.name}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm"
                    asChild
                  >
                    <Link
                      href={item.href}
                      className="flex items-center"
                      onClick={onClose}
                    >
                      <item.icon size={20} className="mr-2" />
                      {item.name}
                      {item.children && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSection(item.name);
                          }}
                          className="ml-auto"
                        >
                          {expandedSections.includes(item.name) ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </button>
                      )}
                    </Link>
                  </Button>
                  {item.children &&
                    expandedSections.includes(item.name) && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Button
                            key={child.name}
                            variant={
                              pathname === child.href
                                ? "secondary"
                                : "ghost"
                            }
                            className="w-full justify-start text-sm"
                            asChild
                          >
                            <Link
                              href={child.href}
                              className="flex items-center"
                              onClick={onClose}
                            >
                              {child.name}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </nav>
      </ScrollArea>
    </div>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScroll();
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu } = useMobileMenu();

  return (
    <>
    <div
      className={`text-foreground p-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-gradient-custom-dark" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center">
              <Image src={LogoSvg} alt="Logo" width={120} height={40} />
            </Link>
            <NavLink href="/showcase" onClick={toggleMobileMenu}>Showcase</NavLink>
            <NavLink href="/docs" onClick={toggleMobileMenu}>Docs</NavLink>
          </div>
        </div>
        <div className="flex items-center space-x-4 max-md:space-x-2">
          <div className="flex items-center text-green-500">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Alpha Version</span>
          </div>
          {pathname.startsWith("/docs") && <ThemeToggle />}
          <Button variant="outline" size="icon" asChild>
            <Link
              href="https://github.com/kopecmaciej/vi-mongo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={Github}
                alt="GitHub"
                className="h-4 w-4 dark:invert"
              />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </div>
      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />
    </div>
    </>
  );
};