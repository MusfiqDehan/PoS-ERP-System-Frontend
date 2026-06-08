"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { galleryImages, lightboxSlides } from "./galleryImages";

type ImageGalleryProps = {
  open1: boolean;
  setOpen1: (value: boolean) => void;
};

export default function ImageGallery({ open1, setOpen1 }: ImageGalleryProps) {
  return (
                        <>
                        <h5 className="mb-3">Images</h5>
                        <div className="row g-3">
                            <Lightbox
                                open={open1}
                                close={() => setOpen1(false)}
                                slides={lightboxSlides}
                            />
                            {galleryImages.map((src, index) => (
                            <div key={src} className="col-xl-2 col-md-4 col-6">
                                <Link
                                    href={index === galleryImages.length - 1 ? "#x" : "#"}
                                    data-fancybox="gallery"
                                    className="gallery-item"
                                    onClick={() => setOpen1(true)}
                                >
                                    <img
                                        src={src}
                                        className="rounded"
                                        alt="img"
                                    />
                                </Link>
                            </div>
                            ))}
                        </div>
                        </>
  );
}
