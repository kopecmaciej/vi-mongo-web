import React from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white p-4"
    >
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Vi Mongo. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="hover:text-gray-300">
            Privacy Policy
          </a>
          {" | "}
          <a href="/terms" className="hover:text-gray-300">
            Terms of Service
          </a>
        </p>
      </div>
    </motion.footer>
  );
};
