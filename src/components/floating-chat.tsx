
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatPage from "./Chat"; // Import your existing chat component
import { motion, AnimatePresence } from "framer-motion";

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
            className="fixed top-2 right-0 z-50 h-full md:right-6 md:bottom-6"
          >
            <div className="relative h-full w-full rounded-t-lg border border-gray-200 bg-white shadow-xl md:h-[600px] md:max-h-[80vh] md:w-[400px] md:rounded-lg">
              {/* Close button */}
              <Button
                onClick={() => setIsOpen(false)}
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Your existing chat component */}
              <div className="h-full">
                <ChatPage />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
