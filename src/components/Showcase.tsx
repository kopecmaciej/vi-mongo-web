"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TabsBtn, TabsContent, TabsProvider } from "@/components/ui/tab";
import Image from "next/image";
import { useState } from "react";

import ViMongoAddConnections from "/public/gifs/vi-mongo-add-connections.gif";
import ViMongoSortAndFilter from "/public/gifs/vi-mongo-sort-and-filter.gif";

const gifs = [
  { id: 1, src: ViMongoAddConnections, alt: "Add Connections" },
  { id: 2, src: ViMongoSortAndFilter, alt: "Sorting and Filtering" },
];

export const Showcase = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="backdrop-blur-sm rounded-md p-4 relative">
      <TabsProvider defaultValue={gifs[0].alt}>
        <div className="flex justify-center mt-2">
          <div className="flex items-center w-fit p-1 rounded-md border">
            {gifs.map((gif) => (
              <TabsBtn key={gif.id} value={gif.alt} className="hover:dark:bg-[#185330]">
                <span className="relative z-[2] uppercase">{gif.alt}</span>
              </TabsBtn>
            ))}
          </div>
        </div>

        {gifs.map((gif, index) => (
          <TabsContent key={gif.id} value={gif.alt}>
            <div className="w-full flex justify-center">
              <div
                className="relative overflow-hidden rounded-lg hover:opacity-80 shadow-lg cursor-pointer max-w-5xl"
                onClick={() => setOpenIndex(index)}
              >
                <Image
                  src={gif.src}
                  alt={gif.alt}
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </TabsProvider>

      <Dialog open={openIndex !== null} onOpenChange={() => setOpenIndex(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-y-auto">
          {openIndex !== null && (
            <div className="relative w-full h-0 pb-[56.25%]">
              <Image
                src={gifs[openIndex].src}
                alt={gifs[openIndex].alt}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Showcase;
