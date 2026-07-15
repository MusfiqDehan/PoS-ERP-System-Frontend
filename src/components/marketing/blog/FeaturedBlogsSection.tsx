import Image from "next/image";
import Link from "next/link";

import { blogPageData } from "@/data/blog/page";

export function FeaturedBlogsSection() {
  const { featuredBlog } = blogPageData;

  return (
    <section className="bg-white pb-10 md:pb-[50px]">
      <div className="mx-auto flex w-full max-w-[1170px] flex-col items-center gap-6 px-4 md:gap-[24px] xl:px-0">
        <div className="flex w-full flex-col items-start gap-8 md:gap-[48px]">
          <h2
            className="w-full text-center text-[28px]! font-bold leading-[1.3]! text-[#212121] sm:text-[32px]! md:text-[36px]! md:leading-[1.5]!"
            style={{ fontFamily: '"Manrope", sans-serif' }}
          >
            {featuredBlog.title}
          </h2>

          <div className="flex w-full flex-col items-start gap-6 md:gap-[30px] lg:flex-row">
            <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[8px] border-solid border-[#089B7C] border-b-2 border-l-4 border-r-2 border-t-4 bg-[#F5F5F5] sm:h-[300px] md:h-[360px] lg:h-[400px] lg:w-[570px]">
              <Image
                src={featuredBlog.image}
                alt={featuredBlog.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 570px"
                priority
              />
            </div>

            <div className="flex w-full min-w-0 flex-col justify-center gap-6 self-stretch md:gap-[32px] lg:w-[570px]">
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <span className="text-[16px]! font-medium leading-[normal]! text-[#666666] sm:text-[18px]! md:text-[20px]!">
                  {featuredBlog.date}
                </span>
                <span className="inline-flex shrink-0 items-center justify-center rounded-[4px] bg-[#D6FAEB] px-3 py-1 text-[14px]! font-medium leading-[normal]! text-[#089B7C] sm:text-[16px]! md:text-[18px]!">
                  {featuredBlog.category}
                </span>
              </div>

              <div className="flex w-full flex-col items-start justify-center gap-4 md:gap-[32px]">
                <div className="flex w-full flex-col items-start gap-3 md:gap-[16px]">
                  <h3 className="w-full text-[22px]! font-semibold capitalize leading-[1.3]! text-[#212121] sm:text-[24px]! md:text-[28px]!">
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="transition-colors hover:text-[#089B7C]"
                    >
                      {featuredBlog.heading}
                    </Link>
                  </h3>
                  <p className="w-full text-[15px]! font-normal leading-[1.5]! text-[#666666] md:text-[16px]!">
                    {featuredBlog.description}
                  </p>
                </div>

                <p className="text-[16px]! font-medium leading-[normal]! text-[#085D4E] md:text-[20px]!">
                  Author : {featuredBlog.author}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[2px]">
          <div className="h-[5px] w-[32px] shrink-0 rounded-[4px] bg-[#089B7C]" />
          <div className="size-[5px] shrink-0 rounded-[4px] bg-[#F1F1F1]" />
          <div className="size-[5px] shrink-0 rounded-[4px] bg-[#F1F1F1]" />
        </div>
      </div>
    </section>
  );
}
