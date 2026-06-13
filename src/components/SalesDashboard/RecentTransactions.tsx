"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import {
  salesRecentTransactionsData,
  salesTransactionStatusStyles,
} from "./salesRecentTransactionsData";

export default function RecentTransactions() {
  return (
    <div className="col-sm-12 col-md-12 col-xl-8 d-flex">
      <div className="sales-recent-transactions flex-fill">
        <div className="sales-recent-transactions__header">
          <h2 className="sales-recent-transactions__title">
            Recent Transactions
          </h2>
          <Link
            href={all_routes.purchasetransaction}
            className="sales-recent-transactions__view-all"
          >
            View All
          </Link>
        </div>

        <div className="sales-recent-transactions__table-wrap">
          <div className="sales-recent-transactions__thead">
            <span className="sales-recent-transactions__th sales-recent-transactions__th--sn">
              SN
            </span>
            <span className="sales-recent-transactions__th sales-recent-transactions__th--order">
              Order Details
            </span>
            <span className="sales-recent-transactions__th sales-recent-transactions__th--payment">
              Payment
            </span>
            <span className="sales-recent-transactions__th sales-recent-transactions__th--status">
              Status
            </span>
            <span className="sales-recent-transactions__th sales-recent-transactions__th--amount">
              Amount
            </span>
          </div>

          <ul className="sales-recent-transactions__rows">
            {salesRecentTransactionsData.map((transaction, index) => {
              const statusStyle =
                salesTransactionStatusStyles[transaction.status];

              return (
                <li
                  key={transaction.id}
                  className={`sales-recent-transactions__row${
                    index < salesRecentTransactionsData.length - 1
                      ? " sales-recent-transactions__row--divider"
                      : ""
                  }`}
                >
                  <span className="sales-recent-transactions__cell sales-recent-transactions__cell--sn">
                    {transaction.sn}
                  </span>

                  <div className="sales-recent-transactions__cell sales-recent-transactions__cell--order">
                    <ImageWithBasePath
                      src={transaction.imageSrc}
                      alt=""
                      width={38}
                      height={38}
                      className="sales-recent-transactions__thumb"
                    />
                    <div className="sales-recent-transactions__order-info">
                      <p className="sales-recent-transactions__product-name">
                        {transaction.productName}
                      </p>
                      <p className="sales-recent-transactions__time">
                        {transaction.timeLabel}
                      </p>
                    </div>
                  </div>

                  <div className="sales-recent-transactions__cell sales-recent-transactions__cell--payment">
                    <p className="sales-recent-transactions__payment-method">
                      {transaction.paymentMethod}
                    </p>
                    <p className="sales-recent-transactions__payment-ref">
                      {transaction.paymentRef}
                    </p>
                  </div>

                  <div className="sales-recent-transactions__cell sales-recent-transactions__cell--status">
                    <span
                      className="sales-recent-transactions__status"
                      style={{
                        backgroundColor: statusStyle.background,
                        color: statusStyle.color,
                      }}
                    >
                      {transaction.statusLabel}
                    </span>
                  </div>

                  <span className="sales-recent-transactions__cell sales-recent-transactions__cell--amount">
                    {transaction.amount}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
