"use client";
/* eslint-disable @next/next/no-img-element */
import { ChevronUp, RotateCcw } from "react-feather";

export default function SalesCards() {
  return (
<div className="row sales-cards">
          <div className="col-xl-6 col-sm-12 col-12 d-flex">
            <div className="card d-flex align-items-center justify-content-between flex-fill mb-4">
              <div>
                <h6>Weekly Earning</h6>
                <h3>
                  $
                  <span className="counters" data-count="95000.45">
                    95000.45
                  </span>
                </h3>
                <p className="sales-range">
                  <span className="text-success">
                    <ChevronUp className="feather-16" />
                    48%&nbsp;
                  </span>
                  increase compare to last week
                </p>
              </div>
              <img src="assets/img/icons/weekly-earning.svg" alt="img" />
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card color-info bg-primary flex-fill mb-4">
              <div className="mb-2">
                <img src="assets/img/icons/total-sales.svg" alt="img" />
              </div>
              <h3 className="counters" data-count={10000.0}>
                10,000+
              </h3>
              <p>No of Total Sales</p>
              <RotateCcw className="feather feather-rotate-ccw feather-16" />
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card color-info bg-secondary flex-fill mb-4">
              <div className="mb-2">
                <img src="assets/img/icons/purchased-earnings.svg" alt="img" />
              </div>
              <h3 className="counters" data-count={800.0}>
                800+
              </h3>
              <p>No of Total Sales</p>
              <RotateCcw className="feather feather-rotate-ccw feather-16" />
            </div>
          </div>
        </div>
  );
}
