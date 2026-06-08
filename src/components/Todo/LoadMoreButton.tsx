"use client";

import Link from "next/link";

export default function LoadMoreButton() {
  return (
                <div className="text-center">
                  <Link href="#" className="btn btn-primary">
                    <i className="ti ti-loader me-2" />
                    Load More
                  </Link>
                </div>
  );
}
