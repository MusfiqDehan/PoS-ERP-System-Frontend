"use client";
/* eslint-disable-next-line @next/next/no-img-element */

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { SidebarData } from "../../json/siderbar_data";
import { all_routes } from "@/data/all_routes";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { brandAssets, PRODUCT_NAME } from "@/lib/branding";
import { ChevronsLeft } from "react-feather";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { filterSidebarByAccess } from "@/data/rolePermissions";
import { useAuth } from "@/providers/auth-provider";

export default function Sidebar() {
  const route = all_routes;
  const pathname = usePathname();
  const { tier } = useAuth();
  const visibleSidebar = filterSidebarByAccess(SidebarData as any[], tier);
  const sidebarDateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");
  const [toggle, SetToggle] = useState(false);
  const [expandMenus, setExpandMenus] = useState(false);
  const [dataLayout, setDataLayout] = useState("default");

  const toggleSidebar = (title: string): void => {
    if (title === subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem: string): void => {
    if (subitem === subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };

  const handlesidebar = (): void => {
    document.body.classList.toggle("mini-sidebar");
    SetToggle((current: boolean) => !current);
  };

  const expandMenu = (): void => {
    setExpandMenus(false);
    document.body.classList.remove("expand-menu");
  };

  const expandMenuOpen = (): void => {
    setExpandMenus(true);
    document.body.classList.add("expand-menu");
  };

  useEffect(() => {
    // Update the DOM based on `dataLayout` and `expandMenus`
    document.body.classList.toggle("expand-menu", expandMenus || dataLayout === "layout-hovered");
  }, [expandMenus, dataLayout]);


  return (
    <>
      <div
        className={`sidebar figma-sidebar ${toggle ? "" : "active"} ${expandMenus || dataLayout === "layout-hovered" ? "expand-menu" : ""
          }`}
        id="sidebar"
        onMouseLeave={expandMenu}
        onMouseOver={expandMenuOpen}
      >
        <>
          <div className="sidebar-branding">
            <div className="sidebar-branding__content">
              <Link href={route.newdashboard} className="sidebar-branding__logo-link">
                <ImageWithBasePath
                  src={brandAssets.logo}
                  alt={PRODUCT_NAME}
                  width={128}
                  height={28}
                  className="sidebar-branding__logo"
                />
              </Link>
              <p className="sidebar-branding__date">{sidebarDateLabel}</p>
            </div>
            <Link
              id="toggle_btn"
              className="sidebar-branding__toggle"
              href="#"
              onClick={handlesidebar}
              aria-label="Toggle sidebar"
            >
              <i data-feather="chevrons-left" />
              <ChevronsLeft className="feather-16" />
            </Link>
          </div>
        </>
        <PerfectScrollbar>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {visibleSidebar?.map((mainLabel: any, index: any) => (
                  <li className="submenu-open" key={index}>
                    <h6 className="submenu-hdr">{mainLabel?.label}</h6>
                    <ul>
                      {mainLabel?.submenuItems?.map((title: any, i: any) => {
                        const link_array: any[] = [];
                        title?.submenuItems?.map((link: any) => {
                          link_array.push(link?.link);
                          if (link?.submenu) {
                            link?.submenuItems?.map((item: any) => {
                              link_array.push(item?.link);
                            });
                          }
                          return link_array;
                        });
                        title.links = link_array;
                        return (
                          <React.Fragment key={i}>
                            <li
                              className={`submenu ${!title?.submenu && pathname === title?.link
                                  ? "custom-active-hassubroute-false"
                                  : ""
                                }`}
                            >
                              <Link
                                href={title?.link || "#"}
                                target={title?.target || undefined}
                                rel={
                                  title?.target === "_blank"
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                onClick={() => toggleSidebar(title?.label)}
                                className={`${subOpen === title?.label ? "subdrop" : ""
                                  } ${title?.links?.includes(pathname)
                                    ? "subdrop active"
                                    : ""
                                  }`}
                              >
                                <i className={`ti ti-${title.icon} me-2`}></i>
                                <span className="custom-active-span">
                                  {(title?.label)}
                                </span>
                                {title?.submenu && (
                                  <span className="menu-arrow" />
                                )}
                              </Link>
                              <ul
                                style={{
                                  display:
                                    subOpen === title?.label ? "block" : "none",
                                }}
                              >
                                {title?.submenuItems?.map(
                                  (item: any, titleIndex: any) => (
                                    <li
                                      className="submenu submenu-two"
                                      key={titleIndex}
                                    >
                                      <Link
                                        href={item?.link || "#"}
                                        className={`${item?.submenuItems
                                            ?.map((link: any) => link.link)
                                            .includes(pathname) ||
                                            item?.link === pathname
                                            ? "active"
                                            : ""
                                          } ${subsidebar === item?.label
                                            ? "subdrop"
                                            : ""
                                          }`}
                                        target={item?.target || undefined}
                                        rel={
                                          item?.target === "_blank"
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                        onClick={() =>
                                          toggleSubsidebar(item?.label)
                                        }
                                      >
                                        <span className="sidebar-subitem-icon" aria-hidden="true">
                                          <i className="ti ti-point-filled" />
                                        </span>
                                        <span className="sidebar-subitem-label">
                                          {item?.label}
                                        </span>
                                        {item?.submenu && (
                                          <span className="menu-arrow inside-submenu" />
                                        )}
                                      </Link>
                                      <ul
                                        style={{
                                          display:
                                            subsidebar === item?.label
                                              ? "block"
                                              : "none",
                                        }}
                                      >
                                        {item?.submenuItems?.map(
                                          (items: any, subIndex: any) => (
                                            <li key={subIndex}>
                                              <Link
                                                href={items?.link || "#"}
                                                className={`${subsidebar === items?.label
                                                    ? "submenu-two subdrop"
                                                    : "submenu-two"
                                                  } ${items?.submenuItems
                                                    ?.map(
                                                      (link: any) => link.link
                                                    )
                                                    .includes(pathname) ||
                                                    items?.link === pathname
                                                    ? "active"
                                                    : ""
                                                  }`}
                                                target={items?.target || undefined}
                                                rel={
                                                  items?.target === "_blank"
                                                    ? "noopener noreferrer"
                                                    : undefined
                                                }
                                              >
                                                <span className="sidebar-subitem-icon" aria-hidden="true">
                                                  <i className="ti ti-point-filled" />
                                                </span>
                                                <span className="sidebar-subitem-label">
                                                  {items?.label}
                                                </span>
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </li>
                                  )
                                )}
                              </ul>
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </>
  );
}
