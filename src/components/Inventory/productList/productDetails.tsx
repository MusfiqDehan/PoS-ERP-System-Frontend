"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const details = [
  { label: "Product", value: "Macbook pro" },
  { label: "Category", value: "Computers" },
  { label: "Sub Category", value: "None" },
  { label: "Brand", value: "None" },
  { label: "Unit", value: "Piece" },
  { label: "SKU", value: "PT0001" },
  { label: "Minimum Qty", value: "5" },
  { label: "Quantity", value: "50" },
  { label: "Tax", value: "0.00 %" },
  { label: "Discount Type", value: "Percentage" },
  { label: "Price", value: "1500.00" },
  { label: "Status", value: "Active" },
  {
    label: "Description",
    value:
      "Designed for professionals, it offers smooth multitasking and high-end graphics capability.",
  },
];

const slides = [
  { img: "assets/img/products/product69.jpg", name: "macbookpro.jpg", size: "581kb" },
  { img: "assets/img/products/product69.jpg", name: "macbookpro.jpg", size: "581kb" },
];

const ProductDetailsComponent = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1170, settings: { slidesToShow: 1 } },
      { breakpoint: 800, settings: { slidesToShow: 1 } },
      { breakpoint: 0, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="mb-[1.5rem]">
          <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Product Details</h4>
          <p className="m-0 text-[14px] font-medium text-[#646B72]">Full details of a product</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#f1f1f1] pb-4 mb-4">
                <img
                  src="/nextjs/template/assets/img/barcode/barcode1.png"
                  className="max-h-[60px]"
                  alt="barcode"
                />
                <Link
                  href="#"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#e7e7e7] text-[#212B36] hover:border-[#0ac79e] hover:text-[#0ac79e] transition-colors"
                >
                  <i className="ti ti-printer text-[18px]" />
                </Link>
              </div>
              <ul className="divide-y divide-[#f1f1f1]">
                {details.map((d) => (
                  <li key={d.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-2.5">
                    <span className="text-[14px] font-semibold text-[#212B36]">{d.label}</span>
                    <span className="sm:col-span-2 text-[14px] text-[#646B72]">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 sm:p-5">
              <Slider ref={sliderRef} {...settings}>
                {slides.map((s, i) => (
                  <div key={i} className="text-center">
                    <img
                      src={s.img}
                      alt="img"
                      className="mx-auto rounded-md mb-3 max-h-[260px] object-contain"
                    />
                    <h4 className="text-[15px] font-semibold text-[#212B36]">{s.name}</h4>
                    <h6 className="text-[13px] text-[#646B72]">{s.size}</h6>
                  </div>
                ))}
              </Slider>

              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  onClick={() => sliderRef.current?.slickPrev()}
                  className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-[#e7e7e7] text-[#646B72] hover:border-[#0ac79e] hover:text-[#0ac79e] transition-colors"
                >
                  <i className="fa fa-chevron-left" />
                </button>
                <button
                  type="button"
                  onClick={() => sliderRef.current?.slickNext()}
                  className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-[#e7e7e7] text-[#646B72] hover:border-[#0ac79e] hover:text-[#0ac79e] transition-colors"
                >
                  <i className="fa fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
