"use client";

import Link from "next/link";

export default function PageHeader() {
  return (
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Search List</h4>
                            <h6>Manage your search</h6>
                        </div>
                    </div>
                    <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start">
                        <ul className="table-top-head">
                            <li>
                                <Link href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh">
                                    <i data-feather="rotate-ccw" className="feather-rotate-ccw" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                href="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Collapse"
                                    id="collapse-header"
                                >
                                    <i data-feather="chevron-up" className="feather-chevron-up" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
  );
}
