"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import { useState } from "react";
import {
  recentTransactionColumnLabels,
  recentTransactionsByTab,
  recentTransactionStatusStyles,
  recentTransactionTabs,
  type TransactionTabId,
} from "./recentTransactionsData";

export default function RecentTransactions() {
  const [activeTab, setActiveTab] = useState<TransactionTabId>("sale");
  const transactions = recentTransactionsByTab[activeTab];
  const partyColumnLabel = recentTransactionColumnLabels[activeTab].party;

  return (
    <div className="col-xl-6 col-sm-12 col-12 d-flex">
      <div className="recent-transactions flex-fill">
        <div className="recent-transactions__top">
          <div className="recent-transactions__header">
            <p className="recent-transactions__title">Recent Transactions</p>
            <Link
              href={all_routes.onlineorder}
              className="recent-transactions__view-all"
            >
              View All
            </Link>
          </div>

          <div
            className="recent-transactions__tabs"
            role="tablist"
            aria-label="Transaction type"
          >
            {recentTransactionTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`recent-transactions__tab${
                  activeTab === tab.id ? " recent-transactions__tab--active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="recent-transactions__table">
          <div className="recent-transactions__thead">
            <span className="recent-transactions__th recent-transactions__th--date">
              Date
            </span>
            <span className="recent-transactions__th recent-transactions__th--party">
              {partyColumnLabel}
            </span>
            <span className="recent-transactions__th recent-transactions__th--status">
              Status
            </span>
            <span className="recent-transactions__th recent-transactions__th--total">
              Total
            </span>
          </div>

          <ul className="recent-transactions__rows">
            {transactions.map((transaction, index) => {
              const statusStyle =
                recentTransactionStatusStyles[transaction.status];

              return (
                <li
                  key={transaction.id}
                  className={`recent-transactions__row${
                    index < transactions.length - 1
                      ? " recent-transactions__row--divider"
                      : ""
                  }`}
                >
                  <span className="recent-transactions__cell recent-transactions__cell--date">
                    {transaction.date}
                  </span>
                  <div className="recent-transactions__cell recent-transactions__cell--party">
                    {transaction.imageSrc ? (
                      <ImageWithBasePath
                        src={transaction.imageSrc}
                        alt=""
                        width={36}
                        height={36}
                        className="recent-transactions__avatar"
                      />
                    ) : (
                      <span
                        className="recent-transactions__avatar recent-transactions__avatar--placeholder"
                        aria-hidden="true"
                      />
                    )}
                    <div className="recent-transactions__party-info">
                      <p className="recent-transactions__party-name">
                        {transaction.name}
                      </p>
                      <p className="recent-transactions__party-id">
                        {transaction.referenceId}
                      </p>
                    </div>
                  </div>
                  <div className="recent-transactions__cell recent-transactions__cell--status">
                    <span
                      className="recent-transactions__status"
                      style={{
                        backgroundColor: statusStyle.background,
                        color: statusStyle.color,
                      }}
                    >
                      {transaction.statusLabel}
                    </span>
                  </div>
                  <span className="recent-transactions__cell recent-transactions__cell--total">
                    {transaction.total}
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
