"use client";
/* eslint-disable @next/next/no-img-element */
import CommonFooter from "@/core/common/footer/commonFooter";
import Link from "next/link";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const messages = [
  { side: "left", text: "Hi Everyone.!", time: "10:00 AM" },
  { side: "right", text: "Good Morning..! Today we have meeting about the new policy.", time: "10:00" },
  { side: "left", text: "Great.! This is the second new product that comes in this week.", time: "10:00 AM" },
  { side: "left", text: "Nice..which category it belongs to?", time: "10:00 AM" },
  { side: "left", text: "Hi.! Good Morning all.", time: "10:00 AM" },
  { side: "right", text: "Good Morning..! Today we have meeting about the new product.", time: "10:00" },
];

const ctrl =
  "w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 transition-colors";

export default function VideoCallComponent() {
  const [chatOpen, setChatOpen] = useState(false);
  const [guestThumb, setGuestThumb] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content mb-3">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
          <div>
            <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Calls</h4>
            <p className="m-0 text-[14px] font-medium text-[#646B72]">Manage your calls</p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-1 px-4 py-[10px] rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
          >
            <i className="ti ti-circle-plus text-[16px]" /> Add People
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Video stage */}
          <div className="relative flex-1 min-w-0 rounded-[12px] overflow-hidden bg-black min-h-[420px] lg:min-h-[560px]">
            <img src="assets/img/video/video.jpg" className="absolute inset-0 w-full h-full object-cover" alt="video" />

            {guestThumb && (
              <div className="absolute top-4 left-4 w-[140px] rounded-lg overflow-hidden border-2 border-white/40 shadow-lg">
                <img src="assets/img/video/user-01.jpg" className="w-full h-[100px] object-cover" alt="participant" />
                <span className="absolute bottom-1 left-1 text-white text-[11px] bg-black/50 px-1.5 py-0.5 rounded">Joanne Conner</span>
              </div>
            )}

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-white text-[13px] bg-black/40 px-2 py-1 rounded backdrop-blur-sm">40:12</span>
              <button onClick={toggleFullscreen} className="w-8 h-8 inline-flex items-center justify-center rounded bg-black/40 text-white backdrop-blur-sm hover:bg-black/55">
                <i className="ti ti-maximize" />
              </button>
            </div>

            <span className="absolute top-[60px] right-4 w-8 h-8 inline-flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
              <i className="bx bx-microphone-off" />
            </span>

            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-2 flex-wrap">
              <button onClick={() => setGuestThumb((s) => !s)} className={ctrl}>
                <i className="ti ti-user-off" />
              </button>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-2">
                <Link href="#" className={ctrl}><i className="ti ti-microphone" /></Link>
                <Link href="#" className={ctrl}><i className="ti ti-video" /></Link>
                <Link href="#" className="w-12 h-10 inline-flex items-center justify-center rounded-full bg-[#dc3545] text-white hover:bg-[#bb2d3b] transition-colors">
                  <i className="ti ti-phone" />
                </Link>
                <Link href="#" className={ctrl}><i className="ti ti-volume" /></Link>
                <Link href="#" className={ctrl}><i className="ti ti-device-imac-share" /></Link>
              </div>
              <button onClick={() => setChatOpen(true)} className={ctrl}>
                <i className="ti ti-dots" />
              </button>
            </div>
          </div>

          {/* Chat panel */}
          {chatOpen && (
            <div className="flex flex-col w-full lg:w-[330px] shrink-0 bg-white border border-[#f1f1f1] rounded-[12px] overflow-hidden max-h-[560px]">
              <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
                <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">Chat</h5>
                <button
                  onClick={() => setChatOpen(false)}
                  className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-[#dc3545] text-white"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <PerfectScrollbar>
                  <div className="flex flex-col gap-4 p-4">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex items-end gap-2 ${m.side === "right" ? "flex-row-reverse" : ""}`}>
                        <img
                          src={`assets/img/users/user-0${m.side === "right" ? "2" : "1"}.jpg`}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                          alt="avatar"
                        />
                        <div className={`max-w-[75%] ${m.side === "right" ? "text-right" : ""}`}>
                          <div
                            className={`inline-block px-3 py-2 rounded-lg text-[13px] ${
                              m.side === "right" ? "bg-[#0ac79e] text-white" : "bg-[#f1f5f6] text-[#212B36]"
                            }`}
                          >
                            {m.text}
                          </div>
                          <div className="text-[11px] text-[#9aa0a6] mt-1">{m.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PerfectScrollbar>
              </div>
              <div className="p-3 border-t border-[#f1f1f1]">
                <form className="flex items-center gap-2">
                  <Link href="#" className="text-[#646B72] hover:text-[#0ac79e]"><i className="ti ti-mood-smile text-[18px]" /></Link>
                  <Link href="#" className="text-[#646B72] hover:text-[#0ac79e]"><i className="ti ti-paperclip text-[18px]" /></Link>
                  <input
                    type="text"
                    placeholder="Enter Message....."
                    className="flex-1 min-w-0 border border-[#e7e7e7] rounded-full px-3 py-2 text-[13px] focus:border-[#0ac79e] focus:outline-none"
                  />
                  <button type="button" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[#0ac79e] text-white shrink-0">
                    <i className="ti ti-send" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <CommonFooter />
    </div>
  );
}
