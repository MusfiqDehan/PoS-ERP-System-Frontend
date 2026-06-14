"use client";

import Link from "next/link";

export default function TodoFooter() {
  return (
          <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
            <p className="mb-0">2014 - 2025 © SmartHR.</p>
            <p>
              Designed &amp; Developed By{" "}
              <Link href="#" className="text-primary">
                Sortonium
              </Link>
            </p>
          </div>
  );
}
