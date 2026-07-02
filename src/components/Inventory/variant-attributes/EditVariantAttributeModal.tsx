"use client";
import { useState, useEffect } from "react";
import type { VariantAttributeRecord } from "./types";
import type { UpdateVariantAttributePayload } from "@/lib/inventory";

const ic = "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const lc = "block text-[13px] font-medium text-[#212B36] mb-1.5";

type Props = { attr: VariantAttributeRecord | null; onEdit: (id: string, p: UpdateVariantAttributePayload) => Promise<boolean> };

export default function EditVariantAttributeModal({ attr, onEdit }: Props) {
  const [name, setName] = useState("");
  const [values, setValues] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sub, setSub] = useState(false);

  useEffect(() => { if (attr) { setName(attr.name); setValues(attr.values ?? ""); setIsActive(attr.is_active); } }, [attr]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!attr || !name.trim()) return;
    setSub(true);
    const ok = await onEdit(attr.id, { name: name.trim(), values: values.trim() || null, is_active: isActive });
    setSub(false);
    if (ok) (window as any).bootstrap?.Modal?.getInstance?.(document.getElementById("edit-variant-attribute"))?.hide();
  };

  return (
    <div className="modal fade" id="edit-variant-attribute"><div className="modal-dialog modal-dialog-centered"><div className="modal-content">
      <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]"><h4 className="m-0 text-[18px] font-bold text-[#212B36]">Edit Variant Attribute</h4><button type="button" data-bs-dismiss="modal" className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"><i className="ti ti-x" /></button></div>
      <form onSubmit={submit}>
        <div className="p-4 flex flex-col gap-4">
          <div><label className={lc}>Name <span className="text-[#dc3545]">*</span></label><input type="text" className={ic} value={name} onChange={e => setName(e.target.value)} required /></div>
          <div><label className={lc}>Values <span className="text-[#dc3545]">*</span></label><input type="text" className={ic} value={values} onChange={e => setValues(e.target.value)} required /></div>
          <div className="flex items-center justify-between"><span className="text-[14px] font-medium text-[#212B36]">Status <span className="text-[#dc3545]">*</span></span><label className="inline-flex items-center cursor-pointer"><input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="sr-only peer" /><span className="relative block w-9 h-5 bg-[#e7e7e7] rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" /></label></div>
        </div>
        <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
          <button type="button" data-bs-dismiss="modal" className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors">Cancel</button>
          <button type="submit" disabled={sub || !name.trim() || !values.trim()} className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{sub ? "Saving..." : "Save Changes"}</button>
        </div>
      </form>
    </div></div></div>
  );
}
