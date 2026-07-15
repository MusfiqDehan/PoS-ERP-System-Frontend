import Link from "next/link";

import { blogPageData } from "@/data/blog/page";

export function BlogCtaSection() {
  const { cta } = blogPageData;

  return (
    <section className="bg-white pb-10 md:pb-[50px]">
      <div className="mx-auto w-full max-w-[1170px] px-4 xl:px-0">
        <div className="relative min-h-[280px] overflow-hidden rounded-[8px] bg-[#089B7C] px-4 py-12 sm:min-h-[340px] sm:py-14 md:min-h-[414px] md:px-8 md:py-16">
          <div className="mx-auto flex w-full max-w-[868px] flex-col items-center gap-4 text-center md:gap-5">
            <p className="mb-0 w-full text-[28px]! font-medium capitalize leading-[1.25]! text-white sm:text-[36px]! md:text-[48px]! md:leading-[56px]!">
              {cta.title}
            </p>

            <div
              className="w-full text-[15px]! font-medium leading-[1.5]! text-white md:text-[16px]!"
              style={{ fontFamily: '"Manrope", sans-serif' }}
            >
              {cta.descriptionLines.map((line) => (
                <p key={line} className="mb-0">
                  {line}
                </p>
              ))}
            </div>

            <Link
              href={cta.buttonHref}
              className="mt-1 flex h-12 w-full max-w-[303px] items-center justify-center rounded-[4px] bg-white px-5 text-[15px]! font-medium leading-[normal]! text-[#089B7C] sm:text-[16px]!"
            >
              {cta.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
