"use client";
import { useState, useRef } from "react";
import type { CreateWarrantyPayload } from "@/lib/inventory";

const ic = "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const lc = "block text-[13px] font-medium text-[#212B36] mb-1.5";

type Props = { onAddWarranty: (p: CreateWarrantyPayload) => Promise<boolean> };

export default function AddWarrantyModal({ onAddWarranty }: Props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [dur, setDur] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sub, setSub] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  const reset = () => { setName(""); setDesc(""); setDur(""); setIsActive(true); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSub(true);
    const ok = await onAddWarranty({ name: name.trim(), description: desc.trim() || undefined, duration_days: dur ? Number(dur) : undefined, is_active: isActive });
    setSub(false);
    if (ok) { reset(); close.current?.click(); }
  };

  return (
    <div className="modal fade" id="add-warranty"><div className="modal-dialog modal-dialog-centered"><div className="modal-content">
      <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]"><h4 className="m-0 text-[18px] font-bold text-[#212B36]">Add Warranty</h4><button type="button" data-bs-dismiss="modal" ref={close} className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]" onClick={reset}><i className="ti ti-x" /></button></div>
      <form onSubmit={submit}>
        <div className="p-4 flex flex-col gap-4">
          <div><label className={lc}>Name <span className="text-[#dc3545]">*</span></label><input type="text" className={ic} value={name} onChange={e => setName(e.target.value)} required /></div>
          <div><label className={lc}>Description</label><textarea className={ic} rows={2} value={desc} onChange={e => setDesc(e.target.value)} /></div>
          <div><label className={lc}>Duration (Days)</label><input type="number" className={ic} value={dur} onChange={e => setDur(e.target.value)} /></div>
          <div className="flex items-center justify-between"><span className="text-[14px] font-medium text-[#212B36]">Status <span className="text-[#dc3545]">*</span></span><label className="inline-flex items-center cursor-pointer"><input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="sr-only peer" /><span className="relative block w-9 h-5 bg-[#e7e7e7] rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" /></label></div>
        </div>
        <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
          <button type="button" data-bs-dismiss="modal" className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors" onClick={reset}>Cancel</button>
          <button type="submit" disabled={sub || !name.trim()} className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{sub ? "Adding..." : "Add Warranty"}</button>
        </div>
      </form>
    </div></div></div>
  );
}
