"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function WelcomeBanner() {
  const routes = all_routes;
  return (
<div className="welcome-wrap mb-4">
          <div className=" d-flex align-items-center justify-content-between flex-wrap">
            <div className="mb-3">
              <h2 className="mb-1 text-white">Welcome Back, Adrian</h2>
              <p className="text-light">
                14 New Companies Subscribed Today !!!
              </p>
            </div>
            <div className="d-flex align-items-center flex-wrap mb-1">
              <Link
                href={routes.superAdminCompanies}
                className="btn btn-dark btn-md me-2 mb-2"
              >
                Companies
              </Link>
              <Link
                href={routes.superAdminPackages}
                className="btn btn-light btn-md mb-2"
              >
                All Packages
              </Link>
            </div>
          </div>
          <div className="welcome-bg">
            <img
              src="assets/img/bg/welcome-bg-02.svg"
              alt="img"
              className="welcome-bg-01"
            />
            <img
              src="assets/img/bg/welcome-bg-03.svg"
              alt="img"
              className="welcome-bg-02"
            />
            <img
              src="assets/img/bg/welcome-bg-01.svg"
              alt="img"
              className="welcome-bg-03"
            />
          </div>
        </div>
  );
}
