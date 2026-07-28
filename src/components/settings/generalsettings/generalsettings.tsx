"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useRef, useState } from "react";
import Select from "react-select";
import SettingsSideBar from "../settingssidebar";
import { City, Country, State } from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import CommonFooter from "@/core/common/footer/commonFooter";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import { getAccessToken } from "@/lib/auth-session";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { uploadProfilePicture, removeProfilePicture } from "@/lib/profile";

export default function GeneralSettingsComponent() {
  const { user, loading: userLoading } = useCurrentUser();
  const token = getAccessToken();

  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profilePicUrl = user?.profile_picture?.url ?? null;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploading(true);
    setFeedback(null);
    const { ok, body } = await uploadProfilePicture(file, token);
    setUploading(false);

    if (ok && body.success) {
      setFeedback({ type: "success", message: "Profile picture updated." });
      // Reload the page so the header avatar and this page both reflect the change
      window.location.reload();
    } else {
      setFeedback({
        type: "error",
        message: body?.message || "Failed to upload image.",
      });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = async () => {
    if (!token || !profilePicUrl) return;
    if (!confirm("Remove your profile picture?")) return;

    const { ok, body } = await removeProfilePicture(token);
    if (ok && body.success) {
      setFeedback({ type: "success", message: "Profile picture removed." });
      window.location.reload();
    } else {
      setFeedback({
        type: "error",
        message: body?.message || "Failed to remove image.",
      });
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Settings</h4>
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
                    <h4 className="fs-18 fw-bold">Profile</h4>
                  </div>
                  <div className="card-body">
                    {feedback && (
                      <div
                        className={`alert ${
                          feedback.type === "success"
                            ? "alert-success"
                            : "alert-danger"
                        } alert-dismissible fade show py-2 mb-3`}
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
                      <div className="card-title-head">
                        <h6 className="fs-16 fw-bold mb-3">
                          <span className="fs-16 me-2">
                            <i className="ti ti-user" />
                          </span>
                          Basic Information
                        </h6>
                      </div>
                      <div className="profile-pic-upload">
                        <div className="profile-pic">
                          {profilePicUrl ? (
                            <img
                              src={profilePicUrl}
                              alt="Profile"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <span>
                              <i className="ti ti-circle-plus mb-1 fs-16" /> Add Image
                            </span>
                          )}
                        </div>
                        <div className="new-employee-field">
                          <div className="mb-0">
                            <div className="image-upload mb-0">
                              <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleUpload}
                                disabled={uploading}
                              />
                              <div className="image-uploads">
                                <h4>
                                  {uploading ? "Uploading…" : "Upload Image"}
                                </h4>
                              </div>
                            </div>
                            <span className="fs-13 fw-medium mt-2">
                              Upload an image below 2 MB, Accepted File format JPG, PNG
                            </span>
                          </div>
                          {profilePicUrl && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger mt-2"
                              onClick={handleRemove}
                            >
                              Remove Picture
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={userLoading ? "Loading…" : (user?.full_name ?? "")}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">
                              User Name <span className="text-danger">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={user?.phone ?? ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={user?.email ?? ""}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-title-head">
                        <h6 className="fs-16 fw-bold mb-3">
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
                            <input type="email" className="form-control" />
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
                      <div className="text-end settings-bottom-btn mt-0">
                        <button type="button" className="btn btn-secondary me-2">
                          Cancel
                        </button>
                        <Link href="#" className="btn btn-primary">
                          Save Changes
                        </Link>
                      </div>
                    </form>
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
