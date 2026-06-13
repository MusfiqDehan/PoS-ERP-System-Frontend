import Link from "next/link";
import type { HeaderRoutes } from "./types";

type HeaderQuickAddProps = {
    route: HeaderRoutes;
};

export default function HeaderQuickAdd({ route }: HeaderQuickAddProps) {
    return (
        <div className="nav-item dropdown link-nav figma-header-control figma-add-new">
            <Link
                href="#"
                className="btn btn-md d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
            >
                <i className="ti ti-circle-plus me-1" />
                Add New
            </Link>
            <div className="dropdown-menu dropdown-xl dropdown-menu-center">
                <div className="row g-2">
                    <div className="col-md-2">
                        <Link href={route.categorylist} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-brand-codepen" />
                            </span>
                            <p>Category</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.addproduct} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-square-plus" />
                            </span>
                            <p>Product</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.categorylist} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-shopping-bag" />
                            </span>
                            <p>Purchase</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.onlineorder} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-shopping-cart" />
                            </span>
                            <p>Sale</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.expenselist} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-file-text" />
                            </span>
                            <p>Expense</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.quotationlist} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-device-floppy" />
                            </span>
                            <p>Quotation</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.salesreturn} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-copy" />
                            </span>
                            <p>Return</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.users} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-user" />
                            </span>
                            <p>User</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.customer} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-users" />
                            </span>
                            <p>Customer</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.salesreport} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-shield" />
                            </span>
                            <p>Biller</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.suppliers} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-user-check" />
                            </span>
                            <p>Supplier</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link href={route.stocktransfer} className="link-item">
                            <span className="link-icon">
                                <i className="ti ti-truck" />
                            </span>
                            <p>Transfer</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
