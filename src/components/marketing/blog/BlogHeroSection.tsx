import { blogPageData } from "@/data/blog/page";

export function BlogHeroSection() {
  const { hero } = blogPageData;

  return (
    <section className="relative w-full bg-gradient-to-b from-[#D2F9E9] to-white pb-12 pt-[120px] md:min-h-[460px] md:pb-16 md:pt-[140px]">
      <div className="mx-auto flex w-full max-w-[770px] flex-col items-center gap-4 px-4">
        <div className="inline-flex shrink-0 items-center justify-center gap-[10px] rounded-[4px] border-solid border-[#089B7C] border-b border-l-2 border-r border-t-2 px-4 py-2.5 sm:px-[24px] sm:py-[12px]">
          <div className="relative size-[16px] shrink-0 overflow-clip rounded-[130px] bg-[rgba(8,155,124,0.12)]">
            <div className="absolute left-1/2 top-1/2 size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-[130px] bg-[#089B7C]" />
          </div>
          <span className="whitespace-nowrap text-center text-[14px]! font-medium leading-[normal]! text-[#212121] sm:text-[16px]!">
            {hero.badge}
          </span>
        </div>

        <div className="flex w-full flex-col items-start gap-3 text-center md:gap-[16px]">
          <h1 className="mb-0 w-full text-[32px]! font-semibold leading-[1.2]! text-[#212121] sm:text-[40px]! md:text-[48px]! md:leading-[normal]!">
            {hero.titleLines.map((line, index) => (
              <span key={line} className={index === 0 ? "mb-0 block" : "block"}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mb-0 w-full text-[15px]! font-normal leading-[1.5]! text-[#666666] md:text-[16px]!">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
