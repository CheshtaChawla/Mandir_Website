import whatsapp from "../../Image/whatsapp.png";
import instagram from "../../Image/instagram.png";
import React, { useState, useRef } from 'react';
import toast from "react-hot-toast";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../dbConfig/db";

import '../component/responsiveness/ContactUs.css';

export default function Form() {
    const [showForm, setShowForm] = useState(false);
    const fullNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const messageRef = useRef(null);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked");
        
        const formData = {
            fullName: fullNameRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            message: messageRef.current.value
        };

        try {
            const docRef = await addDoc(collection(db, "contact_form"), formData);

            // Manually clear the form fields
            fullNameRef.current.value = '';
            phoneNumberRef.current.value = '';
            messageRef.current.value = '';

            handleClose();
            toast.success('Successfully submitted the form!');
        } catch (error) {
            console.error('There was an error!', error);
            toast.error("There was an error in submitting the Contact-Us form.");
        }
    };
// using useState to control the form's visibility and useRef to access and clear form fields.
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
                            ref={fullNameRef} // Attach ref to the input
                            className="block w-full border border-1 border-black rounded" 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="custom block">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            ref={phoneNumberRef} // Attach ref to the input
                            className="block w-full border border-1 border-black rounded"
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="message" className="custom block">
                        Message
                    </label>
                    <textarea
                        id="message"
                        ref={messageRef} // Attach ref to the textarea
                        className="block w-full border border-1 border-black mt-1 rounded"
                        style={{ height: '100px', overflowX: 'scroll' }}
                        required
                    />
                </div>
                <div className="pt-2 mb-3">
                    <button 
                        type="submit"
                        className="bg-orange-400 w-full text-xl rounded 2xl:mt-8 2xl:mb-5 xl:mt-1 xl:mb-1 lg:mt-5 lg:mb-1">
                        Submit
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex flex-row mt-2 border border-green-600 p-1 justify-center">
                        <div>
                            <img className="sm:block hidden" style={{ width: '30px' }} src={whatsapp} />
                        </div>
                        <button className=" lg:pl-0 text-green-600 text-center">&nbsp; Join WhatsApp Group</button>
                    </div>
                    <div className="flex flex-row mt-2 justify-center" style={{ border: '2px solid transparent', borderImage: 'linear-gradient(to right, purple, pink, yellow) 1' }}>
                        <div>
                            <img className="pt-1 sm:block hidden" style={{ height: '30px', width: '30px' }} src={instagram} />
                        </div>
                        <button className=" lg:pl-0 text-pink-600 text-center">&nbsp; Follow us on Instagram</button>
                    </div>
                </div>
            </form>
        </>
    );
}
