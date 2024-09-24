"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from "@/components/ui/dialog";

import ViMongoAddConnections from "/assets/gifs/vi-mongo-add-connections.gif";
import ViMongoSortAndFilter from "/assets/gifs/vi-mongo-sort-and-filter.gif";

const gifs = [
  { id: 1, src: ViMongoAddConnections, alt: 'ViMongo Add Connections' },
  { id: 2, src: ViMongoSortAndFilter, alt: 'ViMongo Sort and Filter' },
];

export const Showcase = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {gifs.map((gif, index) => (
            <div
              key={gif.id}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setOpenIndex(index)}
            >
              <Image
                src={gif.src}
                alt={gif.alt}
                width={600}
                height={338}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
      <Dialog open={openIndex !== null} onOpenChange={() => setOpenIndex(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          {openIndex !== null && (
            <Image
              src={gifs[openIndex].src}
              alt={gifs[openIndex].alt}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
