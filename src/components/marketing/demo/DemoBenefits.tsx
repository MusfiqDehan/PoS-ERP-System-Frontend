import { Check } from "lucide-react";

import { demoData } from "@/data/demo";

export function DemoBenefits() {
  const { leftColumn } = demoData;

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      <h2 className="mb-0 !text-[28px] md:!text-[36px] !font-semibold capitalize !leading-normal !text-[#089B7C]">
        {leftColumn.title}
      </h2>

      <p className="mb-0 text-[16px]! font-normal leading-[1.5]! text-[#666666]">
        {leftColumn.description}
      </p>

      <div className="flex flex-col gap-[22px]">
        <h3 className="mb-0 text-[18px]! font-semibold capitalize leading-[normal]! text-[#212121] md:text-[22px]!">
          {leftColumn.subtitle}
        </h3>

        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {leftColumn.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#089B7C]">
                <Check className="size-3 text-white" strokeWidth={3} />
              </span>
              <p className="mb-0 text-[15px]! font-normal leading-[normal]! text-[#666666] md:text-[16px]!">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-0 text-[16px]! font-semibold capitalize leading-[normal]! text-black md:text-[18px]!">
        {leftColumn.footerText}
        <a
          href={`tel:${leftColumn.footerPhone.replace(/\s/g, "")}`}
          className="text-[#089B7C] no-underline hover:underline"
        >
          {leftColumn.footerPhone}
        </a>
        {leftColumn.footerSuffix}
      </p>
    </div>
  );
}
