"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { channelSliderSettings } from "./sliderSettings";

export default function PopularChannels() {
  return (
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <h5 className="me-2">Popular Channels</h5>
                        <div className="owl-nav custom-nav nav-control" />
                      </div>
                      <Slider {...channelSliderSettings} className="channels-slider owl-carousel">
                        <Link href="#">
                          <img src="assets/img/icons/channel-01.svg" alt="Img" />
                        </Link>
                        <Link href="#">
                          <img src="assets/img/icons/channel-02.svg" alt="Img" />
                        </Link>
                        <Link href="#">
                          <img src="assets/img/icons/channel-03.svg" alt="Img" />
                        </Link>
                        <Link href="#">
                          <img src="assets/img/icons/channel-04.svg" alt="Img" />
                        </Link>
                        <Link href="#">
                          <img src="assets/img/icons/channel-05.svg" alt="Img" />
                        </Link>
                        <Link href="#">
                          <img src="assets/img/icons/channel-06.svg" alt="Img" />
                        </Link>
                        <Link href="#">
                          <img src="assets/img/icons/channel-07.svg" alt="Img" />
                        </Link>
                        <Link href="#">
                          <img src="assets/img/icons/channel-08.svg" alt="Img" />
                        </Link>
                      </Slider>
                    </div>
                  </div>
  );
}
