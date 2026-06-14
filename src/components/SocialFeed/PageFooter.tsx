"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function PageFooter() {
  return (
          <div className="footer d-sm-flex align-items-center justify-content-between bg-white border-top p-3">
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
