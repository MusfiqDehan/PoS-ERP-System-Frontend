"use client";

import Link from "next/link";
import { useState } from "react";

import { blogDetailSidebarData } from "@/data/blog/detail-sidebar";

function CopyLinkIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5 shrink-0"
      aria-hidden
    >
      <rect
        x="6.667"
        y="6.667"
        width="10"
        height="10"
        rx="1.667"
        stroke="#089B7C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 6.667V5.833C13.333 4.453 12.214 3.333 10.833 3.333H5.833C4.453 3.333 3.333 4.453 3.333 5.833V10.833C3.333 12.214 4.453 13.333 5.833 13.333H6.667"
        stroke="#089B7C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogDetailSidebar() {
  const { toc, share } = blogDetailSidebarData;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside className="flex w-full max-w-none flex-col gap-6 xl:max-w-[270px]">
      <div className="relative rounded-[8px] bg-[#D2F9E9] p-4">
        <div className="border-b border-solid border-[rgba(8,155,124,0.12)] pb-3">
          <p className="whitespace-nowrap text-center text-[16px]! font-medium leading-[normal]! text-[#212121]">
            {toc.title}
          </p>
        </div>

        <div className="relative mt-4 max-h-[319px] overflow-y-auto pr-3 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-[1px] [&::-webkit-scrollbar-thumb]:bg-[#089B7C] [&::-webkit-scrollbar-track]:rounded-[1px] [&::-webkit-scrollbar-track]:bg-white">
          <nav className="flex flex-col gap-4">
            {toc.items.map((item) => (
              <div key={item.href} className="flex flex-col gap-4">
                <Link
                  href={item.href}
                  className={`flex items-start capitalize ${item.active ? "gap-1.5 text-[#089B7C]" : "gap-2 text-[#666666]"
                    }`}
                >
                  <span className="shrink-0 text-[14px]! font-medium leading-[normal]!">
                    {item.number}
                  </span>
                  <span
                    className={`text-[14px]! leading-[normal]! ${item.active ? "font-semibold" : "font-medium"
                      }`}
                  >
                    {item.label}
                  </span>
                </Link>

                {item.children ? (
                  <div className="flex flex-col gap-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-start gap-1 px-3 capitalize text-[#212121]"
                      >
                        <span className="shrink-0 text-[12px]! font-medium leading-[normal]!">
                          {child.number}
                        </span>
                        <span className="text-[12px]! font-medium leading-[normal]!">
                          {child.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="rounded-[8px] bg-[#D2F9E9] px-4 py-4">
        <div className="flex flex-col items-center gap-3">
          <p
            className="mb-0 whitespace-nowrap text-center text-[16px]! font-semibold leading-[normal]! text-[#212121]"
            style={{ fontFamily: `'Manrope', 'Google Sans', sans-serif` }}
          >
            {share.title}
          </p>

          <div className="flex w-full flex-nowrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex shrink-0 items-center gap-1 rounded-[8px] text-[#089B7C]"
            >
              <CopyLinkIcon />
              <span className="whitespace-nowrap text-[14px]! font-medium leading-[normal]!">
                {copied ? "Copied!" : share.copyLabel}
              </span>
            </button>

            <div className="flex shrink-0 items-center gap-1">
              {share.socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="size-6 shrink-0 overflow-hidden rounded-[4px]"
                >
                  <img
                    src={social.icon}
                    alt=""
                    className="size-full object-cover"
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
