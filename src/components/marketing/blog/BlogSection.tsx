"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogContent } from "@/data/landing/blog";
import { TwoLineSectionHeader } from "@/components/marketing/ui/TwoLineSectionHeader";

export function BlogSection() {
  const { featuredBlog } = blogContent;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto px-4 md:px-8 flex flex-col gap-6 items-center" style={{ maxWidth: 1200 }}>
        <TwoLineSectionHeader
          line1="Latest Guides And Expert Tips For"
          highlight="Modern Retail"
          line2After="Growth"
          description="Practical guides and retail strategies to help you run a smarter, faster operation."
        />

        <div className="flex flex-col gap-12 items-start w-full">

          {/* Two-Column Row */}
          <div className="flex flex-col lg:flex-row gap-[30px] items-start w-full">
            {/* Left: Image with green accent border */}
            <div className="w-full lg:w-[570px] shrink-0 bg-[#F5F5F5] border-solid border-[#089B7C] border-l-[4px] border-t-[4px] border-r-[2px] border-b-[2px] rounded-[8px] overflow-hidden relative h-[300px] sm:h-[350px] lg:h-[400px]">
              <Image
                src={featuredBlog.image}
                alt={featuredBlog.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 570px"
                priority
              />
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-[570px] shrink-0 flex flex-col gap-[32px] justify-center self-stretch">
              {/* Date + Category */}
              <div className="flex items-center justify-between w-full">
                <span
                  className="text-[20px] font-medium text-[#666] leading-none whitespace-nowrap"
                  style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
                >
                  {featuredBlog.date}
                </span>
                <span
                  className="bg-[#D6FAEB] inline-flex items-center justify-center px-[12px] py-[4px] rounded-[4px] text-[18px] font-medium text-[#089B7C] leading-none whitespace-nowrap"
                  style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
                >
                  {featuredBlog.category}
                </span>
              </div>

              {/* Heading + Desc + Author */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <h3
                    className="capitalize text-[28px] font-semibold text-[#212121] leading-[1.5] w-full"
                    style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
                  >
                    <Link
                      href={featuredBlog.slug ? `/blog/${featuredBlog.slug}` : "#"}
                      className="hover:text-[#089B7C] transition-colors"
                    >
                      {featuredBlog.title}
                    </Link>
                  </h3>
                  <p
                    className="text-[16px] font-normal text-[#666] leading-[1.5] w-full"
                    style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
                  >
                    {featuredBlog.desc}
                  </p>
                </div>

                <span
                  className="text-[20px] font-medium text-[#085D4E] leading-none whitespace-nowrap"
                  style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
                >
                  Author : {featuredBlog.author}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex gap-[2px] items-center">
          <div className="h-[5px] w-[32px] bg-[#089B7C] rounded-[4px] shrink-0" />
          <div className="size-[5px] bg-[#F1F1F1] rounded-[4px] shrink-0" />
          <div className="size-[5px] bg-[#F1F1F1] rounded-[4px] shrink-0" />
        </div>
      </div>
    </section>
  );
}
