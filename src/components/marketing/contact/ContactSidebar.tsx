"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { contactData } from "@/data/contact";
import { ContactInfoCards } from "./ContactInfoCards";

export function ContactSidebar() {
  const { sidebar } = contactData;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="flex w-full max-w-[470px] flex-col gap-6 xl:max-w-none">
      <ContactInfoCards />

      <div className="relative rounded-[8px] border border-solid border-[#F5F5F5] bg-[#F8F8F8] p-4">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-[70px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-solid border-[#F1F1F1] bg-white">
            <img
              src="/logo.png"
              alt=""
              className="size-14 object-contain"
              width={56}
              height={56}
            />
          </div>
          <div>
            <h3 className="text-[20px]! font-medium leading-[normal]! text-[#212121] md:text-[24px]!">
              {sidebar.support.badge}
            </h3>
            <p className="text-[16px]! font-normal leading-[1.5]! text-[#666666]">
              {sidebar.support.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {sidebar.support.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div key={faq.question} className="rounded-[4px] bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 text-left"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                >
                  <span className="text-[16px]! font-medium leading-6! text-[#212121]">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="size-3 shrink-0 text-[#212121]" />
                  ) : (
                    <Plus className="size-3 shrink-0 text-[#212121]" />
                  )}
                </button>
                {isOpen ? (
                  <div className="px-4 pb-3 text-[14px]! font-normal leading-[1.5]! text-[#666666]">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
