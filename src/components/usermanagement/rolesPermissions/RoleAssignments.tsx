import {
  roleAssignmentFilters,
  roleAssignmentsData,
  type RoleAssignment,
} from "./roleAssignmentsData";

const COLUMNS = ["Email", "Role", "Branch", "Assign At", "Assigned By", "Action"];

function FilterChips() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {roleAssignmentFilters.map((filter, index) => {
        const isActive = index === 0;
        return (
          <button
            key={filter}
            type="button"
            className={`rounded-[4px] px-3 py-2 text-sm font-medium leading-[18px] ${
              isActive
                ? "bg-[#e7fbf7] text-[#089b7c]"
                : "border border-[#e7e7e7] text-[#666666]"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

function AssignmentRow({ row }: { row: RoleAssignment }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#e7e7e7] py-[14px]">
      <input
        type="checkbox"
        aria-label={`Select ${row.email}`}
        className="h-5 w-5 shrink-0 accent-[#089b7c]"
      />
      <p className="m-0 min-w-0 flex-1 truncate text-base font-medium leading-normal text-[#666666]">
        {row.email}
      </p>
      <p className="m-0 min-w-0 flex-1 truncate text-base font-medium leading-normal text-[#666666]">
        {row.role}
      </p>
      <p className="m-0 min-w-0 flex-1 truncate text-base font-medium leading-normal text-[#666666]">
        {row.branch}
      </p>
      <p className="m-0 min-w-0 flex-1 truncate text-base font-medium leading-normal text-[#666666]">
        {row.assignedAt}
      </p>
      <p className="m-0 min-w-0 flex-1 truncate text-base font-medium leading-normal text-[#666666]">
        {row.assignedBy}
      </p>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          aria-label="Edit assignment"
          className="text-[#666666]"
        >
          <i className="ti ti-edit text-base leading-none" />
        </button>
        <button
          type="button"
          aria-label="Delete assignment"
          className="text-[#666666]"
        >
          <i className="ti ti-trash text-base leading-none" />
        </button>
      </div>
    </div>
  );
}

export default function RoleAssignments() {
  return (
    <section className="mb-[24px] w-full rounded-lg border border-[#f1f1f1] bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="m-0 text-lg font-semibold leading-normal text-[#333333]">
            Role Assignments
          </h2>
          <p className="mt-1 mb-0 text-sm font-normal leading-normal text-[#666666]">
            People in your store with assigned roles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-[2px] border border-[#e7e7e7] px-4 py-1.5 text-sm font-medium leading-normal text-[#666666]"
          >
            Discard
          </button>
          <button
            type="button"
            className="rounded-[2px] border border-[#089b7c] bg-[#f1fcf5] px-4 py-1.5 text-sm font-medium leading-normal text-[#089b7c]"
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-4">
        <FilterChips />
      </div>

      <div className="mt-6 w-full overflow-x-auto">
        <div className="min-w-[860px]">
          <div className="flex items-center gap-3 border-t border-b border-[#089b7c] py-[14px] text-base font-semibold leading-normal text-[#333333]">
            <span className="h-5 w-5 shrink-0" aria-hidden="true" />
            {COLUMNS.map((col) => (
              <p key={col} className="m-0 min-w-0 flex-1 truncate">
                {col}
              </p>
            ))}
          </div>
          {roleAssignmentsData.map((row) => (
            <AssignmentRow key={row.id} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
}
