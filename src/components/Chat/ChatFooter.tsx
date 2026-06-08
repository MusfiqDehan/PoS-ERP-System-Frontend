"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

type ChatFooterProps = {
  showEmoji: boolean;
  setShowEmoji: (value: boolean) => void;
  showEmoji2: boolean;
  setShowEmoji2: (value: boolean) => void;
};

export default function ChatFooter({
  showEmoji,
  setShowEmoji,
  showEmoji2,
  setShowEmoji2,
}: ChatFooterProps) {
  return (
            <div className="chat-footer">
              <form className="footer-form">
                <div className="chat-footer-wrap">
                  <div className="form-item">
                    <Link href="#" className="action-circle">
                      <i className="ti ti-microphone" />
                    </Link>
                  </div>
                  <div className="form-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type Your Message"
                    />
                  </div>
                  <div className="form-item emoj-action-foot">
                    <Link href="#"
                      className="action-circle"
                      onClick={() => setShowEmoji2(!showEmoji2)}
                    >
                      <i className="ti ti-mood-smile" />
                    </Link>
                    <div className="emoj-group-list-foot down-emoji-circle" style={{ display: showEmoji2 ? "block" : "none" }}>
                      <ul>
                        <li>
                          <Link href="#">
                            <img
                              src="assets/img/icons/emonji-02.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <img
                              src="assets/img/icons/emonji-05.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <img
                              src="assets/img/icons/emonji-06.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <img
                              src="assets/img/icons/emonji-07.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <img
                              src="assets/img/icons/emonji-08.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li className="add-emoj">
                          <Link href="#">
                            <i className="ti ti-plus" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-item position-relative d-flex align-items-center justify-content-center ">
                    <Link
                      href="#"
                      className="action-circle file-action position-absolute"
                      onClick={() => setShowEmoji(!showEmoji)}
                    >
                      <i className="ti ti-folder" />
                    </Link>
                    <input
                      type="file"
                      className="open-file position-relative"
                      name="files"
                      id="files"
                    />
                  </div>
                  <div className="form-item">
                    <Link href="#" data-bs-toggle="dropdown">
                      <i className="ti ti-dots-vertical" />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-end p-3">
                      <Link href="#" className="dropdown-item">
                        <i className="ti ti-camera-selfie me-2" />
                        Camera
                      </Link>
                      <Link href="#" className="dropdown-item">
                        <i className="ti ti-photo-up me-2" />
                        Gallery
                      </Link>
                      <Link href="#" className="dropdown-item">
                        <i className="ti ti-music me-2" />
                        Audio
                      </Link>
                      <Link href="#" className="dropdown-item">
                        <i className="ti ti-map-pin-share me-2" />
                        Location
                      </Link>
                      <Link href="#" className="dropdown-item">
                        <i className="ti ti-user-check me-2" />
                        Contact
                      </Link>
                    </div>
                  </div>
                  <div className="form-btn">
                    <button className="btn btn-primary" type="submit">
                      <i className="ti ti-send" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
  );
}
