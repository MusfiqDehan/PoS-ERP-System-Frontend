"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function UpgradeBanner() {
  return (
                      <div className="bg-dark rounded text-center position-relative p-4">
                        <span className="avatar avatar-lg rounded-circle bg-white mb-2">
                          <i className="ti ti-alert-triangle text-dark" />
                        </span>
                        <h6 className="text-white mb-3">
                          Enjoy Unlimited Access on a small price monthly.
                        </h6>
                        <Link href="#" className="btn btn-white">
                          Upgrade Now <i className="ti ti-arrow-right" />
                        </Link>
                        <div className="box-bg">
                          <span className="bg-right">
                            <img src="assets/img/bg/email-bg-01.png" alt="Sortonium" />
                          </span>
                          <span className="bg-left">
                            <img src="assets/img/bg/email-bg-02.png" alt="Sortonium" />
                          </span>
                        </div>
                      </div>
  );
}
