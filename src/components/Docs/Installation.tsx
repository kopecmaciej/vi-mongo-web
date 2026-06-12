"use client";

import { ThemeAwarePre } from "@/components/Mdx/ThemeAwarePre";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Release {
  tag_name: string;
  prerelease: boolean;
}

const InstallationPage = () => {
  const [arch, setArch] = useState<string>("x86_64");
  const [version, setVersion] = useState<string>("");
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/kopecmaciej/vi-mongo/releases",
      );
      const data = await response.json();
      setReleases(
        data.map((release: Release) => ({
          tag_name: release.tag_name,
          prerelease: release.prerelease,
        })),
      );
      const latestStableRelease = data.find((release: Release) => !release.prerelease);
      if (latestStableRelease) {
        setVersion(latestStableRelease.tag_name);
      } else if (data.length > 0) {
        setVersion(data[0].tag_name);
      }
    } catch (error) {
      console.error("Error fetching releases:", error);
    }
  };

  const handleArchChange = (value: string) => {
    setArch(value);
  };

  const handleVersionChange = (value: string) => {
    setVersion(value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Installation</h1>

      <div className="mb-6">
        <h2 className="text-xl mb-4">Homebrew</h2>
        <p className="mb-4">If you're using macOS or Linux with Homebrew, you can install vi-mongo directly:</p>
        <ThemeAwarePre>
          <code className="language-bash">{`brew tap kopecmaciej/vi-mongo
brew install vi-mongo`}</code>
        </ThemeAwarePre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-4">Arch Linux (AUR)</h2>
        <p className="mb-4">If you're using Arch Linux, you can install vi-mongo directly from AUR:</p>
        <ThemeAwarePre>
          <code className="language-bash">yay -S vi-mongo</code>
        </ThemeAwarePre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-4">Install Script (Linux / macOS)</h2>
        <p className="mb-4">The quickest way on Unix systems — auto-detects your OS and architecture:</p>
        <ThemeAwarePre>
          <code className="language-bash">{`curl -fsSL https://vi-mongo.com/install.sh | sh`}</code>
        </ThemeAwarePre>
        <p className="mt-2 text-sm text-gray-500">Pin to a specific version by setting <code>VI_MONGO_VERSION</code>, e.g. <code>VI_MONGO_VERSION=v0.2.3 curl -fsSL https://vi-mongo.com/install.sh | sh</code></p>
      </div>

      <h2 className="text-xl mb-4">Manual Installation (Windows)</h2>
      <div className="mb-4">
        <label className="block mb-2">Architecture:</label>
        <Select value={arch} onValueChange={handleArchChange}>
          <SelectTrigger className="w-[180px] dark:bg-transparent border dark:border-lime-950">
            <SelectValue placeholder="Select Architecture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arm64">ARM64</SelectItem>
            <SelectItem value="x86_64">x86_64</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {releases.length > 0 && (
        <div className="mb-4">
          <label className="block mb-2">Version:</label>
          <Select value={version} onValueChange={handleVersionChange}>
            <SelectTrigger className="w-[180px] dark:bg-transparent border dark:border-lime-950">
              <SelectValue placeholder="Select Version" />
            </SelectTrigger>
            <SelectContent className="max-h-[130px] overflow-y-auto">
              {releases.map((release, index) => {
                const isLatestStable = !release.prerelease &&
                  releases.findIndex(r => !r.prerelease) === index;
                return (
                  <SelectItem key={release.tag_name} value={release.tag_name}>
                    {release.tag_name}
                    {release.prerelease ? " (Pre-release)" : ""}
                    {isLatestStable && (
                      <span className="inline-flex text-green-700 text-xs ml-1">
                        Latest
                      </span>
                    )}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      )}
      {arch && version && (
        <div className="mb-6">
          <ThemeAwarePre>
            <code className="language-powershell">
              {`Invoke-WebRequest -Uri "${`https://github.com/kopecmaciej/vi-mongo/releases/download/${version}/vi-mongo_Windows_${arch}.zip`}" -OutFile "vi-mongo_Windows_${arch}.zip"
Expand-Archive -Path "vi-mongo_Windows_${arch}.zip" -DestinationPath "."
Move-Item -Path "vi-mongo.exe" -Destination "C:\\Program Files\\vi-mongo"
Remove-Item "vi-mongo_Windows_${arch}.zip"`}
            </code>
          </ThemeAwarePre>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl mb-4">Uninstall</h2>
        <p className="mb-4">Remove the binary, config, and log file interactively:</p>
        <ThemeAwarePre>
          <code className="language-bash">{`curl -fsSL https://vi-mongo.com/uninstall.sh | sh`}</code>
        </ThemeAwarePre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-2">Neovim Installation</h2>
        <p>
          If you want to install vi-mongo as a Neovim plugin, please visit the{" "}
          <Link
            href="https://github.com/kopecmaciej/vi-mongo.nvim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            vi-mongo.nvim repository
          </Link>{" "}
          for installation instructions.
        </p>

        <h2 className="text-xl mb-2">Extra Icons</h2>
        <p>
          To handle extra icons that are available by default, install icons
          from{" "}
          <Link
            href="https://www.nerdfonts.com/cheat-sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Nerd Fonts
          </Link>.
          Optionally, just replace icons with
          those available on your OS, more about it in{" "}
          <Link
            href="https://www.vi-mongo.com/docs/configuration#styling-configuration"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            configuration
          </Link>
        </p>
      </div>
    </div >
  );
};

export default InstallationPage;
