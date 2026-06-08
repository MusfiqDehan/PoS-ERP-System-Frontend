"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import { all_routes } from "@/data/all_routes";
import { Grid, List } from "react-feather";
import Link from "next/link";

export default function PageHeader() {
  const route = all_routes;

  return (
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Todo</h4>
                  <h6>Manage Your Todo</h6>
                </div>
              </div>
              <ul className="table-top-head">
                <li>
                  <Link href={route.todo} className="todo-grid-view active">
                    <Grid className="feather-rotate-ccw" />
                  </Link>
                </li>
                <li>
                  <Link href={route.todolist} className="todo-list-view">
                    <List className="feather-rotate-ccw" />
                  </Link>
                </li>
                <RefreshIcon />
                <CollapesIcon />
              </ul>
              <div className="page-btn">
                <Link
                  href="#"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#note-units"
                >
                  <i className="ti ti-circle-plus me-1"></i>
                  Create New
                </Link>
              </div>
            </div>
  );
}
