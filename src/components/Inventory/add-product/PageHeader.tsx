"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import { all_routes } from "@/data/all_routes";
import { ArrowLeft } from "react-feather";
import Link from "next/link";

export default function PageHeader() {
  const route = all_routes;

  return (
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Create Product</h4>
                <h6>Create new product</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <div className="page-btn">
                  <Link href={route.productlist} className="btn btn-secondary">
                    <ArrowLeft className="me-2" />
                    Back to Product
                  </Link>
                </div>
              </li>
            </ul>
          </div>
  );
}
