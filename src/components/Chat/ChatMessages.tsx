"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export default function ChatMessages() {
  return (
              <div className="chat-body chat-page-group slimscroll">
                <PerfectScrollbar>
                  <div className="messages">
                    <div className="chats chats-right">
                      <div className="chat-content">
                        <div className="chat-info">
                          <div className="message-content">
                            Hi, this is Mark from Freshmart. I’m reaching out to confirm this
                            week’s delivery schedule.
                            <div className="emoj-group">
                              <ul>
                                <li className="emoj-action">
                                  <Link href="#">
                                    <i className="ti ti-mood-smile" />
                                  </Link>
                                  <div className="emoj-group-list">
                                    <ul>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-02.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-05.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-06.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-07.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-08.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-03.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-10.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-09.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li className="add-emoj">
                                        <Link href="#">
                                          <i className="ti ti-plus" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="ti ti-arrow-forward-up" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name text-end">
                          <h6>
                            You
                            <i className="ti ti-circle-filled fs-7 mx-2" />
                            <span className="chat-time">08:00 AM</span>
                            <span className="msg-read success">
                              <i className="ti ti-checks" />
                            </span>
                          </h6>
                        </div>
                      </div>
                      <div className="chat-avatar">
                        <img
                          src="assets/img/users/user-49.png"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="chats">
                      <div className="chat-avatar">
                        <img
                          src="assets/img/avatar/avatar-14.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content">
                        <div className="chat-info">
                          <div className="message-content">
                            Hi Mark, good to hear from you! Your delivery is scheduled for Friday
                            at 10:00 AM. Is that time still convenient for you?{" "}
                            <div className="emoj-group">
                              <ul>
                                <li className="emoj-action">
                                  <Link href="#">
                                    <i className="ti ti-mood-smile" />
                                  </Link>
                                  <div className="emoj-group-list">
                                    <ul>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-02.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-05.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-06.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-07.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-08.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-03.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-10.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-09.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li className="add-emoj">
                                        <Link href="#">
                                          <i className="ti ti-plus" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="ti ti-arrow-forward-up" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name">
                          <h6>
                            Anthony Lewis
                            <i className="ti ti-circle-filled fs-7 mx-2" />
                            <span className="chat-time">08:00 AM</span>
                            <i className="ti ti-checks text-success ms-2" />
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="chats chats-right">
                      <div className="chat-content">
                        <div className="chat-info">
                          <div className="message-content">
                            Yes, that works. Could you also confirm the items in this week’s
                            order?
                            <div className="emoj-group">
                              <ul>
                                <li className="emoj-action">
                                  <Link href="#">
                                    <i className="ti ti-mood-smile" />
                                  </Link>
                                  <div className="emoj-group-list">
                                    <ul>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-02.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-05.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-06.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-07.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-08.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-03.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-10.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-09.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li className="add-emoj">
                                        <Link href="#">
                                          <i className="ti ti-plus" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="ti ti-arrow-forward-up" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name text-end">
                          <h6>
                            You
                            <i className="ti ti-circle-filled fs-7 mx-2" />
                            <span className="chat-time">08:00 AM</span>
                            <span className="msg-read success">
                              <i className="ti ti-checks" />
                            </span>
                          </h6>
                        </div>
                      </div>
                      <div className="chat-avatar">
                        <img
                          src="assets/img/users/user-49.png"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="chat-line">
                      <span className="chat-date">Today, July 24</span>
                    </div>
                    <div className="chats">
                      <div className="chat-avatar">
                        <img
                          src="assets/img/avatar/avatar-14.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content">
                        <div className="chat-info">
                          <div className="message-content">
                            Of course! Here’s the list:
                            <ul>
                              <li>
                                <i className="ti ti-point-filled" /> 20 cases of bottled water
                                (500ml)
                              </li>
                              <li>
                                <i className="ti ti-point-filled" />
                                15 cartons of eggs (12 pcs each)
                              </li>
                            </ul>
                            Does everything look correct?
                            <div className="emoj-group">
                              <ul>
                                <li className="emoj-action">
                                  <Link href="#">
                                    <i className="ti ti-mood-smile" />
                                  </Link>
                                  <div className="emoj-group-list">
                                    <ul>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-02.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-05.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-06.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-07.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-08.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-03.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-10.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-09.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li className="add-emoj">
                                        <Link href="#">
                                          <i className="ti ti-plus" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="ti ti-arrow-forward-up" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name">
                          <h6>
                            Anthony Lewis
                            <i className="ti ti-circle-filled fs-7 mx-2" />
                            <span className="chat-time">08:00 AM</span>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="chats chats-right">
                      <div className="chat-content">
                        <div className="chat-info">
                          <div className="message-content">
                            Almost. Can you increase the bottled water to 30 cases instead of 20?
                            <div className="emoj-group">
                              <ul>
                                <li className="emoj-action">
                                  <Link href="#">
                                    <i className="ti ti-mood-smile" />
                                  </Link>
                                  <div className="emoj-group-list">
                                    <ul>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-02.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-05.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-06.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-07.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-08.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-03.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-10.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-09.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li className="add-emoj">
                                        <Link href="#">
                                          <i className="ti ti-plus" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="ti ti-arrow-forward-up" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name text-end">
                          <h6>
                            You
                            <i className="ti ti-circle-filled fs-7 mx-2" />
                            <span className="chat-time">08:00 AM</span>
                            <span className="msg-read success">
                              <i className="ti ti-checks" />
                            </span>
                          </h6>
                        </div>
                      </div>
                      <div className="chat-avatar">
                        <img
                          src="assets/img/users/user-49.png"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="chats">
                      <div className="chat-avatar">
                        <img
                          src="assets/img/avatar/avatar-14.jpg"
                          className="rounded-circle"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content">
                        <div className="chat-info">
                          <div className="message-content">
                            Got it! I’ll update the order to 30 cases of bottled water. Anything
                            else you’d like to add or adjust?
                            <div className="emoj-group">
                              <ul>
                                <li className="emoj-action">
                                  <Link href="#">
                                    <i className="ti ti-mood-smile" />
                                  </Link>
                                  <div className="emoj-group-list">
                                    <ul>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-02.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-05.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-06.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-07.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-08.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-03.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-10.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-09.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li className="add-emoj">
                                        <Link href="#">
                                          <i className="ti ti-plus" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="ti ti-arrow-forward-up" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name">
                          <h6>
                            Anthony Lewis
                            <i className="ti ti-circle-filled fs-7 mx-2" />
                            <span className="chat-time">08:00 AM</span>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="chats chats-right">
                      <div className="chat-content">
                        <div className="chat-info">
                          <div className="message-content">
                            Yes, that’s correct. Thanks!
                            <div className="emoj-group">
                              <ul>
                                <li className="emoj-action">
                                  <Link href="#">
                                    <i className="ti ti-mood-smile" />
                                  </Link>
                                  <div className="emoj-group-list">
                                    <ul>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-02.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-05.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-06.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-07.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-08.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-03.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-10.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="#">
                                          <img src="assets/img/icons/emonji-09.svg" alt="Icon" />
                                        </Link>
                                      </li>
                                      <li className="add-emoj">
                                        <Link href="#">
                                          <i className="ti ti-plus" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="ti ti-arrow-forward-up" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name text-end">
                          <h6>
                            You
                            <i className="ti ti-circle-filled fs-7 mx-2" />
                            <span className="chat-time">08:00 AM</span>
                            <span className="msg-read success">
                              <i className="ti ti-checks" />
                            </span>
                          </h6>
                        </div>
                      </div>
                      <div className="chat-avatar">
                        <img
                          src="assets/img/users/user-49.png"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>

                </PerfectScrollbar>

              </div>
  );
}
