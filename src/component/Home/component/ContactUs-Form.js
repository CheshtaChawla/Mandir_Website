import whatsapp from "../../Image/whatsapp.png"
import instagram from "../../Image/instagram.png"
import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
import toast from "react-hot-toast";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../dbConfig/db";

import '../component/responsiveness/ContactUs.css';

export default function Form() {

    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowForm(true);
    };
  
    const handleClose = () => {
      console.log("handleClose called");
  
      setShowForm(false);
  };

    const handleSubmit = async (e) => {                  //these are the events in react //handleSubmit -> is an asynchronous function that handles the form submission.
        e.preventDefault();                              //preventDefault is used so that the complete page do not get refresh every time we click onto the button
        console.log("clicked");
        
        const formData = {
            fullName: e.target.fullName.value,
            phoneNumber: e.target.phoneNumber.value,
            message: e.target.message.value
        };

       

        try {
            const docRef = await addDoc(collection(db, "contact_form"), formData);

            //Axios helps developers make HTTP requests from NodeJS, If the request is successful, you will receive a response with the data requested. If the request fails, you will get an error.
            //await: as we know the database reed the data line by line and during axios action to take place it take some time ..so await fuction stops the process of further reading the code till the axios function complete its working
        handleClose();
        toast.success('Successfully submitted the form!');

        } catch (error) {
            console.error('There was an error!', error);
            toast.error("There was an error in submitting the Contact-Us form.");
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-4 mb-2">
                    <div>
                        <label htmlFor="fullName" className="custom block">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className="block w-full border border-1 border-black rounded" 
                            required/>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="custom block">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            className="block w-full border border-1 border-black rounded"
                            required/>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="message" className="custom block">
                        Message
                    </label>
                    <input
                        type="text"
                        id="message"
                        className="block w-full border border-1 border-black mt-1 rounded"
                        style={{ height: '100px', overflowX: 'scroll' }}
                        required/>
                </div>
                <div className="pt-2 mb-3">
                    <button 
                    // onClick={(e) => { e.preventDefault();}}
                    onClick={handleButtonClick}
                    className="bg-orange-400 w-full text-xl rounded 2xl:mt-8 2xl:mb-5 xl:mt-1 xl:mb-1 lg:mt-5 lg:mb-1 ">
                        {/* here we directly cant write onc;ick{()=> window.location.href="...."}  Because when a submit button is taken inside the form tag by default it will submit the form and reresh the page... so to take out the functionality fron the default process we have to add (e) as event and tell the process that onClick={(e) => { e.preventDefault(); .... on clicking this we have to to do the process which is mentioned and prevent it from it by-default functionality*/}
                        Submit
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex flex-row mt-2 border border-green-600 p-1 justify-center" >
                        <div>
                            <img className="sm:block hidden" style={{ width: '30px' }} src={whatsapp} />
                        </div>
                        <button className="pl-2 lg:pl-0 text-green-600 ">&nbsp; Join WhatsApp Group</button>
                    </div>
                    <div className="flex flex-row mt-2 justify-center" style={{ border: '2px solid transparent', borderImage: 'linear-gradient(to right, purple, pink, yellow) 1' }}>
                        <div>
                            <img className="pt-1 sm:block hidden" style={{ height: '30px', width: '30px' }} src={instagram} />
                        </div>
                        <button className="pl-2 lg:pl-0 text-pink-600">&nbsp; Follow on Instagram</button>
                    </div>
                </div>
                {/* {showForm && onClose={handleClose} } */}

            </form>
        </>
    );
}

  
