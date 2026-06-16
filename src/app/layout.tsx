import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./tailwind.css";
import "./global.scss";
import "../style/css/feather.css";
import "../style/css/line-awesome.min.css";
import "../style/icons/tabler-icons/webfont/tabler-icons.css";
import "../style/icons/fontawesome/css/fontawesome.min.css";
import "../style/icons/fontawesome/css/all.min.css";
import "../style/fonts/feather/css/iconfont.css";
import BootstrapJsLoader from "../components/bootstrap-js/BootstrapJsLoader";
import {
  BRAND_THEME_COLOR,
  brandAssets,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME,
} from "@/lib/branding";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: PRODUCT_NAME,
  title: {
    default: `${PRODUCT_NAME} - Retail POS & Inventory Management`,
    template: `%s · ${PRODUCT_NAME}`,
  },
  description: PRODUCT_DESCRIPTION,
  keywords: [
    "POS",
    "inventory management",
    "retail",
    "admin dashboard",
    "invoicing",
    "stock",
    "Bangladesh",
  ],
  authors: [{ name: PRODUCT_NAME }],
  icons: {
    icon: [
      { url: `/${brandAssets.iconSvg}`, type: "image/svg+xml" },
      { url: `/${brandAssets.favicon}`, type: "image/png", sizes: "32x32" },
    ],
    shortcut: `/${brandAssets.favicon}`,
    apple: `/${brandAssets.favicon}`,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: BRAND_THEME_COLOR,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.className}>
      <body className={urbanist.className}>
        {children}
        <BootstrapJsLoader />
      </body>
    </html>
  );
}
