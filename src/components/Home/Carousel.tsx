import { AnimatePresence, motion } from "framer-motion";
import { Filter, Layout, Palette, Search, Zap, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const images = [
  {
    src: "/vi-mongo/interface.webp",
    description: "Intuitive interface",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    src: "/vi-mongo/ai_prompt.webp",
    description: "AI Prompt",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    src: "/vi-mongo/quick-pick.webp",
    description: "Quick pick with intelligent highlighting",
    icon: <Search className="w-6 h-6" />,
  },
  {
    src: "/vi-mongo/connection-list.webp",
    description: "Manage multiple connections easily",
    icon: <Layout className="w-6 h-6" />,
  },
  {
    src: "/vi-mongo/autocomplete.webp",
    description: "Fast query with autocomplete",
    icon: <Filter className="w-6 h-6" />,
  },
  {
    src: "/vi-mongo/theme-switcher.webp",
    description: "Theme Customization",
    icon: <Palette className="w-6 h-6" />,
  },
];

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="container flex flex-col mx-auto rounded-lg overflow-hidden">
      <div className="flex flex-wrap justify-center p-4 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={index}
            className={`flex flex-col border-2 border-green-950 items-center py-2 rounded-lg ${
              index === currentIndex ? "bg-green-800" : "hover:bg-green-700"
            } flex-1 max-w-[260px]`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`bg-green-800 p-2 rounded-full mb-2 ${
                index === currentIndex ? "bg-green-900" : ""
              }`}
            >
              {image.icon}
            </div>
            <p className="text-sm text-white text-center">
              {image.description}
            </p>
          </motion.button>
        ))}
      </div>
      <div className="relative w-full" style={{ paddingBottom: "58.25%" }}>
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].src}
                alt={`Feature ${currentIndex + 1}`}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
