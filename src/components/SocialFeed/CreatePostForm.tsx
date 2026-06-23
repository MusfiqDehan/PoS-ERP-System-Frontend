"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function CreatePostForm() {
  return (
                  <div className="card">
                    <div className="card-body">
                      <form >
                        <div className="mb-3">
                          <label className="form-label fs-16">Create Post</label>
                          <div className="position-relative">
                            <textarea
                              className="form-control post-textarea"
                              rows={3}
                              placeholder="What's on your mind?"
                              defaultValue={""}
                            />
                            <span className="avatar avatar-lg avatar-rounded text-area-avatar">
                              <img src="assets/img/users/user-11.jpg" alt="Sortorium" />
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                          <div className="d-flex align-items-center">
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-photo fs-16" />
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-link fs-16" />
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-paperclip fs-16" />
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-video fs-16" />
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-hash fs-16" />
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-map-pin-heart fs-16" />
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-mood-smile fs-16" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-refresh fs-16" />
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-trash fs-16" />
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-icon btn-sm rounded-circle"
                            >
                              <i className="ti ti-world fs-16" />
                            </Link>
                            <button
                              type="button"
                              className="btn btn-primary d-inline-flex align-items-center ms-2"
                            >
                              <i className="ti ti-circle-plus fs-16 me-2" />
                              Share Post
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
  );
}
