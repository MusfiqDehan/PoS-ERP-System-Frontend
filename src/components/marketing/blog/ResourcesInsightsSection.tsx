"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { blogPageData } from "@/data/blog/page";
import { TwoLineSectionHeader } from "@/components/marketing/ui/TwoLineSectionHeader";

const fontSans = `'Google Sans', 'Roboto', sans-serif`;

const ITEMS_PER_PAGE = 9;

export function ResourcesInsightsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { resources, allBlogs } = blogPageData;
  const categories = resources.categories;

  const filtered = allBlogs.filter((blog) => {
    return activeCategory === "All" || blog.category === activeCategory;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const currentBlogs = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 flex flex-col gap-10 items-center">
        <TwoLineSectionHeader
          line1="Browse Resources And Expert Advice For"
          highlight="Smarter Retail"
          line2After="Operations"
          description={resources.subtitle}
        />

        {/* Search + category filters — stacked/wrap on mobile, tidy spacing */}
        <div className="flex w-full flex-col items-stretch gap-3 sm:gap-4">
          <div className="flex h-10 w-full items-center gap-1.5 rounded-[4px] border border-[#F1F1F1] bg-[#F8F8F8] px-3 sm:mx-auto sm:max-w-[280px]">
            <Search className="size-5 shrink-0 text-[#666]" />
            <span
              className="text-[15px] leading-[1.5] text-[#666] whitespace-nowrap"
              style={{ fontFamily: fontSans }}
            >
              Search
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`rounded-[4px] border px-3 py-2 text-[13px] leading-none transition-colors whitespace-nowrap sm:px-3.5 sm:text-[14px] ${
                  activeCategory === cat
                    ? "border-[#089B7C] text-[#089B7C]"
                    : "border-[#666] text-[#666]"
                }`}
                style={{ fontFamily: fontSans }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3×3 Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 w-full">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}

function BlogCard({
  blog,
}: Readonly<{ blog: (typeof blogPageData.allBlogs)[number] }>) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex flex-col w-full min-w-0">
      <div className="bg-[#F5F5F5] h-[220px] overflow-hidden relative rounded-lg w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={blog.title}
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={blog.image}
        />
      </div>

      <div className="flex flex-col gap-3 mt-4 w-full flex-1">
        <div className="flex items-center justify-between gap-3 w-full">
          <p
            className="font-medium text-[#666] text-[14px] leading-none whitespace-nowrap"
            style={{ fontFamily: fontSans }}
          >
            {blog.date}
          </p>
          <div className="bg-[#D6FAEB] flex items-center justify-center px-3 py-1 rounded shrink-0">
            <p
              className="font-medium text-[#089B7C] text-[13px] leading-none whitespace-nowrap"
              style={{ fontFamily: fontSans }}
            >
              {blog.category}
            </p>
          </div>
        </div>

        <p
          className="font-semibold text-[#212121] text-[18px] leading-snug line-clamp-2 w-full group-hover:text-[#089B7C] transition-colors"
          style={{ fontFamily: fontSans }}
        >
          {blog.title}
        </p>

        <p
          className="font-normal text-[#666] text-[15px] leading-[1.5] line-clamp-2 w-full"
          style={{ fontFamily: fontSans }}
        >
          {blog.desc}
        </p>

        <p
          className="mt-auto font-medium text-[#085D4E] text-[14px] leading-none whitespace-nowrap pt-1"
          style={{ fontFamily: fontSans }}
        >
          Author : {blog.author}
        </p>
      </div>
    </Link>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Readonly<{
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}>) {
  if (totalPages <= 1) return null;

  const pages: { key: string; label: number | string }[] = [];
  let dotCount = 0;
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push({ key: `${i}`, label: i });
  } else {
    pages.push({ key: "1", label: 1 });
    if (currentPage > 3) pages.push({ key: `dots-${++dotCount}`, label: "..." });
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push({ key: `${i}`, label: i });
    }
    if (currentPage < totalPages - 2) {
      pages.push({ key: `dots-${++dotCount}`, label: "..." });
    }
    pages.push({ key: `${totalPages}`, label: totalPages });
  }

  return (
    <div className="flex gap-0.5 items-center">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="size-10 bg-[#F5F5F5] rounded flex items-center justify-center disabled:opacity-40"
      >
        <ChevronLeft className="size-6 text-[#515151]" />
      </button>

      {pages.map((page) => {
        if (page.label === "...") {
          return (
            <span
              key={page.key}
              className="size-10 flex items-center justify-center text-[14px] text-[#515151]"
              style={{ fontFamily: fontSans }}
            >
              ...
            </span>
          );
        }
        const active = page.label === currentPage;
        return (
          <button
            key={page.key}
            type="button"
            onClick={() => onPageChange(page.label as number)}
            className={`size-10 rounded flex items-center justify-center text-[14px] transition-colors ${
              active ? "bg-[#089B7C] text-[#F6F6F6]" : "text-[#515151]"
            }`}
            style={{ fontFamily: fontSans }}
          >
            {page.label}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="size-10 bg-[#F5F5F5] rounded flex items-center justify-center disabled:opacity-40"
      >
        <ChevronRight className="size-6 text-[#515151]" />
      </button>
    </div>
  );
}
