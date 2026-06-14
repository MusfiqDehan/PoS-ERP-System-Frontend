import Link from "next/link";
import { copyrightNotice, PRODUCT_NAME } from "@/lib/branding";

export default function CommonFooter() {
  return (
    <div>
      <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
        <p className="mb-0">{copyrightNotice()}</p>
        <p>
          Designed &amp; Developed by{" "}
          <Link href="#" className="text-primary">
            {PRODUCT_NAME}
          </Link>
        </p>
      </div>
    </div>
  );
}
