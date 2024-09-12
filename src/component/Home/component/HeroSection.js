import React, {useState, useEffect, useImperativeHandle } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../../Header/Header";
import HeaderMobile from "../../Header/HeaderMobile";
import { useMediaQuery } from 'react-responsive';
import '../component/responsiveness/HeroSection.css';

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../../dbConfig/db"
export default function HeroSection() {

  const [banners, setBanners] = useState([]);
  
  useEffect(() => {
    // Assuming you have a method to fetch banners from Firestore in HeroSection as well
    const fetchBanners = async () => {
      const querySnapshot = await getDocs(collection(db, 'banners'));
      const bannersArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setBanners(bannersArray);
      console.log(bannersArray);
    };

    fetchBanners();
  }, []);  // []) here this means that the complete page will be read at once on opening of this page
  
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
  

  return (
    <>
      <div className="relative">  {/*This is the HERO section */}
        {/* <Slider  {...settings} className="w-full h-1/2" style={{ width: "100%" }} >
          <div>
            <img src={Image} alt="Background" className="w-full h-1/2" />
          </div>
          <div>
            <img src={Image} alt="Background" className="w-full h-1/2" />
          </div>
          <div>
            <img src={Image} alt="Background" className="w-full h-1/2" />
          </div>
        </Slider> */}
        <Slider {...settings} className="w-full h-1/2" style={{ width: "100%" }}>
          {banners.map((banner, index) => (
            <div key={index}>
              <img src={banner.image} alt={`Banner ${index}`} className="w-full h-1/2" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
                <div className="2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl">
                  <h1 className="custom-heroSection-heading font-bellefair lg:order-1 text-white 2xl:top-10 xl:top-10 lg:top-10 md:top-10 sm:top-10 2xl:pb-10 xl:pb-10 lg:pb-10 md:pb-10 sm:pb-10 text-center">
                    {banner.type}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {/* <img src={Image} alt="Background" className="w-full h-full object-cover"/> */}
        <div className="absolute top-0 left-0 w-full">
          <div>
            {isMobile ? <HeaderMobile /> : <Header />}
          </div>
        </div>
      </div>

    </>
  );
}