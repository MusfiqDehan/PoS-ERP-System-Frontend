import type { RoleCardData } from "./rolesData";

type RoleCardProps = {
  role: RoleCardData;
  onSelectRole?: (slug: string, name: string) => void;
};

export default function RoleCard({ role, onSelectRole }: RoleCardProps) {
  const iconChipClass = role.highlight ? "bg-[#ffeed4]" : "bg-[#e7e7e7]";
  const iconColorClass = role.highlight ? "text-[#e8a33d]" : "text-[#666666]";

  return (
    <article className="flex w-full min-w-0 flex-col gap-4 rounded border border-[#e7e7e7] bg-white p-4">
      <div className="flex w-full items-start justify-between gap-6 border-b border-[#e7e7e7] pb-3">
        <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
          <p className="m-0 text-base font-semibold leading-normal text-[#333333]">{role.name}</p>
          <p className="m-0 text-sm font-normal leading-normal text-[#666666]">
            {role.description}
          </p>
        </div>
        <span
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] ${iconChipClass}`}
          aria-hidden="true"
        >
          <i
            className={`${role.iconClass} flex h-[18px] w-[18px] items-center justify-center text-[18px] leading-none ${iconColorClass}`}
          />
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="m-0 text-sm font-medium leading-normal text-[#666666]">
          {role.members} {role.members === 1 ? "Member" : "Members"}
        </p>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#assign-role-member"
          onClick={() => onSelectRole?.(role.id, role.name)}
          className="inline-flex items-center gap-1 rounded-[2px] border border-[#666666] py-1 pl-1 pr-2.5 text-sm font-medium leading-normal text-[#666666]"
        >
          <i className="ti ti-user-plus text-lg leading-none" />
          Add
        </button>
      </div>
    </article>
  );
}
