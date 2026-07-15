import type { ReactNode } from "react";
import Link from "next/link";

import { contactData } from "@/data/contact";

function WhatsAppIcon() {
  return (
    <img
      src="/images/contact/whatsapp.png"
      alt=""
      className="size-10 object-contain"
      width={40}
      height={40}
    />
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-10"
      aria-hidden
    >
      <path
        d="M36.6673 11.666L21.6823 21.211C21.1738 21.5064 20.5962 21.6619 20.0082 21.6619C19.4201 21.6619 18.8425 21.5064 18.334 21.211L3.33398 11.666"
        stroke="#F6A052"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.334 6.66602H6.66732C4.82637 6.66602 3.33398 8.1584 3.33398 9.99935V29.9993C3.33398 31.8403 4.82637 33.3327 6.66732 33.3327H33.334C35.1749 33.3327 36.6673 31.8403 36.6673 29.9993V9.99935C36.6673 8.1584 35.1749 6.66602 33.334 6.66602Z"
        stroke="#F6A052"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-10"
      aria-hidden
    >
      <path
        d="M33.3327 16.6673C33.3327 24.989 24.101 33.6557 21.001 36.3323C20.7122 36.5495 20.3607 36.6669 19.9993 36.6669C19.638 36.6669 19.2865 36.5495 18.9977 36.3323C15.8977 33.6557 6.66602 24.989 6.66602 16.6673C6.66602 13.1311 8.07077 9.73971 10.5713 7.23923C13.0717 4.73874 16.4631 3.33398 19.9993 3.33398C23.5356 3.33398 26.927 4.73874 29.4274 7.23923C31.9279 9.73971 33.3327 13.1311 33.3327 16.6673Z"
        stroke="#05B0FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 21.666C22.7614 21.666 25 19.4274 25 16.666C25 13.9046 22.7614 11.666 20 11.666C17.2386 11.666 15 13.9046 15 16.666C15 19.4274 17.2386 21.666 20 21.666Z"
        stroke="#05B0FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactInfoCard({
  icon,
  iconBg,
  iconBorder,
  title,
  value,
  href,
  className = "",
}: Readonly<{
  icon: ReactNode;
  iconBg: string;
  iconBorder: string;
  title: string;
  value: string;
  href?: string;
  className?: string;
}>) {
  const valueClassName =
    "text-[18px]! font-medium leading-[normal]! text-[#212121] md:text-[20px]! break-words";

  return (
    <div
      className={`flex flex-col gap-2 border-b border-solid border-[#F1F1F1] pb-4 ${className}`}
    >
      <div
        className="relative flex size-[70px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border-solid border-b border-l-2 border-r border-t-2"
        style={{ backgroundColor: iconBg, borderColor: iconBorder }}
      >
        {icon}
      </div>
      <p className="text-[16px]! font-normal leading-[1.5]! text-[#666666]">{title}</p>
      {href ? (
        <Link href={href} className={`${valueClassName} hover:text-[#089B7C]`}>
          {value}
        </Link>
      ) : (
        <p className={valueClassName}>{value}</p>
      )}
    </div>
  );
}

export function ContactInfoCards() {
  const { sidebar } = contactData;

  return (
    <div className="flex w-full max-w-[470px] flex-col gap-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
        <ContactInfoCard
          icon={<WhatsAppIcon />}
          iconBg="rgba(37,211,102,0.08)"
          iconBorder="#25D366"
          title={sidebar.whatsapp.title}
          value={sidebar.whatsapp.value}
          href={sidebar.whatsapp.href}
          className="w-full sm:w-[223px] sm:shrink-0"
        />
        <ContactInfoCard
          icon={<EmailIcon />}
          iconBg="rgba(246,160,82,0.08)"
          iconBorder="#F6A052"
          title={sidebar.email.title}
          value={sidebar.email.value}
          href={sidebar.email.href}
          className="w-full sm:w-[223px] sm:shrink-0"
        />
      </div>

      <ContactInfoCard
        icon={<LocationIcon />}
        iconBg="rgba(5,176,255,0.08)"
        iconBorder="#05B0FF"
        title={sidebar.location.title}
        value={sidebar.location.value}
        className="w-full"
      />
    </div>
  );
}
