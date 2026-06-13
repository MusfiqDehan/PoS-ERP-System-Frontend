"use client";

import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderQuickAdd from "./header/HeaderQuickAdd";
import HeaderSearch from "./header/HeaderSearch";
import HeaderStoreSelector from "./header/HeaderStoreSelector";
import HeaderUtilityActions from "./header/HeaderUtilityActions";

export default function Header() {
    const route = all_routes;
    const pathname = usePathname();

    const [isFullscreen, setIsFullscreen] = useState(false);
    const flagImage = "assets/img/flags/us-flag.svg";

    const exclusionArray = [
        "/reactjs/template/dream-pos/index-three",
        "/reactjs/template/dream-pos/index-one",
    ];
    const shouldHideHeader = exclusionArray.includes(pathname);

    const sidebarOverlay = (): void => {
        document?.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
        document?.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
        document?.querySelector("html")?.classList?.toggle("menu-opened");
    };

    const toggleFullscreen = (): void => {
        if (!isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(() => undefined);
                setIsFullscreen(true);
            }
            return;
        }

        if (document.exitFullscreen && document.fullscreenElement) {
            document.exitFullscreen().catch(() => undefined);
        }
        setIsFullscreen(false);
    };

    useEffect(() => {
        document?.querySelector(".main-wrapper")?.classList?.remove("slide-nav");
        document?.querySelector(".sidebar-overlay")?.classList?.remove("opened");
        document?.querySelector("html")?.classList?.remove("menu-opened");
    }, [pathname]);

    if (shouldHideHeader) {
        return null;
    }

    return (
        <div className="header figma-top-header">
            <div className="main-header">
                <Link
                    id="mobile_btn"
                    className="mobile_btn"
                    href="#"
                    onClick={sidebarOverlay}
                >
                    <span className="bar-icon">
                        <span />
                        <span />
                        <span />
                    </span>
                </Link>

                <div className="figma-header-group figma-header-group--left">
                    <HeaderStoreSelector />
                    <HeaderSearch />
                    <HeaderQuickAdd route={route} />
                </div>

                <ul className="nav user-menu figma-header-group figma-header-group--right">
                    <HeaderUtilityActions
                        route={route}
                        flagImage={flagImage}
                        isFullscreen={isFullscreen}
                        onToggleFullscreen={toggleFullscreen}
                    />
                </ul>

                <div className="dropdown mobile-user-menu">
                    <Link
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="fa fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" href="profile">
                            My Profile
                        </Link>
                        <Link className="dropdown-item" href="generalsettings">
                            Settings
                        </Link>
                        <Link className="dropdown-item" href="signin">
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
