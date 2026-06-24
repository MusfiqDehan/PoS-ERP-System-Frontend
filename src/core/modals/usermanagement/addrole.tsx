"use client";

import { useState } from "react";
import {
  ACCESS_LEVELS,
  type AccessLevel,
  permissionsMatrixData,
} from "@/components/usermanagement/rolesPermissions/permissionsMatrixData";

/** Selectable access levels for a custom role, low → high. */
const PERMISSION_LEVELS: AccessLevel[] = ["none", "view", "edit", "full"];

/** Solid colour for the active segmented option, one per access level. */
const ACTIVE_CLASSES: Record<AccessLevel, string> = {
  none: "bg-[#dc2626] text-white",
  view: "bg-[#6b7280] text-white",
  edit: "bg-[#e5950d] text-white",
  full: "bg-[#089b7c] text-white",
};

const roleFeatures = permissionsMatrixData.map((row) => ({
  id: row.id,
  feature: row.feature,
  module: row.module,
}));

const buildDefaultAccess = (): Record<string, AccessLevel> =>
  roleFeatures.reduce<Record<string, AccessLevel>>((acc, item) => {
    acc[item.id] = "none";
    return acc;
  }, {});

const AddRole = () => {
  const [access, setAccess] = useState<Record<string, AccessLevel>>(
    buildDefaultAccess,
  );

  const setFeatureAccess = (featureId: string, level: AccessLevel) =>
    setAccess((prev) => ({ ...prev, [featureId]: level }));

  const setAllAccess = (level: AccessLevel) =>
    setAccess(
      roleFeatures.reduce<Record<string, AccessLevel>>((acc, item) => {
        acc[item.id] = level;
        return acc;
      }, {}),
    );

  return (
    <>
      {/* Add Role */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content overflow-hidden rounded-[10px] border-0">
            <div className="flex items-center justify-between border-b border-[#e7e7e7] px-[24px] py-[16px]">
              <div>
                <h4 className="m-0 text-[18px] font-semibold leading-normal text-[#333333]">
                  Create Role
                </h4>
                <p className="mt-[4px] mb-0 text-[13px] font-normal leading-normal text-[#666666]">
                  Name the role and choose what each feature can access.
                </p>
              </div>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-[#f1f1f1]"
              >
                <i className="ti ti-x text-[18px] leading-none" />
              </button>
            </div>

            <form>
              <div className="px-[24px] py-[20px]">
                <div className="mb-[18px] grid grid-cols-1 gap-[16px] sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <label className="mb-[6px] block text-[14px] font-medium leading-normal text-[#333333]">
                      Role Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Store Manager"
                      className="w-full rounded-[6px] border border-[#e7e7e7] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#089b7c]"
                    />
                  </div>
                  <div className="flex items-center gap-[10px] sm:pb-[10px]">
                    <span className="text-[14px] font-medium leading-normal text-[#333333]">
                      Active
                    </span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <span className="h-[22px] w-[40px] rounded-full bg-[#e7e7e7] transition-colors after:absolute after:left-[3px] after:top-[3px] after:h-[16px] after:w-[16px] after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#089b7c] peer-checked:after:translate-x-[18px]" />
                    </label>
                  </div>
                </div>

                <div className="rounded-[8px] border border-[#e7e7e7]">
                  <div className="flex flex-wrap items-center justify-between gap-[8px] border-b border-[#e7e7e7] bg-[#f6f6f6] px-[16px] py-[10px]">
                    <p className="m-0 text-[14px] font-semibold leading-normal text-[#333333]">
                      Feature Permissions
                    </p>
                    <div className="flex items-center gap-[6px]">
                      <span className="text-[12px] font-normal leading-normal text-[#666666]">
                        Set all:
                      </span>
                      {PERMISSION_LEVELS.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setAllAccess(level)}
                          className="rounded-[4px] border border-[#e7e7e7] bg-white px-[8px] py-[3px] text-[12px] font-medium leading-normal text-[#666666] transition-colors hover:border-[#089b7c] hover:text-[#089b7c]"
                        >
                          {ACCESS_LEVELS[level].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="role-feature-scroll max-h-[300px] overflow-y-auto">
                    {roleFeatures.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex flex-wrap items-center justify-between gap-[10px] px-[16px] py-[12px] ${
                          index !== roleFeatures.length - 1
                            ? "border-b border-[#f1f1f1]"
                            : ""
                        }`}
                      >
                        <div>
                          <p className="m-0 text-[14px] font-medium leading-normal text-[#333333]">
                            {item.feature}
                          </p>
                          <p className="mt-[2px] mb-0 text-[12px] font-normal leading-normal text-[#999999]">
                            {item.module}
                          </p>
                        </div>
                        <div className="inline-flex rounded-[6px] border border-[#e7e7e7] p-[2px]">
                          {PERMISSION_LEVELS.map((level) => {
                            const isActive = access[item.id] === level;
                            return (
                              <button
                                key={level}
                                type="button"
                                onClick={() => setFeatureAccess(item.id, level)}
                                className={`flex items-center gap-[4px] rounded-[4px] px-[10px] py-[4px] text-[12px] font-medium leading-normal transition-colors ${
                                  isActive
                                    ? ACTIVE_CLASSES[level]
                                    : "text-[#666666] hover:text-[#333333]"
                                }`}
                              >
                                <i
                                  className={`${ACCESS_LEVELS[level].iconClass} text-[13px] leading-none`}
                                />
                                {ACCESS_LEVELS[level].label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-[8px] border-t border-[#e7e7e7] px-[24px] py-[16px]">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="rounded-[6px] border border-[#e7e7e7] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-[#666666] transition-colors hover:bg-[#f6f6f6]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="rounded-[6px] bg-[#089b7c] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-white transition-colors hover:bg-[#06866b]"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Add Role */}
    </>
  );
};

export default AddRole;
