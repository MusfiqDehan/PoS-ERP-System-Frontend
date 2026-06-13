/* eslint-disable @next/next/no-img-element */

import { ChevronsLeft } from "react-feather";
import Link from "next/link";

type HeaderLogoSectionProps = {
    pathname: string;
    toggle: boolean;
    expandMenus: boolean;
    dataLayout: string;
    onExpandMenu: () => void;
    onExpandMenuOpen: () => void;
    onToggleSidebar: () => void;
    newDashboardHref: string;
};

export default function HeaderLogoSection({
    pathname,
    toggle,
    expandMenus,
    dataLayout,
    onExpandMenu,
    onExpandMenuOpen,
    onToggleSidebar,
    newDashboardHref,
}: HeaderLogoSectionProps) {
    return (
        <div
            className={`header-left ${toggle ? "" : "active"} ${expandMenus || dataLayout === "layout-hovered" ? "expand-menu" : ""
                }`}
            onMouseLeave={onExpandMenu}
            onMouseOver={onExpandMenuOpen}
        >
            <Link href="/dashboard" className="logo logo-normal">
                <img src="assets/img/logo.png" alt="img" />
            </Link>
            <Link href="/dashboard" className="logo logo-white">
                <img src="assets/img/logo-white.png" alt="img" />
            </Link>
            <Link href="/dashboard" className="logo-small">
                <img src="assets/img/logo-small.png" alt="img" />
            </Link>
            <Link href={newDashboardHref} className="logo-small-white">
                <img src="assets/img/logo-small-white.png" alt="Img" />
            </Link>
            <Link
                id="toggle_btn"
                href="#"
                style={{
                    display:
                        pathname.includes("tasks") || pathname.includes("pos")
                            ? "none"
                            : pathname.includes("compose")
                                ? "none"
                                : "",
                }}
                onClick={onToggleSidebar}
            >
                <ChevronsLeft className="feather-16" />
            </Link>
        </div>
    );
}
