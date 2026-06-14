/* eslint-disable @next/next/no-img-element */

import { brandAssets, PRODUCT_NAME } from "@/lib/branding";

type BrandLogoProps = {
  variant?: "default" | "white" | "small" | "smallWhite";
  className?: string;
  width?: number;
  height?: number;
};

const variantSrc = {
  default: brandAssets.logo,
  white: brandAssets.logoWhite,
  small: brandAssets.logoSmall,
  smallWhite: brandAssets.logoSmallWhite,
} as const;

export default function BrandLogo({
  variant = "default",
  className,
  width,
  height,
}: BrandLogoProps) {
  return (
    <img
      src={variantSrc[variant]}
      alt={PRODUCT_NAME}
      className={className}
      width={width}
      height={height}
    />
  );
}
