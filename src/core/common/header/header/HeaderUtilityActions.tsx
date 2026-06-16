/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { HeaderRoutes } from "./types";

type HeaderUtilityActionsProps = {
    route: HeaderRoutes;
    flagImage: string;
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
};

export default function HeaderUtilityActions({
    route,
    flagImage,
    isFullscreen,
    onToggleFullscreen,
}: HeaderUtilityActionsProps) {
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
                                            <img alt="Sortonium" src="assets/img/profiles/avatar-13.jpg" />
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
                            <li className="notification-message">
                                <Link href={route.activities}>
                                    <div className="media d-flex">
                                        <span className="avatar flex-shrink-0">
                                            <img alt="Sortonium" src="assets/img/profiles/avatar-03.jpg" />
                                        </span>
                                        <div className="flex-grow-1">
                                            <p className="noti-details">
                                                <span className="noti-title">Leo Kelly</span> cancelled his order scheduled for 17 Jan 2025
                                            </p>
                                            <p className="noti-time">10 mins ago</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li className="notification-message">
                                <Link href={route.activities} className="recent-msg">
                                    <div className="media d-flex">
                                        <span className="avatar flex-shrink-0">
                                            <img alt="Sortonium" src="assets/img/profiles/avatar-17.jpg" />
                                        </span>
                                        <div className="flex-grow-1">
                                            <p className="noti-details">
                                                Payment of $50 received for Order #67890 from <span className="noti-title">Antonio Engle</span>
                                            </p>
                                            <p className="noti-time">05 mins ago</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li className="notification-message">
                                <Link href={route.activities} className="recent-msg">
                                    <div className="media d-flex">
                                        <span className="avatar flex-shrink-0">
                                            <img alt="Sortonium" src="assets/img/profiles/avatar-02.jpg" />
                                        </span>
                                        <div className="flex-grow-1">
                                            <p className="noti-details">
                                                <span className="noti-title">Andrea</span> confirmed his order. Order No: #73401.Estimated
                                                delivery: 3 days
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
                <Link href="#" className="nav-link userset" data-bs-toggle="dropdown">
                    <span className="user-info p-0">
                        <span className="user-letter">
                            <img src="assets/img/profiles/avator1.jpg" alt="Sortonium" className="img-fluid" />
                        </span>
                        <span className="figma-profile-name">Jamiuddin Saif</span>
                    </span>
                </Link>
                <div className="dropdown-menu menu-drop-user">
                    <div className="profileset d-flex align-items-center">
                        <span className="user-img me-2">
                            <img src="assets/img/profiles/avator1.jpg" alt="Sortonium" />
                        </span>
                        <div>
                            <h6 className="fw-medium">John Smilga</h6>
                            <p>Admin</p>
                        </div>
                    </div>
                    <Link className="dropdown-item" href={route.profile}>
                        <i className="ti ti-user-circle me-2" />
                        MyProfile
                    </Link>
                    <Link className="dropdown-item" href={route.salesreport}>
                        <i className="ti ti-file-text me-2" />
                        Reports
                    </Link>
                    <Link className="dropdown-item" href={route.generalsettings}>
                        <i className="ti ti-settings-2 me-2" />
                        Settings
                    </Link>
                    <hr className="my-2" />
                    <Link className="dropdown-item logout pb-0" href={route.signin}>
                        <i className="ti ti-logout me-2" />
                        Logout
                    </Link>
                </div>
            </li>
        </>
    );
}
