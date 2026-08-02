import { contactData } from "@/data/contact";

export function ContactHero() {
  const { hero } = contactData;

  return (
    <section className="relative w-full bg-gradient-to-b from-[#D2F9E9] to-white pb-10 pt-[120px] md:pb-16 md:pt-[140px]">
      <div className="relative mx-auto flex w-full max-w-[770px] flex-col items-center gap-4 px-4 md:gap-[16px]">
        <div className="inline-flex shrink-0 items-center justify-center gap-[10px] rounded-[4px] border-solid border-[#089B7C] border-b border-l-2 border-r border-t-2 px-[24px] py-[12px]">
          <div className="relative size-[16px] shrink-0 overflow-clip rounded-[130px] bg-[rgba(8,155,124,0.12)]">
            <div className="absolute left-1/2 top-1/2 size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-[130px] bg-[#089B7C]" />
          </div>
          <span className="whitespace-nowrap text-center text-[16px]! font-medium leading-[normal]! text-[#212121]">
            {hero.badge}
          </span>
        </div>

        <div className="flex w-full flex-col items-start gap-4 text-center md:gap-[16px]">
          <h1 className="mb-0 w-full text-[32px]! font-semibold capitalize leading-[normal]! text-[#212121] md:text-[48px]!">
            {hero.title}
          </h1>
          <p className="mb-0 w-full text-[16px]! font-normal leading-[1.5]! text-[#666666]">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
