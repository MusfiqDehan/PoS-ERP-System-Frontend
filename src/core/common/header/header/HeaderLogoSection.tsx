/* eslint-disable @next/next/no-img-element */

import BrandLogo from "@/components/brand/BrandLogo";
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
      className={`header-left ${toggle ? "" : "active"} ${
        expandMenus || dataLayout === "layout-hovered" ? "expand-menu" : ""
      }`}
      onMouseLeave={onExpandMenu}
      onMouseOver={onExpandMenuOpen}
    >
      <Link href="/dashboard" className="logo logo-normal">
        <BrandLogo />
      </Link>
      <Link href="/dashboard" className="logo logo-white">
        <BrandLogo variant="white" />
      </Link>
      <Link href="/dashboard" className="logo-small">
        <BrandLogo variant="small" />
      </Link>
      <Link href={newDashboardHref} className="logo-small-white">
        <BrandLogo variant="smallWhite" />
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
