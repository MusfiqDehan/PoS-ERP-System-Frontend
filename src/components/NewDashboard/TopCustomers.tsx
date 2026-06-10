"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import {
  topCustomersAssets,
  topCustomersData,
  topCustomersFilterOptions,
} from "./topCustomersData";

export default function TopCustomers() {
  const [activeFilter, setActiveFilter] = useState(topCustomersFilterOptions[0]);

  return (
    <div className="col-xxl-4 col-md-6 d-flex">
      <div className="top-customers flex-fill">
        <div className="top-customers__header">
          <p className="top-customers__title">Top Customers</p>
          <div className="dropdown top-customers__filter-dropdown">
            <button
              type="button"
              className="top-customers__filter dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="top-customers__filter-content">
                <ImageWithBasePath
                  src={topCustomersAssets.calendar}
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{activeFilter}</span>
              </span>
              <ImageWithBasePath
                src={topCustomersAssets.chevronDown}
                alt=""
                width={16}
                height={16}
                className="top-customers__filter-chevron"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {topCustomersFilterOptions.map((option) => (
                <li key={option}>
                  <Link
                    href="#"
                    className="dropdown-item"
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveFilter(option);
                    }}
                  >
                    {option}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="top-customers__body">
          <ul className="top-customers__list">
            {topCustomersData.map((customer, index) => (
              <li
                key={customer.id}
                className={`top-customers__item${
                  index < topCustomersData.length - 1
                    ? " top-customers__item--divider"
                    : ""
                }`}
              >
                <div className="top-customers__customer">
                  <ImageWithBasePath
                    src={customer.imageSrc}
                    alt=""
                    width={48}
                    height={48}
                    className="top-customers__thumb"
                  />
                  <div className="top-customers__info">
                    <p className="top-customers__name">{customer.name}</p>
                    <div className="top-customers__meta">
                      <span className="top-customers__location">
                        <ImageWithBasePath
                          src={topCustomersAssets.location}
                          alt=""
                          width={12}
                          height={12}
                          className="top-customers__location-icon"
                        />
                        {customer.country}
                      </span>
                      <span className="top-customers__orders">
                        {customer.orders}
                      </span>
                    </div>
                  </div>
                  <span className="top-customers__total">{customer.total}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
