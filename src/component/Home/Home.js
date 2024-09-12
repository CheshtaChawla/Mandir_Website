import React, { useImperativeHandle } from "react";

// import {useRef} from "react";
// import { Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom'

// import banner2 from "../Image/banner-2.jpg";
// import banner3 from "../Image/banner-3.webp";
// import banner4 from "../Image/banner-4.jpg";
// import Rectangle from "../Image/Rectangle.png"


import HeroSection from "../Home/component/HeroSection"
import EventComponent from "./component/Event-Component";
import CharityComponent from "./component/Charity-Component";
import BookingComponent from "./component/Booking-Component";
import CommitteeComponent from "./component/Committee-Component";
import ContactUs from "../Home/component/ContactUs";
import AboutUs from "./component/AboutUs";
import Footer from "../Footer/Footer";
import FooterMobile from "../Footer/FooterMobile";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from 'react-responsive';

export default function Home() {

  const isMobileFooter = useMediaQuery({ query: '(max-width: 767px)' });
  console.log(isMobileFooter);

  return (
    <div>

      <section id="hero"><HeroSection /></section>
      <section id="event"><EventComponent /></section>
      {/* <section id="charity"><CharityComponent /></section> */}
      <section id="booking"><BookingComponent /></section>
      <section id="committee"><CommitteeComponent /></section>
      <section id="contact"><ContactUs /></section>
      <section id="about"><AboutUs /></section>
      <div>
        {/* <FooterMobile /> */}
        {isMobileFooter ? <FooterMobile /> : <Footer />}
      </div>
      <Toaster position="top-center"/>
    </div>
  );
}
