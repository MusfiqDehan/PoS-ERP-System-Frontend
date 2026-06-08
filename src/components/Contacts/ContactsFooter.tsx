"use client";

import Link from "next/link";

export default function ContactsFooter() {
  return (
            <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
                <p className="mb-0 text-gray-9">
                    2014 - 2025 © DreamsPOS. All Right Reserved
                </p>
                <p>
                    Designed &amp; Developed by{" "}
                    <Link href="#" className="text-primary">
                        Dreams
                    </Link>
                </p>
            </div>
  );
}
