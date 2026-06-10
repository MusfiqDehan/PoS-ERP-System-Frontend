"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    expiredProductsData,
    expiredProductsViewAllHref,
} from "./expiredProductsData";

export default function ExpiredProducts() {
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

    const selectedCount = selectedProductIds.length;
    const shouldShowDeleteMarked = useMemo(() => selectedCount > 1, [selectedCount]);

    const handleToggleSelection = (productId: string, checked: boolean) => {
        setSelectedProductIds((previous) => {
            if (checked) {
                return previous.includes(productId) ? previous : [...previous, productId];
            }

            return previous.filter((id) => id !== productId);
        });
    };

    return (
        <div className="col-xxl-6 col-lg-6 col-12 d-flex">
            <div className="expired-products flex-fill">
                <div className="expired-products__header">
                    <h2 className="expired-products__title">Expired Products</h2>
                    <div className="expired-products__header-actions">
                        {shouldShowDeleteMarked && (
                            <button type="button" className="expired-products__delete-marked">
                                Delete Marked
                            </button>
                        )}
                        <Link href={expiredProductsViewAllHref} className="expired-products__view-all">
                            View All
                        </Link>
                    </div>
                </div>

                <div className="expired-products__table-wrap">
                    <div className="expired-products__table expired-products__table--head">
                        <span className="expired-products__cell expired-products__cell--checkbox" />
                        <span className="expired-products__cell">Product</span>
                        <span className="expired-products__cell">SKU</span>
                        <span className="expired-products__cell">Manufactured</span>
                        <span className="expired-products__cell">Expired</span>
                        <span className="expired-products__cell">Action</span>
                    </div>

                    <ul className="expired-products__rows">
                        {expiredProductsData.map((product, index) => (
                            <li
                                key={product.id}
                                className={`expired-products__table expired-products__row${index < expiredProductsData.length - 1
                                    ? " expired-products__row--divider"
                                    : ""
                                    }`}
                            >
                                <span className="expired-products__cell expired-products__cell--checkbox">
                                    <input
                                        type="checkbox"
                                        aria-label={`Select ${product.name}`}
                                        className="expired-products__checkbox"
                                        checked={selectedProductIds.includes(product.id)}
                                        onChange={(event) => {
                                            handleToggleSelection(product.id, event.target.checked);
                                        }}
                                    />
                                </span>
                                <span className="expired-products__cell">
                                    <span className="expired-products__product">
                                        <span
                                            className="expired-products__thumb"
                                            aria-hidden="true"
                                        />
                                        <span className="expired-products__product-name">{product.name}</span>
                                    </span>
                                </span>
                                <span className="expired-products__cell expired-products__text">
                                    {product.sku}
                                </span>
                                <span className="expired-products__cell expired-products__text">
                                    {product.manufacturedOn}
                                </span>
                                <span className="expired-products__cell expired-products__text">
                                    {product.expiredOn}
                                </span>
                                <span className="expired-products__cell">
                                    <span className="expired-products__actions">
                                        <button
                                            type="button"
                                            className="expired-products__icon-btn"
                                            aria-label={`Edit ${product.name}`}
                                        >
                                            <i className="ti ti-edit" />
                                        </button>
                                        <button
                                            type="button"
                                            className="expired-products__icon-btn"
                                            aria-label={`Delete ${product.name}`}
                                        >
                                            <i className="ti ti-trash" />
                                        </button>
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}