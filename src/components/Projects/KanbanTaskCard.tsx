"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ProjectTask } from "./projectData";

type KanbanTaskCardProps = {
  task: ProjectTask;
};

const priorityMap: Record<string, { bg: string; color: string }> = {
  Low: { bg: "#E7FBF7", color: "#0ac79e" },
  Medium: { bg: "#FFFAEA", color: "#e5950d" },
  High: { bg: "#F2EDFE", color: "#6938EF" },
};

const teamAvatars = [
  "assets/img/profiles/avatar-19.jpg",
  "assets/img/profiles/avatar-29.jpg",
  "assets/img/profiles/avatar-16.jpg",
  "assets/img/profiles/avatar-01.jpg",
  "assets/img/profiles/avatar-02.jpg",
  "assets/img/profiles/avatar-03.jpg",
];

export default function KanbanTaskCard({ task }: KanbanTaskCardProps) {
  const p = priorityMap[task.priority] || priorityMap.High;

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-lg shadow-sm p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-[2px] rounded text-[11px] font-medium border border-[#e7e7e7] text-[#212B36]">
            Web Layout
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-[2px] rounded text-[11px] font-medium"
            style={{ background: p.bg, color: p.color }}
          >
            <i className="ti ti-point-filled" />
            {task.priority}
          </span>
        </div>
        <div className="dropdown">
          <Link href="#" data-bs-toggle="dropdown" className="inline-flex items-center text-[#646B72]">
            <i className="ti ti-dots-vertical" />
          </Link>
          <ul className="dropdown-menu dropdown-menu-end p-2">
            <li>
              <Link href="#" className="dropdown-item rounded-1"><i className="ti ti-edit me-2" />Edit</Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1" data-bs-toggle="modal" data-inert={true} data-bs-target="#delete_modal">
                <i className="ti ti-trash me-2" />Delete
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-[#FFFAEA] inline-flex items-center justify-center shrink-0">
          <img src="assets/img/icons/kanban-arrow.svg" className="w-3 h-3" alt="" />
        </span>
        <h6 className="m-0 text-[14px] font-semibold text-[#212B36] flex items-center gap-2">
          Project Title
          <span className="text-[12px] font-normal text-[#9aa0a6]">PRJ-154</span>
        </h6>
      </div>

      <div className="flex items-center gap-4 border-b border-[#f1f1f1] pb-3 mb-3">
        <div className="border-r border-[#f1f1f1] pr-4">
          <span className="block text-[12px] font-medium text-[#646B72] mb-1">Budget</span>
          <p className="m-0 text-[12px] text-[#212B36]">$24,000</p>
        </div>
        <div className="border-r border-[#f1f1f1] pr-4">
          <span className="block text-[12px] font-medium text-[#646B72] mb-1">Tasks</span>
          <p className="m-0 text-[12px] text-[#212B36]">12/15</p>
        </div>
        <div>
          <span className="block text-[12px] font-medium text-[#646B72] mb-1">Due on</span>
          <p className="m-0 text-[12px] text-[#212B36]">15/04/2024</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {teamAvatars.map((src, i) => (
            <span key={src} className={`w-7 h-7 rounded-full overflow-hidden border-2 border-white ${i > 0 ? "-ml-2" : ""}`}>
              <img src={src} className="w-full h-full object-cover" alt="img" />
            </span>
          ))}
          <Link href="#" className="w-7 h-7 -ml-2 rounded-full border-2 border-white bg-[#0ac79e] text-white text-[11px] inline-flex items-center justify-center">
            1+
          </Link>
        </div>
        <div className="flex items-center gap-3 text-[#646B72] text-[13px]">
          <Link href="#" className="flex items-center gap-1 hover:text-[#0ac79e]"><i className="ti ti-message-circle" />14</Link>
          <Link href="#" className="flex items-center gap-1 hover:text-[#0ac79e]"><i className="ti ti-paperclip" />14</Link>
        </div>
      </div>
    </div>
  );
}
