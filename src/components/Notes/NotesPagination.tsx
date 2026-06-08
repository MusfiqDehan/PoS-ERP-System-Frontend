"use client";

import Link from "next/link";

export default function NotesPagination() {
  return (
    <div className="row custom-pagination">
      <div className="col-md-12">
        <div className="paginations d-flex justify-content-end">
          <span>
            <i className="fas fa-chevron-left" />
          </span>
          <ul className="d-flex align-items-center page-wrap">
            <li>
              <Link href="#" className="active">
                1
              </Link>
            </li>
            <li>
              <Link href="#">2</Link>
            </li>
            <li>
              <Link href="#">3</Link>
            </li>
            <li>
              <Link href="#">4</Link>
            </li>
          </ul>
          <span>
            <i className="fas fa-chevron-right" />
          </span>
        </div>
      </div>
    </div>
  );
}
