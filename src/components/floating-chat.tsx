import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import ChatPage from "./Chat"; // Import your existing chat component

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-6 bottom-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full bg-lime-500 shadow-lg hover:bg-lime-600"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed right-0 bottom-0 z-50 md:right-6 md:bottom-6"
          >
            <div className="relative">
              {/* Close button */}
              <Button
                onClick={() => setIsOpen(false)}
                size="sm"
                variant="secondary"
                className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-gray-200 p-0  hover:bg-gray-300"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Chat component */}
              <ChatPage />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
