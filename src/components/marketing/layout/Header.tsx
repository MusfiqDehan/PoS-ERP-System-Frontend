"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { headerContent } from "@/data/layout/header";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
    if (href === "/contact") return pathname === "/contact";
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        globalThis.requestAnimationFrame(() => {
          setIsScrolled(globalThis.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check in case the page is already scrolled
    handleScroll();

    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className={cn(
      "fixed left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "top-0 bg-white/95 backdrop-blur-md shadow-sm border-gray-200" : "top-6 border-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "h-[76px] flex items-center justify-between transition-all duration-300 border",
          isScrolled ? "px-2 border-transparent bg-transparent" : "px-4 sm:px-6 md:px-8 bg-white rounded-2xl shadow-sm border-gray-100"
        )}>
          <Link
            href="/"
            className="relative block h-[48px] w-[140px] shrink-0 sm:w-[160px] md:h-[56px] md:w-[187px]"
            onClick={(e) => {
              if (globalThis.location?.pathname === '/') {
                e.preventDefault();
                globalThis.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img
              src={headerContent.logoSrc}
              alt={headerContent.logoAlt}
              className="block h-full w-full object-contain object-left"
              width={187}
              height={56}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[var(--color-black-100)]">
            {headerContent.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "transition-colors",
                  isActiveLink(link.href)
                    ? "text-[#089B7C]"
                    : "text-[var(--color-black-100)] hover:text-[var(--color-primary-700)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={headerContent.contactLink.href}
              className={cn(
                "text-[15px] font-semibold underline decoration-2 underline-offset-4 transition-colors",
                pathname === "/contact"
                  ? "text-[#089B7C]"
                  : "text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)]",
              )}
            >
              {headerContent.contactLink.label}
            </Link>
            <Link href={headerContent.registerLink.href} className="text-[15px] font-semibold text-[var(--color-black-100)] hover:text-[var(--color-primary-700)] transition-colors">
              {headerContent.registerLink.label}
            </Link>
            <Link href={headerContent.demoButton.href}>
              <Button variant="primary" className="rounded font-medium px-6 py-2 shadow-sm">{headerContent.demoButton.label}</Button>
            </Link>
          </div>

          {/* Mobile hamburger — Demo lives inside the menu panel */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="flex md:hidden text-[#222222] p-1 focus:outline-none shrink-0"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[100%] left-0 right-0 bg-white border-b border-gray-200 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-6">
            <nav className="flex flex-col gap-6 text-[18px] font-medium text-[#222222]">
              {headerContent.navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "transition-colors",
                    isActiveLink(link.href) ? "text-[#089B7C]" : "text-[#222222] hover:text-[#069D7A]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-4">
              <Link
                href={headerContent.registerLink.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-[#222222] hover:text-[#069D7A]"
              >
                {headerContent.registerLink.label}
              </Link>
              <Link
                href={headerContent.contactLink.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-[#069D7A]"
              >
                {headerContent.contactLink.label}
              </Link>
              <Link
                href={headerContent.demoButton.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 w-full"
              >
                <Button variant="primary" className="w-full rounded-lg font-medium py-3">
                  {headerContent.demoButton.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
