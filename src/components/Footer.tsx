"use client";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className=" text-white py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between md:flex-row mb-8 border-t border-green-900 pt-8">
          <div className="mb-8 md:mb-0">
            <Image
              src="/logo/logo-no-background.svg"
              alt="Vi Mongo Logo"
              width={150}
              height={40}
              className="mb-4"
            />
            <p className="text-sm mb-4">
              An open-source project to improve MongoDB management efficiency
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">DOCS</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs">Documentation</Link>
                </li>
                <li>
                  <Link href="/docs/installation">Installation</Link>
                </li>
                <li>
                  <Link href="/docs/configuration">Configuration</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
