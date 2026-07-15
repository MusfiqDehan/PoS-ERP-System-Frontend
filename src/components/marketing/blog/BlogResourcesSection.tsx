"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

import { blogPageData } from "@/data/blog/page";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export function BlogResourcesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { resources, allBlogs } = blogPageData;

  const filtered = allBlogs.filter(
    (blog) => activeCategory === "All" || blog.category === activeCategory
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const currentBlogs = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="bg-white pb-10 md:pb-[50px]">
      <div className="mx-auto flex w-full max-w-[1170px] flex-col items-center gap-8 px-4 md:gap-[40px] xl:px-0">
        <div className="flex w-full max-w-[770px] flex-col items-center gap-3 md:gap-[12px]">
          <div className="inline-flex shrink-0 items-center justify-center gap-[10px] rounded-[4px] border border-solid border-[#089B7C] px-4 py-2.5 sm:px-[24px] sm:py-[12px]">
            <div className="relative size-[12px] shrink-0 overflow-clip rounded-[100px] bg-[rgba(8,155,124,0.12)]">
              <div className="absolute left-1/2 top-1/2 size-[8px] -translate-x-1/2 -translate-y-1/2 rounded-[100px] bg-[#089B7C]" />
            </div>
            <span className="whitespace-nowrap text-center text-[14px] font-medium leading-[normal] text-[#212121] sm:text-[16px]">
              {resources.badge}
            </span>
          </div>

          <div className="flex w-full flex-col items-start gap-3 text-center md:gap-[16px]">
            <h2 className="w-full text-[28px]! font-semibold capitalize leading-[1.2]! text-[#212121] sm:text-[36px]! md:text-[48px]!">
              {resources.title}
            </h2>
            <p className="w-full text-[15px]! font-normal leading-[1.5]! text-[#666666] md:text-[16px]!">
              {resources.subtitle}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-8 md:gap-[40px]">
          <div className="flex w-full flex-col items-stretch gap-3 sm:gap-4">
            <div className="flex h-10 w-full items-center gap-1.5 rounded-[4px] border border-solid border-[#F1F1F1] bg-[#F8F8F8] px-3 sm:mx-auto sm:max-w-[280px]">
              <Search className="size-5 shrink-0 text-[#666666]" />
              <span className="whitespace-nowrap text-[16px] leading-[1.5] text-[#666666]">
                Search
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {resources.categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "rounded-[4px] border border-solid px-3 py-2 text-[13px] leading-[1.5] whitespace-nowrap transition-colors sm:px-4 sm:text-[16px]",
                    activeCategory === category
                      ? "border-[#089B7C] text-[#089B7C]"
                      : "border-[#666666] text-[#666666]"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-10">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>

        <BlogPagination
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
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex w-full min-w-0 flex-col gap-4"
    >
      <div className="relative h-[200px] w-full overflow-hidden rounded-[8px] bg-[#F5F5F5] sm:h-[226px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 370px"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-center justify-between gap-3">
          <span className="whitespace-nowrap text-[14px]! font-medium leading-[normal]! text-[#666666] sm:text-[16px]!">
            {blog.date}
          </span>
          <span className="inline-flex items-center justify-center rounded-[4px] bg-[#D6FAEB] px-3 py-1 text-[13px]! font-medium leading-[normal]! text-[#089B7C] sm:text-[14px]!">
            {blog.category}
          </span>
        </div>

        <h3 className="w-full text-[18px]! font-semibold capitalize leading-[1.3]! text-[#212121] transition-colors group-hover:text-[#089B7C] sm:text-[20px]!">
          {blog.title}
        </h3>

        <p className="line-clamp-2 w-full text-[15px]! font-normal leading-[1.5]! text-[#666666] sm:text-[16px]!">
          {blog.desc}
        </p>

        <p className="text-[14px]! font-medium leading-[normal]! text-[#085D4E] sm:text-[16px]!">
          Author : {blog.author}
        </p>
      </div>
    </Link>
  );
}

function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Readonly<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}>) {
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="flex max-w-full items-center justify-center gap-1 overflow-x-auto px-1 sm:gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-[#F5F5F5] disabled:opacity-40 sm:size-10"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-5 text-[#515151] sm:size-6" />
      </button>

      {pages.map((page) => (
        <PageNumber
          key={page}
          page={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-[#F5F5F5] disabled:opacity-40 sm:size-10"
        aria-label="Next page"
      >
        <ChevronRight className="size-5 text-[#515151] sm:size-6" />
      </button>
    </div>
  );
}

function PageNumber({
  page,
  currentPage,
  onPageChange,
}: Readonly<{
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}>) {
  return (
    <button
      type="button"
      onClick={() => onPageChange(page)}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-[4px] text-[14px] leading-[20px] sm:size-10",
        currentPage === page ? "bg-[#089B7C] text-[#F6F6F6]" : "text-[#515151]"
      )}
    >
      {page}
    </button>
  );
}
