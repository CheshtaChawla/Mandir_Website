import React, { useState } from 'react';
import './Header.css';


const HeaderMobile = () => {

  const [menuOpen, setMenuOpen] = useState(false);  //menuopen is a state variable of boolean type that will just indicate about the mobile menu is open or close..true if the menu is open and false if the menu is closed...and it is initiallised as false bcz i want to keep the mobile_navbar = closed (false)

  const toggleMenu = () => {
    console.log("clicked") //toggle menu is a function that changes the state of the menu open - variable state
    setMenuOpen((prev) => !prev);
    console.log(menuOpen)  //menuopen is initially set to false.. setMenuOpen is used to set the valuse from false to true and vice a versa
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>  {/* if the menuopen is true the open the mobile navbar otherwise do nothing */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="elements"></div>
        <div className="elements"></div>
        <div className="elements"></div>  {/* this 3 elements means 3 horizontal lines which represents the toggle button */}
      </div>
      <div className={`mobile-navbar-list ${menuOpen ? 'open' : ''}`}>
        {menuOpen ?
          <div>
            <ul className='mobile-navbar-list'>
              <li className='border-b-2 border-orange-300 pl-2 pr-2 flex justify-center items-center' onClick={() => { scrollToSection("hero"); toggleMenu() }} >
                Home
              </li>
              <li className='border-b-2 border-orange-300 pl-2 pr-2 flex justify-center items-center' onClick={() => scrollToSection("event")}>
                Event
              </li>
              {/* <li className='border-b-2 border-orange-300 pl-2 pr-2 flex justify-center items-center' onClick={() => scrollToSection("charity")}>
                Charity
              </li> */}
              <li className='border-b-2 border-orange-300 pl-2 pr-2 flex justify-center items-center' onClick={() => scrollToSection("booking")}>
                Booking
              </li>
              <li className='border-b-2 border-orange-300 pl-2 pr-2 flex justify-center items-center' onClick={() => scrollToSection("committee")}>
                Committee
              </li>
              <li className='border-b-2 border-orange-300 pl-2 pr-2 flex justify-center items-center' onClick={() => scrollToSection("contact")}>
                Contact Us
              </li>
              <li className='border-b-2 border-orange-300 pl-2 pr-2 flex justify-center items-center' onClick={() => scrollToSection("about")}>
                About Us
              </li>
            </ul>
          </div>
          : ''}
      </div>
    </nav>
  );
};


export default HeaderMobile;
