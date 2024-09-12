import React, { useEffect, useState, useRef } from 'react';
import BookingCard from "./Booking-Card"
import banner2 from "../../Image/banner-2.jpg"
import fetchBookingData from './fetchBookingData';

import '../component/responsiveness/Booking.css';

import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export default function BookingComponent() {

  const [activeModal, setActiveModal] = useState(null);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const getBookingData = async () => {
      const data = await fetchBookingData();  // fetches all documents from the events collection.
      setBookingData(data);
      
    };
    getBookingData();
  }, []);



  const handlePopUpButtonClick = () => {
    setActiveModal(true);
  };

  const handlePopUpButtonClose = () => {
    setActiveModal(null);
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    // slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  // let BookingData = [
  //   {image: banner2, heading: "Book Kirtan", id:1, details: "Maha Shivaratri is a Hindu festival celebrated annually in honour of the deity Shiva, between February and March. According to the Hindu calendar, the festival is observed on the fourteenth day of the dark half of the lunar month of Phalguna or Magha. Shiva, between February and March. According to the Hindu calendar, the festival is observed on the fourteenth day of the dark half of the lunar month of Phalguna or Magha. Maha Shivaratri is a Hindu festival celebrated annually in honour of the deity Shiva."},
  //   {image: banner2, heading: "Book", id:2, details: "Maha Shivaratri is a Hindu festival celebrated annually in honour of the deity Shiva, between February and March. According to the Hindu calendar, the festival is observed on the fourteenth day of the dark half of the lunar month of Phalguna or Magha. Shiva, between February and March. According to the Hindu calendar, the festival is observed on the fourteenth day of the dark half of the lunar month of Phalguna or Magha. Maha Shivaratri is a Hindu festival celebrated annually in honour of the deity Shiva."},
  //   {image: banner2, heading: "Kirtan", id:3, details: "Maha Shivaratri is a Hindu festival celebrated annually in honour of the deity Shiva, between February and March. According to the Hindu calendar, the festival is observed on the fourteenth day of the dark half of the lunar month of Phalguna or Magha. Shiva, between February and March. According to the Hindu calendar, the festival is observed on the fourteenth day of the dark half of the lunar month of Phalguna or Magha. Maha Shivaratri is a Hindu festival celebrated annually in honour of the deity Shiva."},
  // ]
  return (
    <>
      <div className="custom-booking-div ">  {/* we will use flex in the case of aligning more elements in the same line */}
        {/* This is the HEADING for the Booking Div */}
        <h1 className="custom-booking-heading text-5xl font-medium font-bellefair 2xl:mt-10 xl:mt-10 lg:mt-8 md:mt-8 sm:mt-10 lg:ml-40 lg:mr-40 md:ml-20 md:mr-20 sm:ml-14 sm:mr-14 ">
          Bookings
          <div className="custom-booking-underline 2xl:display-none xl:display-none lg:display-none md:display-none sm:display-none"></div>
        </h1>
        <div>
          <div className="custom-booking-slider rounded-2xl border border-orange-100 lg:mt-10 lg:ml-40 lg:mr-40 md:mt-5 md:ml-20 md:mr-20 sm:mt-5 sm:ml-14 sm:mr-14 ">
          <Slider {...settings}>
              {bookingData.map((data,index) => (
                <BookingCard
                key={index}
                buttonName={data.buttonText}
                image={data.image}
                heading={data.heading}
                paragraph={data.paragraph}
                onButtonClick={handlePopUpButtonClick}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>

  );
}
