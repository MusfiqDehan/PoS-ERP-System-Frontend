"use client";
/* eslint-disable @next/next/no-img-element */

import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import { formatCurrency, parseCurrency } from "@/lib/currency";
import { DEFAULT_POS_PRODUCT_IMAGE, resolveProductImageUrl } from "@/lib/media";
import {
  salesRecentTransactionsData,
  salesTransactionStatusStyles,
} from "./salesRecentTransactionsData";

function formatSaleTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusLabel(status: string): string {
  if (status === "completed") return "Completed";
  if (status === "cancelled") return "Cancelled";
  if (status === "pending") return "Pending";
  return status;
}

function statusKey(status: string): keyof typeof salesTransactionStatusStyles {
  if (status === "completed") return "successful";
  if (status === "cancelled") return "cancelled";
  if (status === "pending") return "on-hold";
  return "successful";
}

export default function RecentTransactions() {
  const { sales, loading } = useSalesDashboardData();

  const recentSales = sales?.recent_sales ?? [];
  const transactions = recentSales.length
    ? recentSales.map((sale, index) => ({
        id: sale.id,
        sn: String(index + 1).padStart(2, "0"),
        productName: sale.product_name,
        timeLabel: formatSaleTime(sale.created_at),
        imageSrc: resolveProductImageUrl(
          sale.product_image,
          DEFAULT_POS_PRODUCT_IMAGE,
        ),
        paymentMethod: sale.payment_method
          ? sale.payment_method.charAt(0).toUpperCase() + sale.payment_method.slice(1)
          : "—",
        paymentRef: sale.ref_number,
        status: statusKey(sale.status),
        statusLabel: statusLabel(sale.status),
        amount: formatCurrency(parseCurrency(sale.total)),
      }))
    : loading
      ? []
      : salesRecentTransactionsData;

  return (
    <div className="col-sm-12 col-md-12 col-xl-8 d-flex">
      <div className="sales-recent-transactions flex-fill">
        <div className="sales-recent-transactions__header">
          <h2 className="sales-recent-transactions__title">
            Recent Transactions
          </h2>
          <Link
            href={all_routes.posorder}
            className="sales-recent-transactions__view-all"
          >
            View All
          </Link>
        </div>

        <div className="sales-recent-transactions__table-wrap">
          {transactions.length === 0 ? (
            <p className="px-3 py-4 text-[#646B72]">
              {loading ? "Loading…" : "No completed POS sales yet."}
            </p>
          ) : (
            <>
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
                {transactions.map((transaction, index) => {
                  const statusStyle =
                    salesTransactionStatusStyles[transaction.status] ??
                    salesTransactionStatusStyles.successful;

                  return (
                    <li
                      key={transaction.id}
                      className={`sales-recent-transactions__row${
                        index < transactions.length - 1
                          ? " sales-recent-transactions__row--divider"
                          : ""
                      }`}
                    >
                      <span className="sales-recent-transactions__cell sales-recent-transactions__cell--sn">
                        {transaction.sn}
                      </span>

                      <div className="sales-recent-transactions__cell sales-recent-transactions__cell--order">
                        <img
                          alt=""
                          src={transaction.imageSrc}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
