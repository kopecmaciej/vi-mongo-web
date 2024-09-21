'use client'

import { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Pre } from '@/mdx-components';

const InstallationPage = () => {
  const [os, setOs] = useState<string>('Linux');
  const [arch, setArch] = useState<string>('x86_64');

  const handleOsChange = (value: string) => {
    setOs(value);
    setArch('x86_64'); // Reset architecture to default when OS changes
  };

  const handleArchChange = (value: string) => {
    setArch(value);
  };

  const getDownloadFileName = () => {
    if (!os || !arch) return '';
    return `vi-mongo_${os}_${arch}.${os === 'Windows' ? 'zip' : 'tar.gz'}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Installation</h1>
      <h2 className="text-xl mb-4">Select your OS and Processor</h2>
      <div className="mb-4">
        <label className="block mb-2">OS:</label>
        <Select value={os} onValueChange={handleOsChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select OS" />
          </SelectTrigger>
          <SelectContent>
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
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Architecture" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arm64">ARM64</SelectItem>
              <SelectItem value="x86_64">x86_64</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      {os && arch && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Download and Install</h3>
          {os === 'Linux' && (
            <>
              <h4 className="font-semibold">Using curl</h4>
              <Pre>
                <code className="language-bash">
                  {`curl -s https://api.github.com/repos/kopecmaciej/vi-mongo/releases/latest | grep "browser_download_url.*${getDownloadFileName()}" | cut -d '"' -f 4 | xargs curl -LO
tar -xzf ${getDownloadFileName()}
chmod +x vi-mongo
sudo mv vi-mongo /usr/bin
rm ${getDownloadFileName()}`}
                </code>
              </Pre>
              <h4 className="font-semibold">Using wget</h4>
              <Pre>
                <code className="language-bash">
                  {`wget -qO- https://api.github.com/repos/kopecmaciej/vi-mongo/releases/latest | grep "browser_download_url.*${getDownloadFileName()}" | cut -d '"' -f 4 | xargs wget -q --show-progress &&
tar -xzf ${getDownloadFileName()} &&
chmod +x vi-mongo &&
sudo mv vi-mongo /usr/bin &&
rm ${getDownloadFileName()}`}
                </code>
              </Pre>
            </>
          )}
          {os === 'Darwin' && (
            <Pre>
              <code className="language-bash">
                {`curl -s https://api.github.com/repos/kopecmaciej/vi-mongo/releases/latest | grep "browser_download_url.*${getDownloadFileName()}" | cut -d '"' -f 4 | xargs curl -LO
tar -xzf ${getDownloadFileName()}
chmod +x vi-mongo
sudo mv vi-mongo /usr/bin
rm ${getDownloadFileName()}`}
              </code>
            </Pre>
          )}
          {os === 'Windows' && (
            <Pre>
              <code className="language-powershell">
                {`Invoke-WebRequest -Uri "https://api.github.com/repos/kopecmaciej/vi-mongo/releases/latest" -OutFile "vi-mongo.zip"
Expand-Archive -Path "vi-mongo.zip" -DestinationPath "."
Move-Item -Path "vi-mongo.exe" -Destination "C:\\Program Files\\vi-mongo"
Remove-Item "vi-mongo.zip"`}
              </code>
            </Pre>
          )}
        </div>
      )}
    </div>
  );
};

export default InstallationPage;