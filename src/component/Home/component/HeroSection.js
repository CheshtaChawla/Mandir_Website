import React, { useImperativeHandle } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../../Header/Header";
import HeaderMobile from "../../Header/HeaderMobile";
import { useMediaQuery } from 'react-responsive';
import '../component/responsiveness/HeroSection.css';

import Image from "../../Image/Image.png";

export default function HeroSection() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 2000,
    // slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    useCSS: true,
    fade: true,
  };

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  console.log(isMobile)

  return (
    <>
      <div className="relative">  {/*This is the HERO section */}
        <Slider  {...settings} className="w-full h-1/2" style={{ width: "100%" }} >
          <div>
            <img src={Image} alt="Background" className="w-full h-1/2" />
          </div>
          <div>
            <img src={Image} alt="Background" className="w-full h-1/2" />
          </div>
          <div>
            <img src={Image} alt="Background" className="w-full h-1/2" />
          </div>
        </Slider>
        {/* <img src={Image} alt="Background" className="w-full h-full object-cover"/> */}
        <div className="absolute top-0 left-0 w-full">
          <div>
            {isMobile ? <HeaderMobile /> : <Header />}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
          {/* primary heading */}
          <div className="2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl">
            <h1 className="custom-heroSection-heading  font-bellefair lg:order-1 text-white 2xl:top-10 xl:top-10 lg:top-10 md:top-10 sm:top-10 2xl:pb-10 xl:pb-10 lg:pb-10 md:pb-10 sm:pb-10 text-center">
              Shri Vishnu Avatar Baba Ramdev Ji Sabha, Regd. 4528
            </h1>
          </div>
        </div>
      </div>

    </>
  );
}