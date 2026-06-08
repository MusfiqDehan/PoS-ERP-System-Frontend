"use client";
/* eslint-disable @next/next/no-img-element */

export default function UpgradeBanner() {
  return (
              <div className="card bg-black bg-01">
                <div className="card-body text-center">
                  <img
                    src="assets/img/icons/upgrade.svg"
                    alt="img"
                    className="mb-3"
                  />
                  <h6 className="mb-3 text-white">
                    Upgrade to Pro for Unlimited Storage
                  </h6>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-white btn-sm"
                  >
                    Upgrade Now
                    <i className="ti ti-arrow-right ms-1" />
                  </a>
                </div>
              </div>
  );
}
