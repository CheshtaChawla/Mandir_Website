import '../component/responsiveness/Charity.css';
import React, { useEffect, useState, useRef } from 'react';

export default function CharityCard({image, buttonName, onButtonClick}) {

  return (
    <div>
      {/* This is the Charity Div */}
      <div>
        {/*Image and QR code scanner*/}
        <div className="border border-1 rounded-3xl border-black">
          <div className="slider-image relative">
            <img
              src={image}
              alt="Maha Shivratri"
              className="slider-image object-cover rounded-3xl"
            />
            {/* Donation buttons */}
            <div className="absolute inset-x-0 bottom-0">
            <button
                    onClick={onButtonClick}
                    className="custom-card-donate text-orange-500 mb-2 2xl:ml-10 xl:ml-9 lg:ml-8 md:ml-5 sm:ml-9 2xl:text-2xl xl:text-2xl lg:text-xl md:text-xl sm:text-xl border border-1 border-orange-500 bg-white rounded-2xl pt-1 pb-1"
                    style={{ width: "90%" }}
                  >
                    {buttonName}
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





