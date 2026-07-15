import type { ReactNode } from "react";
import Link from "next/link";
import { footerContent } from "@/data/layout/footer";

interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  description?: string;
  exploreLinks?: FooterLink[];
  supportLinks?: FooterLink[];
  contact?: {
    addressLines: string[];
    phone: string;
    email: string;
    whatsappHref: string;
    telegramHref: string;
  };
  blogLinks?: FooterLink[];
  newsletter?: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  copyright?: string;
}

function SocialIcon({
  href,
  label,
  children,
  className,
}: Readonly<{
  href: string;
  label: string;
  children: ReactNode;
  className: string;
}>) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`inline-flex size-9 items-center justify-center rounded-md text-white transition-opacity hover:opacity-85 ${className}`}
    >
      {children}
    </Link>
  );
}

export function Footer(props: Readonly<FooterProps>) {
  const data = { ...footerContent, ...props };

  return (
    <footer className="bg-[#D2F9E9]">
      <div className="mx-auto w-full max-w-[1170px] px-4 pt-12 pb-8 md:px-6 md:pt-16 xl:px-0">
        {/* Brand + link columns */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] lg:gap-12 xl:gap-16">
          {/* Brand */}
          <div className="flex max-w-md flex-col gap-5">
            <Link href="/" className="inline-block w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Sortorium Logo"
                className="h-10 w-auto object-contain object-left md:h-12"
                width={200}
                height={48}
              />
            </Link>
            <p className="text-[15px] leading-relaxed text-[#555555] md:text-[16px]">
              {data.description}
            </p>
            <div>
              <p className="mb-3 text-[16px] font-semibold text-[#212121] md:text-[18px]">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2.5">
                <SocialIcon href="#" label="Facebook" className="bg-[#4267B2]">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" label="X (Twitter)" className="bg-black">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" label="LinkedIn" className="bg-[#0077b5]">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialIcon>
                <SocialIcon
                  href="#"
                  label="Instagram"
                  className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]"
                >
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" label="YouTube" className="bg-[#FF0000]">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </div>

          {/* Link groups — 2×2 on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 md:grid-cols-4 md:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[16px] font-semibold text-[#212121] md:text-[18px]">Explore Us</p>
              <ul className="flex flex-col gap-2.5">
                {data.exploreLinks?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#555555] transition-colors hover:text-[#069D7A] md:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[16px] font-semibold text-[#212121] md:text-[18px]">Support</p>
              <ul className="flex flex-col gap-2.5">
                {data.supportLinks?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#555555] transition-colors hover:text-[#069D7A] md:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
              <p className="text-[16px] font-semibold text-[#212121] md:text-[18px]">Contact</p>
              <ul className="flex flex-col gap-2.5 text-[14px] text-[#555555] md:text-[15px]">
                <li className="leading-relaxed">
                  {data.contact?.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </li>
                <li>
                  <a href={`tel:${data.contact?.phone.replace(/\s/g, "")}`} className="hover:text-[#069D7A]">
                    {data.contact?.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${data.contact?.email}`}
                    className="break-all hover:text-[#069D7A]"
                  >
                    {data.contact?.email}
                  </a>
                </li>
                <li>
                  <Link
                    href={data.contact?.whatsappHref || "#"}
                    className="underline underline-offset-2 hover:text-[#069D7A]"
                  >
                    Whatsapp
                  </Link>
                </li>
                <li>
                  <Link
                    href={data.contact?.telegramHref || "#"}
                    className="underline underline-offset-2 hover:text-[#069D7A]"
                  >
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
              <p className="text-[16px] font-semibold text-[#212121] md:text-[18px]">Blog</p>
              <ul className="flex flex-col gap-2.5">
                {data.blogLinks?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#555555] transition-colors hover:text-[#069D7A] md:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 flex flex-col gap-5 border-y border-[rgba(8,155,124,0.15)] py-8 md:mt-14 md:flex-row md:items-center md:justify-between md:gap-8 md:py-10">
          <div className="min-w-0 max-w-md">
            <p className="text-[22px] font-semibold text-[#212121] md:text-[26px]">
              {data.newsletter?.title}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#555555] md:text-[15px]">
              {data.newsletter?.description}
            </p>
          </div>

          <form
            className="flex w-full max-w-[480px] flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-lg sm:border sm:border-[#E7E7E7] sm:bg-white sm:p-1.5 md:shrink-0"
            action="#"
            method="post"
          >
            <input
              type="email"
              placeholder={data.newsletter?.placeholder}
              aria-label="Email address"
              className="!m-0 box-border !h-12 w-full !rounded-lg border border-[#E7E7E7] !bg-white px-4 !text-[15px] !leading-none text-[#212121] shadow-none outline-none placeholder:text-[#888] focus:!border-[#069D7A] focus:!ring-0 sm:!h-11 sm:flex-1 sm:!rounded-md sm:border-0 sm:focus:!border-transparent"
            />
            <button
              type="submit"
              className="inline-flex !h-12 w-full shrink-0 items-center justify-center !rounded-lg !border-0 bg-[#069D7A] px-6 !text-[15px] !font-semibold !leading-none text-white transition-colors hover:bg-[#058466] sm:!h-11 sm:w-auto sm:!rounded-md sm:px-7"
            >
              {data.newsletter?.buttonText}
            </button>
          </form>
        </div>

        {/* Copyright */}
        <p className="pt-6 text-center text-[14px] leading-none text-[#666666] md:pt-8 md:text-[15px]">
          <span className="inline-flex items-center justify-center gap-[0.35em]">
            <span className="text-[1em]">©</span>
            <span className="text-[1em]">{data.copyright.replace(/^©\s*/, "")}</span>
          </span>
        </p>
      </div>
    </footer>
  );
}
