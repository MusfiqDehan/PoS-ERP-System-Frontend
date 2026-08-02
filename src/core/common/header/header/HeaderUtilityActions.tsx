/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@/providers/auth-provider";
import type { HeaderRoutes } from "./types";
import LogoutLink from "@/components/auth/LogoutLink";

type HeaderUtilityActionsProps = {
    route: HeaderRoutes;
    flagImage: string;
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
};

function formatRoleLabel(
    roleSlugs: string[] | undefined,
    isTenantAdmin: boolean,
): string {
    if (isTenantAdmin || roleSlugs?.includes("admin")) {
        return "Administrator";
    }
    if (roleSlugs?.includes("branch_manager")) {
        return "Branch Manager";
    }
    const slug = roleSlugs?.[0];
    if (!slug) return "Team Member";
    return slug
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export default function HeaderUtilityActions({
    route,
    flagImage,
    isFullscreen,
    onToggleFullscreen,
}: HeaderUtilityActionsProps) {
    const { user } = useCurrentUser();
    const { tenantAccess } = useAuth();

    const displayName = user?.full_name?.trim() || user?.email || "User";
    const displayRole = formatRoleLabel(
        tenantAccess?.role_slugs,
        tenantAccess?.is_tenant_admin ?? false,
    );
    const firstLetter = displayName.charAt(0).toUpperCase();

    const profilePictureUrl =
        user?.profile_picture && typeof user.profile_picture === "object"
            ? (user.profile_picture as Record<string, unknown>)?.url
            : null;

    return (
        <>
            <li className="nav-item pos-nav figma-utility-item figma-utility-pos">
                <Link
                    href={route.pos}
                    className="btn btn-md d-inline-flex align-items-center"
                >
                    <i className="ti ti-cash fs-14 me-1" aria-hidden="true" />
                    POS
                </Link>
            </li>

            <li className="nav-item dropdown has-arrow flag-nav nav-item-box figma-utility-item figma-utility-icon">
                <Link
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                >
                    <img src={flagImage} alt="img" height={16} />
                </Link>
                <div className="dropdown-menu dropdown-menu-right">
                    <Link href="#" className="dropdown-item active">
                        <img src="assets/img/flags/english.svg" alt="img" height={16} />
                    </Link>
                    <Link href="#" className="dropdown-item">
                        <img src="assets/img/flags/arabic.svg" alt="img" height={16} /> Arabic
                    </Link>
                </div>
            </li>

            <li className="nav-item nav-item-box figma-utility-item figma-utility-icon">
                <Link
                    href="#"
                    id="btnFullscreen"
                    onClick={onToggleFullscreen}
                    className={isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
                >
                    <i className="ti ti-maximize"></i>
                </Link>
            </li>

            <li className="nav-item nav-item-box figma-utility-item figma-utility-icon">
                <Link href="/email">
                    <i className="ti ti-mail"></i>
                    <span className="badge rounded-pill">1</span>
                </Link>
            </li>

            <li className="nav-item dropdown nav-item-box figma-utility-item figma-utility-icon">
                <Link href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                    <i className="ti ti-bell"></i>
                </Link>
                <div className="dropdown-menu notifications">
                    <div className="topnav-dropdown-header">
                        <h5 className="notification-title">Notifications</h5>
                        <Link href="#" className="clear-noti">
                            Mark all as read
                        </Link>
                    </div>
                    <div className="noti-content">
                        <ul className="notification-list">
                            <li className="notification-message">
                                <Link href={route.activities}>
                                    <div className="media d-flex">
                                        <span className="avatar flex-shrink-0">
                                            <img alt="Sortorium" src="assets/img/profiles/avatar-13.jpg" />
                                        </span>
                                        <div className="flex-grow-1">
                                            <p className="noti-details">
                                                <span className="noti-title">James Kirwin</span> confirmed his order. Order No: #78901.Estimated
                                                delivery: 2 days
                                            </p>
                                            <p className="noti-time">4 mins ago</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="topnav-dropdown-footer d-flex align-items-center gap-3">
                        <Link href="#" className="btn btn-secondary btn-md w-100">
                            Cancel
                        </Link>
                        <Link href={route.activities} className="btn btn-primary btn-md w-100">
                            View all
                        </Link>
                    </div>
                </div>
            </li>

            <li className="nav-item nav-item-box figma-utility-item figma-utility-icon">
                <Link href="/general-settings">
                    <i className="ti ti-settings"></i>
                </Link>
            </li>

            <li className="nav-item dropdown has-arrow main-drop profile-nav figma-utility-item figma-profile-control">
                <button
                    type="button"
                    className="nav-link userset figma-profile-trigger"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <span className="figma-profile-avatar">
                        {profilePictureUrl ? (
                            <img
                                src={String(profilePictureUrl)}
                                alt={displayName}
                                className="img-fluid"
                            />
                        ) : (
                            <span className="figma-profile-avatar__placeholder">
                                {firstLetter}
                            </span>
                        )}
                    </span>
                    <span className="figma-profile-text">
                        <span className="figma-profile-name">{displayName}</span>
                        <span className="figma-profile-role">{displayRole}</span>
                    </span>
                    <i className="ti ti-chevron-down figma-profile-caret" aria-hidden="true" />
                </button>

                <div className="dropdown-menu dropdown-menu-end menu-drop-user figma-profile-menu">
                    <div className="figma-profile-menu__header">
                        <span className="figma-profile-menu__avatar">
                            {profilePictureUrl ? (
                                <img
                                    src={String(profilePictureUrl)}
                                    alt={displayName}
                                />
                            ) : (
                                <span className="figma-profile-avatar__placeholder figma-profile-avatar__placeholder--lg">
                                    {firstLetter}
                                </span>
                            )}
                        </span>
                        <div className="figma-profile-menu__meta">
                            <h6>{displayName}</h6>
                            <p>{displayRole}</p>
                            {user?.email ? <span>{user.email}</span> : null}
                        </div>
                    </div>

                    <div className="figma-profile-menu__divider" />

                    <Link className="dropdown-item figma-profile-menu__item" href={route.profile}>
                        <i className="ti ti-user-circle" />
                        My Profile
                    </Link>
                    <Link className="dropdown-item figma-profile-menu__item" href={route.salesreport}>
                        <i className="ti ti-file-text" />
                        Reports
                    </Link>
                    <Link className="dropdown-item figma-profile-menu__item" href={route.generalsettings}>
                        <i className="ti ti-settings-2" />
                        Settings
                    </Link>

                    <div className="figma-profile-menu__divider" />

                    <LogoutLink className="dropdown-item figma-profile-menu__item figma-profile-menu__item--logout logout pb-0">
                        <i className="ti ti-logout" />
                        Logout
                    </LogoutLink>
                </div>
            </li>
        </>
    );
}
