"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useRef, useState } from "react";
import SettingsSideBar from "../settingssidebar";
import Select from "react-select";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import { City, Country, State } from "@/core/common/selectOption/selectOption";
import CommonFooter from "@/core/common/footer/commonFooter";
import {
  fetchTenantBranding,
  uploadCompanyLogo,
  removeCompanyLogo,
  type TenantBranding,
} from "@/lib/branding";
import { getAccessToken } from "@/lib/auth-session";
import LandingPageSettings from "./LandingPageSettings";

export default function CompanySettingsComponent() {
  const token = getAccessToken();

  const [branding, setBranding] = useState<TenantBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoUploading, setLogoUploading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const loadBranding = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const { ok, body } = await fetchTenantBranding(token);
    if (ok && body.success && body.data) {
      setBranding(body.data);
    } else {
      setFeedback({ type: "error", message: "Failed to load branding settings." });
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    void loadBranding();
  }, [loadBranding]);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setLogoUploading(true);
    setFeedback(null);

    const result = await uploadCompanyLogo(file, token);
    if (result.ok && result.body.success) {
      setFeedback({ type: "success", message: "Company logo updated successfully." });
      await loadBranding();
    } else {
      setFeedback({
        type: "error",
        message: result.body?.message || "Failed to upload logo.",
      });
    }

    setLogoUploading(false);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handleRemoveLogo = async () => {
    if (!token || !branding?.company_logo) return;
    if (!confirm("Remove the company logo?")) return;

    const result = await removeCompanyLogo(token);
    if (result.ok && result.body.success) {
      setFeedback({ type: "success", message: "Company logo removed." });
      await loadBranding();
    } else {
      setFeedback({
        type: "error",
        message: result.body?.message || "Failed to remove logo.",
      });
    }
  };

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
                    <h4 className="fs-18 fw-bold">Company Settings</h4>
                  </div>
                  <div className="card-body">
                    {loading && (
                      <div className="text-center py-4 text-muted">Loading branding settings…</div>
                    )}

                    {feedback && (
                      <div
                        className={`alert ${
                          feedback.type === "success"
                            ? "alert-success"
                            : "alert-danger"
                        } alert-dismissible fade show py-2`}
                        role="alert"
                      >
                        {feedback.message}
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setFeedback(null)}
                          aria-label="Close"
                        />
                      </div>
                    )}

                    <form>
                      <div className="border-bottom mb-3">
                        <div className="card-title-head">
                          <h6 className="fs-16 fw-bold mb-2">
                            <span className="fs-16 me-2">
                              <i className="ti ti-building" />
                            </span>
                            Company Information
                          </h6>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-6 col-md-4">
                            <div className="mb-3">
                              <label className="form-label">
                                Company Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={branding?.name ?? ""}
                                readOnly
                              />
                              <small className="text-muted">
                                Loaded from your workspace settings
                              </small>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-4">
                            <div className="mb-3">
                              <label className="form-label">
                                Company Email Address <span className="text-danger">*</span>
                              </label>
                              <input type="email" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">
                                Phone Number <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">
                                Fax <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">
                                Website <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-bottom mb-3 pb-3">
                        <div className="card-title-head">
                          <h6 className="fs-16 fw-bold mb-2">
                            <span className="fs-16 me-2">
                              <i className="ti ti-photo" />
                            </span>
                            Company Logo
                          </h6>
                        </div>
                        <div className="row align-items-center gy-3">
                          <div className="col-xl-9">
                            <div className="row gy-3 align-items-center">
                              <div className="col-lg-4">
                                <div className="logo-info">
                                  <h6 className="fw-medium">Company Logo</h6>
                                  <p>Upload Logo of your Company</p>
                                </div>
                              </div>
                              <div className="col-lg-8">
                                <div className="profile-pic-upload mb-0 justify-content-lg-end">
                                  <div className="new-employee-field">
                                    <div className="mb-0">
                                      <div className="image-upload mb-0">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          ref={logoInputRef}
                                          onChange={handleLogoChange}
                                          disabled={logoUploading}
                                        />
                                        <div className="image-uploads">
                                          <h4>
                                            <i className="ti ti-upload me-1" />
                                            {logoUploading
                                              ? "Uploading…"
                                              : "Upload Image"}
                                          </h4>
                                        </div>
                                      </div>
                                      <span className="mt-1">
                                        Recommended size is 450px x 450px. Max size 5mb.
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="new-logo ms-xl-auto">
                              {branding?.company_logo?.url ? (
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveLogo();
                                  }}
                                >
                                  <img
                                    src={branding.company_logo.url}
                                    alt={branding.company_logo.alt_text || "Company Logo"}
                                    style={{
                                      maxWidth: 120,
                                      maxHeight: 60,
                                      objectFit: "contain",
                                    }}
                                  />
                                  <span>
                                    <i className="ti ti-x" />
                                  </span>
                                </a>
                              ) : (
                                <span className="text-muted text-center d-block small">
                                  No logo uploaded
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="company-address">
                        <div className="card-title-head">
                          <h6 className="fs-16 fw-bold mb-2">
                            <span className="fs-16 me-2">
                              <i className="ti ti-map-pin" />
                            </span>
                            Address Information
                          </h6>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Address <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Country <span className="text-danger">*</span>
                              </label>
                              <Select
                                classNamePrefix="react-select"
                                options={Country}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                State <span className="text-danger">*</span>
                              </label>
                              <Select
                                classNamePrefix="react-select"
                                options={State}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                City <span className="text-danger">*</span>
                              </label>
                              <Select
                                classNamePrefix="react-select"
                                options={City}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Postal Code <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-end settings-bottom-btn mt-0">
                        <button type="button" className="btn btn-secondary me-2">
                          Cancel
                        </button>
                        <a href="#" className="btn btn-primary">
                          Save Changes
                        </a>
                      </div>
                    </form>
                    <LandingPageSettings />
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
