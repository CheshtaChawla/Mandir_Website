import React from "react";

import './HeaderMobile.js';
import './Header.css';
// import { useRef } from "react";
// import { NavLink } from "react-router-dom";

export default function Header() {

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header>
      <nav className="navbar bg-opacity-100 flex-center space-between">
        {/* flex flex-col mt-4 font-medium lg:flex-row lg:mt-0 justify-between items-center w-full lg:flex lg:w-auto  */}
        <ul className="flex justify-center items-center xl:space-x-28 xl:text-2xl lg:space-x-18 lg:text-2xl md:space-x-14 sm:space-x-14 text-xl lg:order-1 font-bellefair">

          <li onClick={() => scrollToSection("hero")}
            className=" border-b md:border-0 lg:border-0 hover:text-white lg:p-0 lg:w-auto text-white"
            style={{ cursor: 'pointer' }}
          >
            Home
          </li>
          <li onClick={() => scrollToSection("event")}
            className=" border-b md:border-0 lg:border-0 hover:text-white lg:p-0 lg:w-auto text-white"
            style={{ cursor: 'pointer' }}
          >
            Event
          </li>
          <li onClick={() => scrollToSection("charity")}
            className=" border-b md:border-0 lg:border-0 hover:text-white lg:p-0 lg:w-auto text-white"
            style={{ cursor: 'pointer' }}
          >
            Charity
          </li>
          <li onClick={() => scrollToSection("booking")}
            className=" border-b md:border-0 lg:border-0 hover:text-white lg:p-0 lg:w-auto text-white"
            style={{ cursor: 'pointer' }}
          >
            Booking
          </li>
          <li onClick={() => scrollToSection("committee")}
            className=" border-b md:border-0 lg:border-0 hover:text-white lg:p-0 lg:w-auto text-white"
            style={{ cursor: 'pointer' }}
          >
            Committee
          </li>
          <li onClick={() => scrollToSection("contact")}
            className=" border-b md:border-0 lg:border-0 hover:text-white lg:p-0 lg:w-auto text-white"
            style={{ cursor: 'pointer' }}
          >
            Contact Us
          </li>
          <li onClick={() => scrollToSection("about")}
            className=" border-b md:border-0 lg:border-0 hover:text-white lg:p-0 lg:w-auto text-white"
            style={{ cursor: 'pointer' }}
          >
            About Us
          </li>
        </ul>
      </nav>
    </header>
  );
}
