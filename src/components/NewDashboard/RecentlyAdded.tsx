import Link from "next/link";
import {
    recentlyAddedData,
    recentlyAddedViewAllHref,
} from "./recentlyAddedData";

export default function RecentlyAdded() {
    return (
        <div className="col-xxl-6 col-lg-6 col-12 d-flex">
            <div className="recently-added flex-fill">
                <div className="recently-added__header">
                    <h2 className="recently-added__title">Recently Added</h2>
                    <Link href={recentlyAddedViewAllHref} className="recently-added__view-all">
                        View All
                    </Link>
                </div>

                <div className="recently-added__table-wrap">
                    <div className="recently-added__table recently-added__table--head">
                        <span className="recently-added__cell recently-added__cell--sn">SN</span>
                        <span className="recently-added__cell">Product</span>
                        <span className="recently-added__cell">Added On</span>
                        <span className="recently-added__cell">Price</span>
                        <span className="recently-added__cell recently-added__cell--action">Action</span>
                    </div>

                    <ul className="recently-added__rows">
                        {recentlyAddedData.map((item, index) => (
                            <li
                                key={item.id}
                                className={`recently-added__table recently-added__row${index < recentlyAddedData.length - 1
                                    ? " recently-added__row--divider"
                                    : ""
                                    }`}
                            >
                                <span className="recently-added__cell recently-added__cell--sn">
                                    {index + 1}
                                </span>
                                <span className="recently-added__cell">
                                    <span className="recently-added__product">
                                        <span
                                            className="recently-added__thumb"
                                            aria-hidden="true"
                                        />
                                        <span className="recently-added__product-name">
                                            {item.productName}
                                        </span>
                                    </span>
                                </span>
                                <span className="recently-added__cell recently-added__text">
                                    {item.addedOn}
                                </span>
                                <span className="recently-added__cell recently-added__text">
                                    {item.price}
                                </span>
                                <span className="recently-added__cell recently-added__cell--action">
                                    <span className="recently-added__actions">
                                        <button
                                            type="button"
                                            className="recently-added__icon-btn"
                                            aria-label={`Edit ${item.productName}`}
                                        >
                                            <i className="ti ti-edit" />
                                        </button>
                                        <button
                                            type="button"
                                            className="recently-added__icon-btn"
                                            aria-label={`Delete ${item.productName}`}
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