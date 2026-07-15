"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/marketing/ui/Button";
import { X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { heroContent } from "@/data/landing/hero";

export function HeroContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsSubmitted(false), 300);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    };

    if (!isSubmitted) {
      setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input');
        firstInput?.focus();
      }, 100);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isSubmitted]);

  return (
    <>
      {/* Badge */}
      <div className="inline-flex items-center gap-[10px] border-2 border-[#089B7C] rounded-[4px] px-[24px] py-[12px] mb-[12px]">
        <div className="relative shrink-0 w-[20px] h-[20px]">
          {/* Green dot icon matching Figma Frame1 */}
          <div className="w-[12px] h-[12px] rounded-full bg-[rgba(8,155,124,0.12)] flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[8px] h-[8px] rounded-full bg-[#089B7C]" />
          </div>
        </div>
        <span className="text-[16px] font-medium text-[#212121] leading-none whitespace-nowrap">
          {heroContent.badge}
        </span>
      </div>

      {/* Heading */}
      <h1 className="!text-[32px] sm:!text-[46px] md:!text-[54px] font-semibold text-[#212121] leading-[1.08] text-center mb-[16px] max-w-[1100px]">
        <span>Run Your Entire </span>
        <span className="relative inline-flex">
          {/* Animated green highlight that sweeps in */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-[#089B7C] rounded-[6px] origin-left"
          />
          <span className="relative text-white px-[10px] inline-block">
            Business
          </span>
        </span>
        <span> From</span>
        <br />
        <span>One Dashboard</span>
      </h1>

      {/* Description */}
      <p className="text-[17px] md:text-[20px] text-[#666666] leading-[1.55] max-w-[820px] text-center mb-[32px]">
        {heroContent.description}
      </p>

      {/* Buttons — equal height; side-by-side equal width on mobile */}
      <div className="flex w-full max-w-[520px] flex-row items-stretch gap-2 sm:max-w-none sm:w-auto sm:gap-[8px]">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="!h-12 flex-1 sm:flex-none px-3 sm:px-6 bg-[#089B7C] hover:bg-[#07856B] text-white text-[13px] sm:text-[16px] font-medium rounded-[4px] leading-none border-0 !py-0"
        >
          {heroContent.primaryButton.label}
        </Button>
        <button
          type="button"
          onClick={() => window.open("https://youtube.com", "_blank", "noopener")}
          className="inline-flex h-12 flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-[10px] px-3 sm:px-5 border-2 border-[#089B7C] text-[#089B7C] text-[13px] sm:text-[16px] font-medium rounded-[4px] leading-none bg-transparent hover:bg-[#089B7C]/5 transition-colors"
        >
          <Play className="size-4 sm:size-5 shrink-0 fill-current" />
          <span className="whitespace-nowrap">{heroContent.secondaryButton.label}</span>
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={handleClose}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] shadow-2xl w-full max-w-md p-6 sm:p-8 relative overflow-hidden"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8 relative"
                    >
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 bg-emerald-100 rounded-full"
                      />
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#089B7C] relative z-10">
                        <motion.path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                        />
                      </svg>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-3xl font-[800] text-[#222222] mb-3 tracking-tight"
                    >
                      You&apos;re all set!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-[#555555] mb-8 leading-relaxed text-base max-w-[260px] mx-auto"
                    >
                      Check your inbox—we&apos;ve sent the details to get your 14-day trial started.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="w-full"
                    >
                      <Button onClick={handleClose} className="w-full py-6 bg-[#222222] hover:bg-black text-white font-bold rounded-xl text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        Got it, thanks
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-[#222222] mb-2">Start Your Free Trial</h2>
                      <p className="text-sm text-[#555555]">
                        Get full access to all features for 14 days. No credit card required.
                      </p>
                    </div>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input id="fullName" required type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#089B7C]/50 focus:border-[#089B7C] transition-all text-sm" />
                      </div>
                      <div>
                        <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                        <input id="workEmail" required type="email" placeholder="john@company.com" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#089B7C]/50 focus:border-[#089B7C] transition-all text-sm" />
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input id="phoneNumber" required type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#089B7C]/50 focus:border-[#089B7C] transition-all text-sm" />
                      </div>
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input id="companyName" required type="text" placeholder="Acme Inc." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#089B7C]/50 focus:border-[#089B7C] transition-all text-sm" />
                      </div>

                      <div className="pt-2">
                        <Button type="submit" className="w-full py-3 bg-[#089B7C] hover:bg-[#07856B] text-white font-bold rounded-lg text-sm shadow-md hover:shadow-lg transition-all">
                          Get Started Now
                        </Button>
                      </div>
                      <p className="text-xs text-center text-gray-600 mt-4">
                        By signing up, you agree to our Terms & Conditions.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
