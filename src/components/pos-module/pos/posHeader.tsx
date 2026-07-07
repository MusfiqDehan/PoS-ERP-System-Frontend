"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import { Settings, User } from "react-feather";
import { useEffect, useState } from "react";
import {
  posHeaderActions,
  posHeaderAssets,
  posHeaderUser,
} from "./posHeaderData";
import PosHeaderModals from "./PosHeaderModals";
import { openPosModal } from "./categories-modal/openPosModal";
import { useActiveBranch } from "@/providers/branch-provider";

const formatHeaderDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function PosHeader() {
  const {
    branches,
    activeBranch,
    setActiveBranchId,
    loading: branchesLoading,
    canSwitchBranch,
  } = useActiveBranch();
  const [headerDate, setHeaderDate] = useState("");

  useEffect(() => {
    setHeaderDate(formatHeaderDate(new Date()));
  }, []);

  return (
    <header className="pos-page-header">
      <div className="pos-page-header__inner">
        <div className="pos-page-header__left">
          <div className="pos-page-header__brand">
            <ImageWithBasePath
              src={posHeaderAssets.companyLogo}
              alt="Sortorium"
              width={128}
              height={28}
              className="pos-page-header__logo"
            />
            <p className="pos-page-header__date">{headerDate}</p>
          </div>

          <div className="pos-page-header__nav-toggle">
            <span className="pos-page-header__nav-item pos-page-header__nav-item--active">
              POS
            </span>
            <Link
              href={all_routes.newdashboard}
              className="pos-page-header__nav-item"
            >
              Dashboard
            </Link>
          </div>

          <div className="dropdown pos-page-header__location-dropdown">
            <button
              type="button"
              className="pos-page-header__location dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              disabled={branchesLoading || !canSwitchBranch}
            >
              <span className="pos-page-header__location-content">
                <ImageWithBasePath
                  src={posHeaderAssets.store}
                  alt=""
                  width={24}
                  height={24}
                  className="pos-page-header__location-icon"
                />
                <span className="pos-page-header__location-name">
                  {branchesLoading
                    ? "Loading…"
                    : (activeBranch?.name ?? "Select Branch")}
                </span>
              </span>
              {canSwitchBranch && (
                <ImageWithBasePath
                  src={posHeaderAssets.chevronDown}
                  alt=""
                  width={16}
                  height={16}
                  className="pos-page-header__chevron"
                />
              )}
            </button>
            {canSwitchBranch && (
              <ul className="dropdown-menu">
                {branches.map((branch) => (
                  <li key={branch.id}>
                    <button
                      type="button"
                      className={`dropdown-item${branch.id === activeBranch?.id ? " active" : ""}`}
                      onClick={() => setActiveBranchId(branch.id)}
                    >
                      <ImageWithBasePath
                        src={posHeaderAssets.store}
                        alt=""
                        width={24}
                        height={24}
                        className="me-2"
                      />
                      {branch.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="pos-page-header__right">
          <div className="pos-page-header__actions">
            {posHeaderActions.map((action) => {
              const icon = (
                <ImageWithBasePath
                  src={action.iconSrc}
                  alt=""
                  width={action.width}
                  height={action.height}
                  className="pos-page-header__action-icon"
                />
              );

              if (action.modalTarget) {
                const modalId = action.modalTarget.replace(/^#/, "");
                return (
                  <button
                    key={action.id}
                    type="button"
                    className="pos-page-header__action"
                    aria-label={action.label}
                    onClick={() => openPosModal(modalId)}
                  >
                    {icon}
                  </button>
                );
              }

              const href =
                action.id === "settings"
                  ? all_routes.possettings
                  : (action.href ?? "#");

              return (
                <Link
                  key={action.id}
                  href={href}
                  className="pos-page-header__action"
                  aria-label={action.label}
                >
                  {icon}
                </Link>
              );
            })}
          </div>

          <div className="dropdown pos-page-header__profile-dropdown">
            <button
              type="button"
              className="pos-page-header__profile dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ImageWithBasePath
                src={posHeaderUser.avatarSrc}
                alt=""
                width={28}
                height={28}
                className="pos-page-header__avatar"
              />
              <span className="pos-page-header__user-name">
                {posHeaderUser.name}
              </span>
              <ImageWithBasePath
                src={posHeaderAssets.chevronDown}
                alt=""
                width={16}
                height={16}
                className="pos-page-header__chevron"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="dropdown-item-text">
                <strong>{posHeaderUser.name}</strong>
                <span className="d-block text-muted small">
                  {posHeaderUser.role}
                </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" href={all_routes.profile}>
                  <User className="me-2" size={16} />
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  href={all_routes.generalsettings}
                >
                  <Settings className="me-2" size={16} />
                  Settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" href={all_routes.signin}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <PosHeaderModals />
    </header>
  );
}
