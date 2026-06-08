"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function LowStockProducts() {
  const route = all_routes;
  return (
          <div className="col-xxl-4 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-danger fs-16 me-2">
                    <i className="ti ti-alert-triangle" />
                  </span>
                  <h5 className="card-title mb-0">Low Stock Products</h5>
                </div>
                <Link
                  href={route.lowstock}
                  className="fs-13 fw-bold text-decoration-underline"
                >
                  View All
                </Link>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-06.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Dell XPS 13</Link>
                      </h6>
                      <p className="fs-13">ID : #665814</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">Instock</p>
                    <h6 className="text-orange fw-bold">08</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-07.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Vacuum Cleaner Robot</Link>
                      </h6>
                      <p className="fs-13">ID : #940004</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">Instock</p>
                    <h6 className="text-orange fw-bold">14</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-08.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">KitchenAid Stand Mixer</Link>
                      </h6>
                      <p className="fs-13">ID : #325569</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">Instock</p>
                    <h6 className="text-orange fw-bold">21</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-09.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">{`Levi's Trucker Jacket`}</Link>
                      </h6>
                      <p className="fs-13">ID : #124588</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">Instock</p>
                    <h6 className="text-orange fw-bold">12</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-0">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-10.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">{`Lay's Classic`}</Link>
                      </h6>
                      <p className="fs-13">ID : #365586</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">Instock</p>
                    <h6 className="text-orange fw-bold">10</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
