import React, { useState } from 'react';
import whatsapp from "../Image/whatsapp_black.png"
import instagram from "../Image/instagram_black.png"
import facebook from "../Image/facebook_black.png"
import phone from "../Image/phone_black.png"
import location from "../Image/location_black.png"



export default function FooterMobile() {

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    };
    return (
        <footer className='flex flex-col text-black bg-orange-400 w-full text-center'>
            <div>
                <div>
                    <h1 className='md:text-2xl sm: text-xl font-bold ml-10 mr-10 mt-10 mb-2'>Shri Vishnu Avatar Baba Ramdev Ji Sabha, Regd. 4528</h1>
                </div>
                <div className='items-center justify-center flex flex-row'>
                    <a href="https://api.whatsapp.com/send?phone=+91-9988308752&text=Hey%20I%20have%20a%20query%20regarding%20the%20same"> <img className='mt-4 pr-1 mr-5' style={{ width: '35px', height: '35px' }} src={whatsapp} /></a>
                    <a><img className='mt-4  mr-5 rounded ml-1' style={{ width: '35px', height: '35px' }} src={instagram} /></a>
                    <a><img className='mt-4  mr-5' style={{ width: '50px', height: '50px' }} src={facebook} /></a>
                </div>
            </div>

            <div className='mt-6'>
                <h1 className='font-bold'>PAGES</h1>
                <div className='flex flex-row items-center justify-center'>
                    <div className='flex flex-col items-center'>
                        <ul>
                            <li onClick={() => scrollToSection("hero")} className='my-1 hover:underline' style={{ cursor: 'pointer' }}>
                                Home
                            </li>
                            <li onClick={() => scrollToSection("event")} className='my-1 hover:underline' style={{ cursor: 'pointer' }}>
                                Events
                            </li>
                            {/* <li onClick={() => scrollToSection("charity")} className='my-1 hover:underline' style={{ cursor: 'pointer' }}>
                                Charity
                            </li> */}
                            <li onClick={() => scrollToSection("booking")} className='my-1 hover:underline' style={{ cursor: 'pointer' }}>
                                Booking
                            </li>
                          
                        </ul>
                    </div>

                    <div className='flex flex-col items-center ml-10'>
                        <ul>
                            
                            <li onClick={() => scrollToSection("committee")} className='my-1 hover:underline' style={{ cursor: 'pointer' }}>
                                Committee
                            </li>
                            <li onClick={() => scrollToSection("contact")} className='my-1 hover:underline' style={{ cursor: 'pointer' }}>
                                ContactUs
                            </li>
                            <li onClick={() => scrollToSection("about")} className='my-1 hover:underline' style={{ cursor: 'pointer' }}>
                                AboutUs
                            </li>
                            
                        </ul>
                    </div>
                </div>

                <div>
                    <h1 className='font-bold mt-6'>CONTACT US</h1>
                    <div className='flex flex-col items-center justify-center '>
                        <div className='flex flex-row my-2'  >  {/* this is the div which contain phone number */}
                            <img src={phone} style={{ width: '20px', height: '20px' }} />
                            <h1 className='pl-2'>+91 8737880053</h1>
                        </div>
                        <div className='flex flex-row mb-10 ml-10 mr-10'>  {/* this is the div which contain location */}
                            <img src={location} style={{ width: '20px', height: '20px' }} />
                            <h1>Ramdev Ji Temple, Near 229 Transit Camp, Phase 2, Ramdarbar, Chandigarh, 160002</h1>
                        </div>

                    </div>
                </div>
            </div>
        </footer >
    )
};