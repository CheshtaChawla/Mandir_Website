import React, { useState, useRef, useEffect } from 'react';
import Form from './form';

import Circle from "../../Image/Circle.png";
import Slider from "react-slick";
// import { useMediaQuery } from 'react-responsive';

import babaJi from "../../Image/babaJi.webp"
import CommitteeCard from "../component/Committee-Cards";
import fetchCommitteeData from './fetchCommitteeData';

import '../component/responsiveness/Committee.css';
import { Fade } from 'react-bootstrap';

export default function Committee() {


  const [activeModal, setActiveModal] = useState(null);
  const [committeeData, setCommitteeData] = useState([]);

  useEffect(() => {
    const getCommitteeData = async () => {
      const data = await fetchCommitteeData();  // fetches all documents from the events collection.
      setCommitteeData(data);
      
    };
    getCommitteeData();
  }, []);



  const handlePopUpButtonClick = () => {
    setActiveModal(true);
  };

  const handlePopUpButtonClose = () => {
    setActiveModal(null);
  };


  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    // fade:true,  ERROR -> fade option in the slider is designed to work with a single slide at a time. When fade is enabled, it disables the "sliding" functionality, and instead of multiple slides being displayed at once (as you have with slidesToShow: 3), it transitions between individual slides using a fade effect.
    slidesToShow: 3, // Keep 3 slides in view
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // 3 seconds interval
    pauseOnHover: true, // Optional: Pauses autoplay on hover

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };




  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
      setShowForm(true);
  };

  const handleClose = () => {
    // console.log("handleClose called");
    setShowForm(false);

    // setShowForm(false);
};
  return (
    <>
      <div className="custom-complete-committee-div">
        <div className="custom-committee-heading-div lg:ml-40 lg:mr-20 md:ml-20 md:mr-20 sm:ml-14 sm:mr-14 2xl:mb-4 xl:mb-4 lg:mb-0 md:mb-0 sm:mb-0">
          {/*This is the events heading*/}
          <img src={Circle} className="custom-committee-circle order-2 absolute" style={{ zIndex: -1 }} />  {/* Here absolute position is given so that image allow heading to come over it */}
          <h1 className="custom-committee-heading order-2 text-5xl font-medium font-bellefair 2xl:ml-12 xl:ml-12 lg:ml-12 md:ml-12 sm:ml-12 2xl:mt-10 xl:mt-10 lg:mt-10 md:mt-10 sm:mt-10 pt-10">
            Committee
            <div className="custom-committee-underline 2xl:display-none xl:display-none lg:display-none md:display-none sm:display-none"></div>
          </h1>
        </div>
        <div className="2xl:ml-40 2xl:mr-40 xl:ml-40 xl:mr-40 lg:ml-40 lg:mr-40 md:ml-20 md:mr-20 sm:ml-10 sm:mr-10">
        <Slider {...settings}>
  {committeeData.map((data, index) => (
    <div key={index}>
      <CommitteeCard
      className=""
        image={data.image}
        title={data.title}
        text={data.subtitle}
        onButtonClick={handlePopUpButtonClick}
      />
    </div>
  ))}
</Slider>
        
        </div>
        <div className="custom-joinMembership-button-div 2xl:pt-10 xl:pt-8 lg:pt-8 md:pt-6 sm:pt-6">
          <div className="flex flex-row justify-center">
            <button className='border border-orange-500 pt-2 pb-2 pl-2 pr-2 rounded rounded-md' onClick={handleButtonClick}> 
              Join Membership 
            </button> 
          </div>
        </div>
        {showForm && <Modal onClose={handleClose} />}
      </div>
    </>
  );
}

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
        <Form handleClose={onClose} />
    </div>
</div>
  );
}
