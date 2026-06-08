"use client";
/* eslint-disable @next/next/no-img-element */

import { X } from "react-feather";
import Link from "next/link";

type ImagePreviewProps = {
  src: string;
  alt: string;
  visible: boolean;
  onRemove: () => void;
};

export default function ImagePreview({
  src,
  alt,
  visible,
  onRemove,
}: ImagePreviewProps) {
  if (!visible) return null;

  return (
                              <div className="phone-img">
                                <img src={src} alt={alt} />
                                <Link href="#">
                                  <X
                                    className="x-square-add remove-product"
                                    onClick={onRemove}
                                  />
                                </Link>
                              </div>
  );
}
