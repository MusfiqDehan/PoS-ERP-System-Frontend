import RoleCard from "./RoleCard";
import { rolesData, type RoleCardData } from "./rolesData";

type Props = {
  data?: RoleCardData[];
  onSelectRole?: (slug: string, name: string) => void;
};

export default function RolesCards({ data, onSelectRole }: Props) {
  const cards = data ?? rolesData;
  return (
    <section className="mb-[24px] w-full overflow-hidden rounded-lg border border-[#f1f1f1] bg-white p-4">
      <h2 className="m-0 text-lg font-semibold leading-normal text-[#333333]">Roles</h2>
      <p className="mt-1 mb-4 text-sm font-normal leading-normal text-[#666666]">
        Predefined and custom roles for your team.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((role) => (
          <RoleCard key={role.id} role={role} onSelectRole={onSelectRole} />
        ))}
      </div>
    </section>
  );
}
