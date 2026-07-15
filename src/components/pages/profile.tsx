"use client";
import CommonFooter from "@/core/common/footer/commonFooter";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@/providers/auth-provider";


export default function ProfileComponent () {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { user, loading } = useCurrentUser();
  const { tenantAccess } = useAuth();
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const fullName = user?.full_name?.trim() || "";
  const [firstName, ...restNames] = fullName.split(" ");
  const lastName = restNames.join(" ");
  const roleLabel = tenantAccess?.is_tenant_admin
    ? "Administrator"
    : tenantAccess?.role_slugs?.[0]?.replaceAll("_", " ") || "Team member";

  React.useEffect(() => {
    if (loading) return;
    const resolvedName = user?.full_name?.trim() || "";
    const [fName, ...rest] = resolvedName.split(" ");
    setFormState({
      firstName: fName || "",
      lastName: rest.join(" "),
      email: user?.email || "",
      phone: user?.phone || "",
      username: resolvedName || "",
    });
  }, [loading, user?.email, user?.full_name, user?.phone]);

  const handleFieldChange =
    (field: keyof typeof formState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const backendPayloadPreview = {
    full_name: `${formState.firstName} ${formState.lastName}`.trim(),
    email: formState.email.trim(),
    phone: formState.phone.trim(),
  };

  const handleSaveChanges = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSaveMessage(
      "Profile update API not implemented yet. Please share the endpoint request below with backend developer.",
    );
  };

  const handleCancel = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const resolvedName = user?.full_name?.trim() || "";
    const [fName, ...rest] = resolvedName.split(" ");
    setFormState({
      firstName: fName || "",
      lastName: rest.join(" "),
      email: user?.email || "",
      phone: user?.phone || "",
      username: resolvedName || "",
    });
    setSaveMessage(null);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Profile</h4>
            <h6>User Profile</h6>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-header">
            <h4>Profile</h4>
          </div>
          <div className="card-body profile-body">
            {saveMessage ? (
              <div className="alert alert-warning mb-3" role="alert">
                <div className="fw-semibold mb-1">{saveMessage}</div>
                <div className="small mb-1">
                  Suggested endpoint: <code>PATCH /api/v1/tenancy/me/</code>
                </div>
                <div className="small">
                  Request body: <code>{JSON.stringify(backendPayloadPreview)}</code>
                </div>
              </div>
            ) : null}
            <h5 className="mb-2">
              <i className="ti ti-user text-primary me-1" />
              Basic Information
            </h5>
            <div className="profile-pic-upload image-field">
              <div className="profile-pic p-2">
                <img
                  src={user?.profile_picture?.url || "./assets/img/users/user-49.png"}
                  className="object-fit-cover h-100 rounded-1"
                  alt={fullName || "user"}
                />
                <button type="button" className="close rounded-1">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="mb-3">
                <div className="image-upload mb-0 d-inline-flex">
                  <input type="file" />
                  <div className="btn btn-primary fs-13">Change Image</div>
                </div>
                <p className="mt-2">
                  Upload an image below 2 MB, Accepted File format JPG, PNG
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    First Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={loading ? "Loading..." : formState.firstName}
                    onChange={handleFieldChange("firstName")}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    Last Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={loading ? "Loading..." : formState.lastName}
                    onChange={handleFieldChange("lastName")}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label>
                    Email<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={loading ? "Loading..." : formState.email}
                    onChange={handleFieldChange("email")}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    Phone Number<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={loading ? "Loading..." : formState.phone}
                    className="form-control"
                    onChange={handleFieldChange("phone")}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    User Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={loading ? "Loading..." : formState.username}
                    onChange={handleFieldChange("username")}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    className="form-control text-capitalize"
                    value={roleLabel}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    Password<span className="text-danger ms-1">*</span>
                  </label>
                  <div className="pass-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="pass-input form-control"
                    />
                    <span
                      className={`ti toggle-password ${isPasswordVisible ? "ti-eye" : "ti-eye-off"
                        }`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>

                </div>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <Link
                  href="#"
                  className="btn btn-secondary me-2 shadow-none"
                  onClick={handleCancel}
                >
                  Cancel
                </Link>
                <Link
                  href="#"
                  className="btn btn-primary shadow-none"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
      <CommonFooter />
    </div>

  );
};

