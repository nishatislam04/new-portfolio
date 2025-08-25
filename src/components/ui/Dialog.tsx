"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        key="dialog-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => onOpenChange(false)}
      >
        <motion.div
          key="dialog-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-7xl max-h-[90vh] bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);

DialogHeader.displayName = "DialogHeader";

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("overflow-y-auto max-h-[90vh]", className)}
      {...props}
    />
  )
);

DialogContent.displayName = "DialogContent";

interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose: () => void;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ onClose, className, children, ...props }, ref) => (
    <button
      ref={ref}
      onClick={onClose}
      className={cn(
        "absolute top-4 right-4 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogClose,
};
