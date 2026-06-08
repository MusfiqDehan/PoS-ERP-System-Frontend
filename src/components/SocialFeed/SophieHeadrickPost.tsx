"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

type SophieHeadrickPostProps = { toggle2: boolean; setToggle2: (value: boolean) => void; };

export default function SophieHeadrickPost(props: SophieHeadrickPostProps) {
  const { toggle2, setToggle2 } = props;
  return (
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-3">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg avatar-rounded flex-shrink-0 me-2">
                            <img src="assets/img/users/user-04.jpg" alt="Img" />
                          </span>
                          <div>
                            <h5 className="mb-1">
                              <Link href="#">
                                Sophie Headrick{" "}
                                <i className="ti ti-circle-check-filled text-success" />
                              </Link>
                            </h5>
                            <p className="d-flex align-items-center">
                              <span className="text-info">@sophie241</span>
                              <i className="ti ti-circle-filled fs-5 mx-2" />
                              United Kingdom
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0 text-dark">About 1 hr ago</p>
                          <div className="dropdown ms-3 me-1">
                            <button
                              className="btn btn-icon dropdown-toggle bg-transparent d-flex align-items-center text-dark border-0 p-0 btn-sm"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-world pe-1" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <Link
                                  className="dropdown-item"
                                  href="#"
                                >
                                  Private
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item"
                                  href="#"
                                >
                                  Public
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="dropdown">
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center show"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical" />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                              <li>
                                <Link
                                  href="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-edit me-2" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-eye me-2" />
                                  Hide Post
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-report me-2" />
                                  Report
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-trash-x me-2" />
                                  Delete
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <p className="text-dark fw-medium">
                          Excited to announce the launch of our new product! Get yours
                          now and enjoy a special discount.
                          <Link
                            href="#"
                            className="text-info link-hover"
                          >
                            #NewRelease{" "}
                          </Link>
                          <Link
                            href="#"
                            className="text-info link-hover"
                          >
                            {" "}
                            #Innovation
                          </Link>
                          🎉
                        </p>
                      </div>
                      <div className="mb-2">
                        <img
                          src="assets/img/social/social-feed-03.jpg"
                          className="rounded"
                          alt="Img"
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
                        <div className="d-flex align-items-center flex-wrap row-gap-3">
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-heart me-2" />
                            340K Likes
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-message-dots me-2" />
                            45 Comments
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            28 Share
                          </Link>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            className="btn btn-icon btn-sm rounded-circle"
                          >
                            <i className="ti ti-heart-filled text-danger" />
                          </Link>
                          <Link
                            href="#"
                            className="btn btn-icon btn-sm rounded-circle"
                          >
                            <i className="ti ti-share" />
                          </Link>
                          <Link
                            href="#"
                            className="btn btn-icon btn-sm rounded-circle"
                          >
                            <i className="ti ti-message-star" />
                          </Link>
                          <Link
                            href="#"
                            className="btn btn-icon btn-sm rounded-circle"
                          >
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3">
                        <Link
                          href="#"
                          className="avatar avatar-rounded flex-shrink-0 me-2"
                        >
                          <img src="assets/img/profiles/avatar-02.jpg" alt="Img" />
                        </Link>
                        <div className="bg-light rounded flex-fill p-2">
                          <div className="d-flex align-items-center mb-1">
                            <h5>
                              <Link href="#">Frank Hoffman</Link>
                            </h5>
                            <span className="ms-2">12:45 PM</span>
                          </div>
                          <p className="mb-1">
                            Congratulations on the launch! I've been eagerly waiting
                            for this product, and the special discount makes it even
                            more exciting.
                          </p>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            Reply
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 ms-4 ps-2">
                        <Link
                          href="#"
                          className="avatar avatar-rounded flex-shrink-0 me-2"
                        >
                          <img src="assets/img/profiles/avatar-01.jpg" alt="Img" />
                        </Link>
                        <div className="bg-light rounded flex-fill p-2">
                          <div className="d-flex align-items-center mb-1">
                            <h5>
                              <Link href="#">Sophie Headrick</Link>
                            </h5>
                            <span className="ms-2">12:45 PM</span>
                          </div>
                          <p className="mb-1">
                            Thank you so much for your enthusiasm and support!
                          </p>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            Reply
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3">
                        <Link
                          href="#"
                          className="avatar avatar-rounded flex-shrink-0 me-2"
                        >
                          <img src="assets/img/profiles/avatar-04.jpg" alt="Img" />
                        </Link>
                        <div className="bg-light rounded flex-fill p-2">
                          <div className="d-flex align-items-center mb-1">
                            <h5>
                              <Link href="#">Samuel Butler</Link>
                            </h5>
                            <span className="ms-2">12:40 PM</span>
                          </div>
                          <p className="mb-1">
                            So thrilled to see this product finally launched! I've
                            heard amazing things about it and am excited to see how it
                            lives up to the hype.
                          </p>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            Reply
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className={`more-menu ${toggle2 ? 'd-block':'d-none'}`} >
                          <div className="d-flex align-items-start mb-3">
                            <Link
                              href="#"
                              className="avatar avatar-rounded flex-shrink-0 me-2"
                            >
                              <img
                                src="assets/img/profiles/avatar-05.jpg"
                                alt="Img"
                              />
                            </Link>
                            <div className="bg-light rounded flex-fill p-2">
                              <div className="d-flex align-items-center mb-1">
                                <h5>
                                  <Link href="#">Samuel Butler</Link>
                                </h5>
                                <span className="ms-2">12:40 PM</span>
                              </div>
                              <p className="mb-1">
                                So thrilled to see this product finally launched! I've
                                heard amazing things about it and am excited to see
                                how it lives up to the hype.
                              </p>
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                              >
                                <i className="ti ti-share-3 me-2" />
                                Reply
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex align-items-start mb-3">
                            <Link
                              href="#"
                              className="avatar avatar-rounded flex-shrink-0 me-2"
                            >
                              <img
                                src="assets/img/profiles/avatar-06.jpg"
                                alt="Img"
                              />
                            </Link>
                            <div className="bg-light rounded flex-fill p-2">
                              <div className="d-flex align-items-center mb-1">
                                <h5>
                                  <Link href="#">Samuel Butler</Link>
                                </h5>
                                <span className="ms-2">12:40 PM</span>
                              </div>
                              <p className="mb-1">
                                So thrilled to see this product finally launched! I've
                                heard amazing things about it and am excited to see
                                how it lives up to the hype.
                              </p>
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                              >
                                <i className="ti ti-share-3 me-2" />
                                Reply
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="view-all text-center mb-3">
                          <Link
                            href="#"
                            className="viewall-button text-primary fw-medium"
                            onClick={()=>setToggle2(!toggle2)}
                          >
                            <span>View {toggle2 ? 'Less':'All 200'}  Comments</span>
                            <i className="fa fa-chevron-down fs-10 ms-2" />
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <span className="avatar avatar-rounded me-2 flex-shrink-0">
                          <img src="assets/img/users/user-11.jpg" alt="Img" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Comments"
                        />
                      </div>
                    </div>
                  </div>
  );
}
