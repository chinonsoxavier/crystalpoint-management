
"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const phoneNumber = "+1234567890";
  const message = "Hello! I'm interested in your services.";
  
  // Format the WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 left-6 z-40" 
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 group"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
        
        {/* Optional tooltip */}
        <div className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us
        </div>
      </a>
    </motion.div>
  );
}