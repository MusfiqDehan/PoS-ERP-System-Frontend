"use client";
/* eslint-disable @next/next/no-img-element */

import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

type ChatSidebarProps = {
  onSelectChat: () => void;
};

export default function ChatSidebar({ onSelectChat }: ChatSidebarProps) {
  const routes = all_routes;

  return (
          <div className="sidebar-group">
            <div id="chats" className="sidebar-content active slimscroll">
              <PerfectScrollbar>
                <div className="chat-search-header">
                  <div className="header-title d-flex align-items-center justify-content-between">
                    <h4 className="mb-3">Chats</h4>
                  </div>
                  {/* Chat Search */}
                  <div className="search-wrap">
                    <form >
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search For Contacts or Messages"
                        />
                        <span className="input-group-text">
                          <i className="ti ti-search" />
                        </span>
                      </div>
                    </form>
                  </div>
                  {/* /Chat Search */}
                </div>
                <div className="sidebar-body chat-body" id="chatsidebar">
                  {/* Left Chat Title */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="chat-title">All Chats</h5>
                  </div>
                  {/* /Left Chat Title */}
                  <div className="chat-users-wrap">
                    <div className="chat-list" onClick={onSelectChat}>
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/avatar/avatar-14.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Anthony Lewis</h6>
                            <p>
                              <span className="animate-typing">
                                is typing
                                <span className="dot" />
                                <span className="dot" />
                                <span className="dot" />
                              </span>
                            </p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">02:40 PM</span>
                            <div className="chat-pin">
                              <i className="ti ti-pin me-2" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-list" onClick={onSelectChat}>
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/avatar/avatar-19.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Elliot Murray</h6>
                            <p>
                              <i className="ti ti-file me-1" />
                              Document
                            </p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">06:12 AM</span>
                            <div className="chat-pin">
                              <i className="ti ti-checks text-success" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-list" onClick={onSelectChat}>
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/avatar/avatar-20.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Stephan Peralt</h6>
                            <p className="text-danger">
                              <i className="ti ti-video-off me-2" />
                              Missed Video Call
                            </p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">03:15 AM</span>
                            <div className="chat-pin">
                              <i className="ti ti-pin" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-list" onClick={onSelectChat}>
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/users/user-01.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Rebecca Smtih</h6>
                            <p>Hi How are you 🔥</p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">Sunday</span>
                            <div className="chat-pin">
                              <span className="count-message fs-12 fw-semibold">
                                25
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-list" onClick={onSelectChat}>
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/users/user-01.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Harvey Smith</h6>
                            <p>Haha oh man 🔥</p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">03:15 AM</span>
                            <div className="chat-pin">
                              <i className="ti ti-pin me-2" />
                              <span className="count-message fs-12 fw-semibold">
                                12
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-list" onClick={onSelectChat}>
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/avatar/avatar-21.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Lori Broaddus</h6>
                            <p>Do you know which...</p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">02:40 PM</span>
                            <div className="chat-pin">
                              <i className="ti ti-heart-filled text-warning" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-list" onClick={onSelectChat}    >
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/users/user-09.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Brian Villalobos</h6>
                            <p>Do you know which...</p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">06:12 AM</span>
                            <div className="chat-pin">
                              <i className="ti ti-pin me-2" />
                              <i className="ti ti-checks text-success" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-list" onClick={onSelectChat}>
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/avatar/avatar-22.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Linda Ray</h6>
                            <p>
                              <i className="ti ti-photo me-2" />
                              Photo
                            </p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">Wednesday</span>
                            <div className="chat-pin">
                              <span className="count-message fs-12 fw-semibold">
                                12
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-list" onClick={onSelectChat}>
                      <Link href={routes.chat} className="chat-user-list">
                        <div className="avatar avatar-lg online me-2">
                          <img
                            src="assets/img/avatar/avatar-23.jpg"
                            className="rounded-circle"
                            alt="image"
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                            <h6>Doglas Martini</h6>
                            <p className="text-success">
                              <i className="ti ti-video-plus text-success me-2" />
                              Incoming Video Call
                            </p>
                          </div>
                          <div className="chat-user-time">
                            <span className="time">02:40 PM</span>
                            <div className="chat-pin">
                              <i className="ti ti-heart-filled text-warning" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="chat-dropdown">
                        <Link className="#" href="#" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-box-align-right me-2" />
                              Archive Chat
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-heart me-2" />
                              Mark as Favourite
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-check me-2" />
                              Mark as Unread
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-pinned me-2" />
                              Pin Chats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              <i className="ti ti-trash me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </PerfectScrollbar>
            </div>
          </div>
  );
}
