"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

type ChatHeaderProps = {
  onClose: () => void;
};

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
              <div className="chat-header">
                <div className="user-details">
                  <div className="d-xl-none">
                    <Link className="text-muted chat-close me-2" href="#" onClick={onClose}>
                      <i className="fas fa-arrow-left" />
                    </Link>
                  </div>
                  <div className="avatar avatar-lg online flex-shrink-0">
                    <img
                      src="assets/img/avatar/avatar-14.jpg"
                      className="rounded-circle"
                      alt="image"
                    />
                  </div>
                  <div className="ms-2 overflow-hidden">
                    <h6>Anthony Lewis</h6>
                    <span className="last-seen">Online</span>
                  </div>
                </div>
                <div className="chat-options">
                  <ul>
                    <li>
                      <Link
                        href="#"
                        className="btn chat-search-btn"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Search"
                      >
                        <i className="ti ti-search" />
                      </Link>
                    </li>
                    <li>
                      <Link className="btn no-bg" href="#" data-bs-toggle="dropdown">
                        <i className="ti ti-dots-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end p-3">
                        <li>
                          <Link href="#" className="dropdown-item">
                            <i className="ti ti-volume-off me-2" />
                            Mute Notification
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            <i className="ti ti-clock-hour-4 me-2" />
                            Disappearing Message
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            <i className="ti ti-clear-all me-2" />
                            Clear Message
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            <i className="ti ti-trash me-2" />
                            Delete Chat
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            <i className="ti ti-ban me-2" />
                            Block
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                {/* Chat Search */}
                <div className="chat-search search-wrap contact-search">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Contacts"
                      />
                      <span className="input-group-text">
                        <i className="ti ti-search" />
                      </span>
                    </div>
                  </form>
                </div>
                {/* /Chat Search */}
              </div>
  );
}
