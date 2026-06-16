import type { RolesPermissionsKpiCardData } from "./rolesPermissionsKpiData";

type RolesPermissionsKpiCardProps = {
  card: RolesPermissionsKpiCardData;
};

const badgeVariantClasses = {
  success: "bg-[#f1fcf5] text-[#237e46]",
  danger: "bg-[#fff0f0] text-[#c80000]",
} as const;

export default function RolesPermissionsKpiCard({ card }: RolesPermissionsKpiCardProps) {
  return (
    <article className="flex w-full min-w-0 flex-col gap-4 overflow-hidden rounded-lg border border-[#e7e7e7] border-t-2 border-l-2 bg-white p-5">
      <div className="flex w-full items-start justify-between gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="m-0 text-base font-medium leading-normal text-[#666666]">{card.label}</p>
          <p className="m-0 text-2xl font-semibold leading-8 text-[#333333]">{card.value}</p>
        </div>
        <span
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] border border-[#e7e7e7] bg-white shadow-[0_3px_45px_rgba(231,231,231,0.48)]"
          aria-hidden="true"
        >
          <i className={`${card.iconClass} text-xl leading-none text-[#666666]`} />
        </span>
      </div>
      <span
        className={`inline-flex w-fit items-center justify-center whitespace-nowrap rounded px-3 py-1 text-sm font-medium leading-normal ${badgeVariantClasses[card.badgeVariant]}`}
      >
        {card.badgeText}
      </span>
    </article>
  );
}
