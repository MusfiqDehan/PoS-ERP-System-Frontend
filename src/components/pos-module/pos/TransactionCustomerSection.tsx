"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import CustomerLoyaltyBadges from "./CustomerLoyaltyBadges";
import CustomerLoyaltyMode from "./CustomerLoyaltyMode";
import type { LoyaltyMode } from "./posLoyaltyConfig";
import {
  filterTransactionCustomers,
  transactionDetailsAssets,
  transactionSaleTypes,
  type TransactionCustomer,
} from "./transactionDetailsData";
import { openPosScanInput } from "@/lib/posScanEvents";

type TransactionCustomerSectionProps = {
  customers: TransactionCustomer[];
  selectedCustomer: TransactionCustomer;
  onSelectCustomer: (customer: TransactionCustomer) => void;
  loyaltyMode: LoyaltyMode;
  onLoyaltyModeChange: (mode: LoyaltyMode) => void;
  cartSubtotal: number;
};

export default function TransactionCustomerSection({
  customers,
  selectedCustomer,
  onSelectCustomer,
  loyaltyMode,
  onLoyaltyModeChange,
  cartSubtotal,
}: TransactionCustomerSectionProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const filteredCustomers = useMemo(
    () => filterTransactionCustomers(query, customers),
    [customers, query],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (customer: TransactionCustomer) => {
    onSelectCustomer(customer);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="pos-transaction-details__section">
      <h3 className="pos-transaction-details__section-title">Customer Details</h3>

      <div className="pos-transaction-details__customer-fields">
        <div
          ref={rootRef}
          className={`pos-transaction-details__customer-search${
            isOpen ? " pos-transaction-details__customer-search--open" : ""
          }`}
        >
          <div className="pos-transaction-details__search-wrap">
            <img
              src={transactionDetailsAssets.search}
              alt=""
              className="pos-transaction-details__search-icon"
              width={16}
              height={16}
            />
            <input
              type="search"
              className="pos-transaction-details__search-input"
              placeholder="Search by name or phone..."
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              aria-label="Search customers by name or phone"
              aria-expanded={isOpen}
              aria-controls="pos-customer-search-results"
              autoComplete="off"
            />
          </div>

          {isOpen && (
            <ul
              id="pos-customer-search-results"
              className="pos-transaction-details__search-results"
              role="listbox"
            >
              {filteredCustomers.length === 0 ? (
                <li className="pos-transaction-details__search-empty">
                  No customers found
                </li>
              ) : (
                filteredCustomers.map((customer) => (
                  <li key={customer.id} role="option">
                    <button
                      type="button"
                      className={`pos-transaction-details__search-option${
                        selectedCustomer.id === customer.id
                          ? " pos-transaction-details__search-option--active"
                          : ""
                      }`}
                      onClick={() => handleSelect(customer)}
                    >
                      <span className="pos-transaction-details__search-option-main">
                        <span className="pos-transaction-details__customer-name">
                          {customer.name}
                        </span>
                        {customer.phone && (
                          <span className="pos-transaction-details__customer-phone">
                            {customer.phone}
                          </span>
                        )}
                      </span>
                      <span className="pos-transaction-details__search-option-meta">
                        <CustomerLoyaltyBadges customer={customer} />
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {!isOpen && (
          <div className="pos-transaction-details__customer-selected">
            <span className="pos-transaction-details__customer-name">
              {selectedCustomer.name}
            </span>
            {selectedCustomer.phone && (
              <span className="pos-transaction-details__customer-phone">
                {selectedCustomer.phone}
              </span>
            )}
            <CustomerLoyaltyBadges customer={selectedCustomer} />
          </div>
        )}

        <CustomerLoyaltyMode
          customer={selectedCustomer}
          subtotal={cartSubtotal}
          mode={loyaltyMode}
          onModeChange={onLoyaltyModeChange}
        />

        <div className="pos-transaction-details__customer-actions">
          <button
            type="button"
            className="pos-transaction-details__sale-type"
            aria-haspopup="listbox"
          >
            <span>{transactionSaleTypes[0].label}</span>
            <img
              src={transactionDetailsAssets.chevronDown}
              alt=""
              className="pos-transaction-details__chevron"
              width={16}
              height={16}
            />
          </button>

          <button
            type="button"
            className="pos-transaction-details__icon-btn"
            data-bs-toggle="modal"
            data-bs-target="#pos-create-customer"
            aria-label="Add customer"
          >
            <img
              src={transactionDetailsAssets.userPlus}
              alt=""
              width={18}
              height={18}
            />
          </button>

          <button
            type="button"
            className="pos-transaction-details__icon-btn"
            onClick={() => openPosScanInput()}
            aria-label="Scan product barcode"
          >
            <img src={transactionDetailsAssets.scan} alt="" width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
