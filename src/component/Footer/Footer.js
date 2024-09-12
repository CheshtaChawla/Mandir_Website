import React from 'react'
// import {Link} from 'react-router-dom'
import whatsapp from "../Image/whatsapp_black.png"
import instagram from "../Image/instagram_black.png"
import facebook from "../Image/facebook_black.png"
import phone from "../Image/phone_black.png"
import location from "../Image/location_black.png"


export default function Footer() {

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    };

    return (
        <footer className=' flex bg-orange-400 w-full lg:w-full lg:flex-row' >
            <div className='flex flex-row w-1/3'>
                <div className='2xl:ml-40 xl:ml-40 lg:ml-20 md:ml-6 my-5' style={{ width: '300px' }}>  {/* this is the div for the  left side NAME and whatsapp and insta handel controller */}
                    <h1 className='text-xl'>श्री विष्णु अवतार बाबा रामदेव जी सभा, रामदरबार, चंडीगढ़ (रजि. 4528)</h1>
                    <div style={{ width: '300px', height: '1px' }} className='bg-black'></div>
                    <div className='flex flex-row'>
                        {/* <ul><li><link to=""></link></li></ul> */}
                        <a href="https://api.whatsapp.com/send?phone=+91-9988308752&text=Hey%20I%20have%20a%20query%20regarding%20the%20same"> <img className='mt-4 pr-1 mr-5' style={{ width: '35px', height: '35px' }} src={whatsapp} /></a>
                        <a><img className='mt-4  mr-5 rounded ml-1' style={{ width: '35px', height: '35px' }} src={instagram} /></a>
                        <a><img className='mt-2  mr-5' style={{ width: '50px', height: '50px' }} src={facebook} /></a>
                    </div>
                </div>
            </div>
            <div className=' flex flex-col w-1/3 justify-center'>  {/*this div is for the vav bar buttons */}
                <div className='2xl:ml-28 xl:ml-28 lg:ml-24 md:ml-20'>
                    <h1 className='font-bold'>PAGES</h1>
                    <div className='flex flex-row '>
                        <div className='flex flex-col justify-center'>
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

                        <div className='flex flex-col 2xl:ml-20 xl:ml-20 lg:ml-16 '>
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
                </div>
            </div>
            <div className='flex flex-col w-1/3'>   {/*this div is for the Contact us details*/}
                <div className='w-full'>
                    <h1 className='font-bold mt-3'>CONTACT US</h1>
                    <div className='flex flex-col'>
                        <div className='flex flex-row my-2'  >  {/* this is the div which contain phone number */}
                            <img src={phone} style={{ width: '20px', height: '20px' }} />
                            <h1 className='pl-1'>+91 8737880053</h1>
                        </div>
                        <div className='flex flex-row my-2 2xl:mr-40 xl:mr-20 lg:xl-20 md:mr-0' >  {/* this is the div which contain location */}
                            <img src={location} style={{ width: '20px', height: '20px' }} />
                            <h1 className='pl-1'>Ramdev Ji Temple, Near 229 Transit Camp, Phase 2, Ramdarbar, Chandigarh, 160002</h1>
                        </div>

                    </div>
                </div>
            </div>

        </footer>
    );
}