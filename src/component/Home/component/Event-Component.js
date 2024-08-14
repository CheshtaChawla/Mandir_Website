import EventCard from "./Event-Card";
import Slider from "react-slick";
// import MahaShivratri from "../../Image/MahaShivratri.jpg";
// import Diwali from "../../Image/diwalievent.jpg";
// import Holi from "../../Image/holievent.jpg";
import Circle from "../../Image/Circle.png";

import '../component/responsiveness/Event.css';

import React, { useEffect, useState, useRef } from 'react';
import DonatePopUp from "../component/DonatePopUp";
import fetchEventData from "../component/fetchEventData"; 
export default function EventComponent() {

//In event slider:if only one slide data is provided at that time the code become unwell and start showing 3 slides with same data..so try to give atleast 2 slides data at at time

  const [activeModal, setActiveModal] = useState(null);

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const getEventData = async () => {
      const data = await fetchEventData();  // fetches all documents from the events collection.
      setEventData(data);
      // console.log(eventData);
    };
    getEventData();
  }, []);

  const handlePopUpButtonClick = () => {
    setActiveModal(true);
    console.log("Button clicked");
  };

  const handlePopUpButtonClose = () => {
    setActiveModal(null);
  };



  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  // let eventData = [
  //   {
  //     event_name: "Maha Shivratri",
  //     event_date: "10 JAN 2024",
  //     event_time: "11:00 AM",
  //     event_image: Holi,
  //     event_description: `Brief: Maha Shivaratri is a Hindu festival celebrated annually
  //     in honour of the deity Shiva, between February and
  //     March. According to the Hindu calendar, the festival is
  //     observed on the fourteenth day of the dark half of the lunar
  //     month of Phalguna or Magha. Shiva, between February and
  //     March. According to the Hindu calendar, the festival is
  //     observed on the fourteenth day of the dark half of the lunar
  //     month of Phalguna or Magha.`,

  //   },
  //   {
  //     event_name: "Diwali",
  //     event_date: "10 NOV 2024",
  //     event_time: "10:00 AM",
  //     event_image: Diwali,
  //     event_description: `Brief: Maha Shivaratri is a Hindu festival celebrated annually
  //     in honour of the deity Shiva, between February and
  //     March. According to the Hindu calendar, the festival is
  //     observed on the fourteenth day of the dark half of the lunar
  //     month of Phalguna or Magha. Shiva, between February and
  //     March. According to the Hindu calendar, the festival is
  //     observed on the fourteenth day of the dark half of the lunar
  //     month of Phalguna or Magha.`,

  //   },
  //   {
  //     event_name: "Holi Phag",
  //     event_date: "10 March 2024",
  //     event_time: "09:00 AM",
  //     event_image: Holi,
  //     event_description: `Brief: Maha Shivaratri is a Hindu festival celebrated annually
  //     in honour of the deity Shiva, between February and
  //     March. According to the Hindu calendar, the festival is
  //     observed on the fourteenth day of the dark half of the lunar
  //     month of Phalguna or Magha. Shiva, between February and
  //     March. According to the Hindu calendar, the festival is
  //     observed on the fourteenth day of the dark half of the lunar
  //     month of Phalguna or Magha.`,

  //   }
  // ];

  return (
    <>
      <div className="custom-complete-event-div">
        <div className="custom-event-div">
          {/*This is the events heading*/}
          <div className="custom-event-heading-div lg:ml-40 lg:mr-20  md:ml-20 md:mr-20 sm:ml-14 sm:mr-14 2xl:mb-4 xl:mb-4 lg:mb-4 md:mb-4 sm:mb-4">
            <img src={Circle} className="custom-event-circle order-2 absolute" style={{ zIndex: -1 }} />
            <h1 className="custom-event-heading text-5xl font-medium font-bellefair 2xl:ml-12 xl:ml-12 lg:ml-12 md:ml-12 sm:ml-12 2xl:mt-10 xl:mt-10 lg:mt-10 md:mt-10 sm:mt-10 pt-10">
              Events
              <div className="custom-event-underline 2xl:display-none xl:display-none lg:display-none md:display-none sm:display-none"></div>
            </h1>
          </div>
        </div>
        <Slider {...settings} >
          {eventData.map((data,index) => (
            <EventCard 

            key={index}
            name={data.event_name}
            startDate={data.event_start_date}
            endDate={data.event_end_date}
            startTime={data.event_start_time}
            endTime={data.event_end_time}
            image={data.event_image} // Holi is for Default image if event_image is not available
            description={data.event_description}
            onButtonClick={handlePopUpButtonClick}
            />
          ))}
        </Slider>
        {activeModal !== null && (
        <Modal onClose={handlePopUpButtonClose} />
      )}
      </div>
    </>

  );
};

function Modal({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative" ref={modalRef}>
        <button className="absolute top-0 right-0 m-4 text-gray-600" onClick={onClose}>
          &times;
        </button>
        <DonatePopUp handlePopUpButtonClose={onClose} />
      </div>
    </div>
  );
}
