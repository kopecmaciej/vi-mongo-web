'use client'

import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { ThemeAwarePre } from '@/components/Mdx/ThemeAwarePre';

interface Release {
  tag_name: string;
  prerelease: boolean;
}

const InstallationPage = () => {
  const [os, setOs] = useState<string>('Linux');
  const [arch, setArch] = useState<string>('x86_64');
  const [version, setVersion] = useState<string>('');
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/kopecmaciej/vi-mongo/releases');
      const data = await response.json();
      setReleases(data.map((release: Release) => ({
        tag_name: release.tag_name,
        prerelease: release.prerelease
      })));
      if (data.length > 0) {
        setVersion(data[0].tag_name);
      }
    } catch (error) {
      console.error('Error fetching releases:', error);
    }
  };

  const handleOsChange = (value: string) => {
    setOs(value);
    setArch('x86_64'); // Reset architecture to default when OS changes
  };

  const handleArchChange = (value: string) => {
    setArch(value);
  };

  const handleVersionChange = (value: string) => {
    setVersion(value);
  };

  const getDownloadFileName = () => {
    if (!os || !arch || !version) return '';
    return `vi-mongo_${os}_${arch}.${os === 'Windows' ? 'zip' : 'tar.gz'}`;
  };

  const getDownloadUrl = () => {
    if (!os || !arch || !version) return '';
    return `https://github.com/kopecmaciej/vi-mongo/releases/download/${version}/${getDownloadFileName()}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Installation</h1>
      <h2 className="text-xl mb-4">Select your OS, Processor, and Version</h2>
      <div className="mb-4">
        <label className="block mb-2">OS:</label>
        <Select value={os} onValueChange={handleOsChange}>
          <SelectTrigger className="w-[180px] dark:bg-transparent border dark:border-lime-950">
            <SelectValue placeholder="Select OS" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="Darwin">macOS</SelectItem>
            <SelectItem value="Linux">Linux</SelectItem>
            <SelectItem value="Windows">Windows</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {os && (
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
      )}
      {releases.length > 0 && (
        <div className="mb-4">
          <label className="block mb-2">Version:</label>
          <Select value={version} onValueChange={handleVersionChange}>
            <SelectTrigger className="w-[180px] dark:bg-transparent border dark:border-lime-950">
              <SelectValue placeholder="Select Version" />
            </SelectTrigger>
            <SelectContent className="max-h-[130px] overflow-y-auto">
              {releases.map((release, index) => (
                <SelectItem key={release.tag_name} value={release.tag_name}>
                  {release.tag_name}
                  {release.prerelease ? ' (Pre-release)' : ''}
                  {index === 0 && <span className="inline-flex text-green-700 text-xs ml-1">Latest</span>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {os && arch && version && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Download and Install</h3>
          {os === 'Linux' && (
            <>
              <h4 className="font-semibold">Using curl</h4>
              <ThemeAwarePre>
                <code className="language-bash">
                  {`curl -LO ${getDownloadUrl()}
tar -xzf ${getDownloadFileName()}
chmod +x vi-mongo
sudo mv vi-mongo /usr/bin
rm ${getDownloadFileName()}`}
                </code>
              </ThemeAwarePre>
              <h4 className="font-semibold">Using wget</h4>
              <ThemeAwarePre>
                <code className="language-bash">
                  {`wget ${getDownloadUrl()} &&
tar -xzf ${getDownloadFileName()} &&
chmod +x vi-mongo &&
sudo mv vi-mongo /usr/bin &&
rm ${getDownloadFileName()}`}
                </code>
              </ThemeAwarePre>
            </>
          )}
          {os === 'Darwin' && (
            <ThemeAwarePre>
              <code className="language-bash">
                {`curl -LO ${getDownloadUrl()}
tar -xzf ${getDownloadFileName()}
chmod +x vi-mongo
sudo mv vi-mongo /usr/bin
rm ${getDownloadFileName()}`}
              </code>
            </ThemeAwarePre>
          )}
          {os === 'Windows' && (
            <ThemeAwarePre>
              <code className="language-powershell">
                {`Invoke-WebRequest -Uri "${getDownloadUrl()}" -OutFile "${getDownloadFileName()}"
Expand-Archive -Path "${getDownloadFileName()}" -DestinationPath "."
Move-Item -Path "vi-mongo.exe" -Destination "C:\\Program Files\\vi-mongo"
Remove-Item "${getDownloadFileName()}"`}
              </code>
            </ThemeAwarePre>
          )}
        </div>
      )}
    </div>
  );
};

export default InstallationPage;
