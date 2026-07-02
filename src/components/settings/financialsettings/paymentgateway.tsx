"use client";

import CommonFooter from "@/core/common/footer/commonFooter";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import { fetchPlatformGateways, type PaymentGateway } from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";
import { Link } from "react-feather";
import { useCallback, useEffect, useState } from "react";
import SettingsSideBar from "../settingssidebar";

export default function PaymentGatewayComponent() {
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async function () {
    const token = getAccessToken();
    if (!token) {
      setError("You must be signed in as a platform admin to manage gateways.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchPlatformGateways(token);
      if (result.ok && result.body.success && Array.isArray(result.body.data)) {
        setGateways(result.body.data);
      } else {
        setError(result.body.message || "Failed to load payment gateways.");
      }
    } catch {
      setError("Unable to reach the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function () {
    load();
  }, [load]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Manage your settings on portal</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
            </ul>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="card flex-fill mb-0">
                  <div className="card-header">
                    <h4>Payment Gateway</h4>
                  </div>
                  <div className="card-body pb-0">
                    {loading ? (
                      <div className="text-center py-5 text-muted">
                        Loading gateways...
                      </div>
                    ) : error ? (
                      <div className="text-center py-5 text-danger">{error}</div>
                    ) : gateways.length === 0 ? (
                      <div className="text-center py-5 text-muted">
                        No payment gateways configured.
                      </div>
                    ) : (
                      <div className="row">
                        {gateways.map(function (gw) {
                          return (
                            <div
                              key={gw.id}
                              className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex"
                            >
                              <div className="card flex-fill">
                                <div className="w-100 card-body">
                                  <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                      <div className="d-flex align-items-center">
                                        <span>
                                          <img
                                            src={`assets/img/icons/payment-icon-${gw.slug}.svg`}
                                            alt={gw.name}
                                            onError={function (e) {
                                              (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                          />
                                        </span>
                                      </div>
                                      <span
                                        className={
                                          gw.is_active
                                            ? "badge bg-outline-success"
                                            : "badge border text-dark"
                                        }
                                      >
                                        {gw.is_active ? "Connected" : "Not connected"}
                                      </span>
                                    </div>
                                    <p className="mb-3">{gw.name}</p>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                    <Link
                                      href="#"
                                      className="btn btn-sm btn-outline-secondary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#payment-connect"
                                    >
                                      <i className="ti ti-tool me-2" />
                                      {gw.is_active
                                        ? "View Integration"
                                        : "Connect"}
                                    </Link>
                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                      <input
                                        type="checkbox"
                                        id={`gw-${gw.id}`}
                                        className="check"
                                        defaultChecked={gw.is_active}
                                      />
                                      <label
                                        htmlFor={`gw-${gw.id}`}
                                        className="checktoggle"
                                      >
                                        {" "}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>
    </div>
  );
}
