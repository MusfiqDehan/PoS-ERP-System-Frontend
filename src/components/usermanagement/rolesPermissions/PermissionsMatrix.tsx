import AccessSelect from "./AccessSelect";
import {
  ACCESS_LEVELS,
  permissionsMatrixData,
  roleColumns,
  type AccessLevel,
  type PermissionRow,
} from "./permissionsMatrixData";

const FEATURE_COL_WIDTH = 180;
const ROLE_COL_MIN = 150;
const COLUMN_GAP = 12;
/** Role columns that fill the visible window; the rest overflow to the scroller. */
const VISIBLE_ROLE_COLS = 5;

// Each role column takes an equal share of the window so exactly
// VISIBLE_ROLE_COLS fill it, but never shrinks below ROLE_COL_MIN.
// `cqw` is measured against the scroll window (not the grid's own width),
// so the grid can be content-width — letting borders span every column.
const roleColWidth = `max(${ROLE_COL_MIN}px, calc((100cqw - ${
  FEATURE_COL_WIDTH + VISIBLE_ROLE_COLS * COLUMN_GAP
}px) / ${VISIBLE_ROLE_COLS}))`;

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: `${FEATURE_COL_WIDTH}px repeat(${roleColumns.length}, ${roleColWidth})`,
  columnGap: `${COLUMN_GAP}px`,
};

const stickyFeatureClass =
  "sticky left-0 z-20 self-stretch bg-white border-r border-[#e7e7e7] shadow-[8px_0_8px_-6px_rgba(0,0,0,0.06)]";

function AccessBadge({ level }: { level: AccessLevel }) {
  const config = ACCESS_LEVELS[level];
  return (
    <div
      className={`mx-auto flex w-fit items-center justify-center gap-1 rounded-[4px] px-3 py-1 ${config.bgClass}`}
    >
      <i
        className={`${config.iconClass} flex h-[18px] w-[18px] items-center justify-center text-[16px] leading-none ${config.textClass}`}
      />
      <span className={`text-sm font-medium leading-normal ${config.textClass}`}>
        {config.label}
      </span>
    </div>
  );
}

function MatrixRow({ row, isLast }: { row: PermissionRow; isLast: boolean }) {
  return (
    <div
      className={`items-center py-[10px] ${isLast ? "" : "border-b border-[#e7e7e7]"}`}
      style={gridStyle}
    >
      <div className={`flex flex-col justify-center gap-1 pr-3 ${stickyFeatureClass}`}>
        <p className="m-0 truncate text-base font-semibold leading-normal text-[#212b36]">
          {row.feature}
        </p>
        <p className="m-0 truncate text-sm font-medium leading-normal text-[#666666]">
          {row.module}
        </p>
      </div>
      {roleColumns.map((col) =>
        col.variant === "badge" ? (
          <AccessBadge key={col.key} level={row.access[col.key]} />
        ) : (
          <AccessSelect key={col.key} defaultLevel={row.access[col.key]} />
        ),
      )}
    </div>
  );
}

export default function PermissionsMatrix() {
  return (
    <section className="mb-[24px] w-full rounded-lg border border-[#f1f1f1] bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="m-0 text-lg font-semibold leading-normal text-[#333333]">
            Permissions matrix
          </h2>
          <p className="mt-1 mb-0 text-sm font-normal leading-normal text-[#666666]">
            Feature access by role — click a cell to edit.
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

      <div className="permissions-matrix-scroll mt-4 w-full overflow-x-auto">
        <div className="w-max min-w-full">
          <div
            className="items-center border-t border-b border-[#089b7c] py-[14px] text-base font-semibold leading-normal text-[#333333]"
            style={gridStyle}
          >
            <p className={`m-0 flex items-center truncate ${stickyFeatureClass}`}>
              Feature
            </p>
            {roleColumns.map((col) => (
              <p key={col.key} className="m-0 truncate text-center">
                {col.label}
              </p>
            ))}
          </div>
          {permissionsMatrixData.map((row, index) => (
            <MatrixRow
              key={row.id}
              row={row}
              isLast={index === permissionsMatrixData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
