import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';  //this import statement is for sending request and setting up the server request
import toast from "react-hot-toast";
import db from "../../../App";

import { collection, addDoc } from "firebase/firestore"; 

export default function Form({handleClose}) {

    let eighteenYearsAgo = new Date();  //this is the js constructor
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);




    const [date, setDate] = useState(eighteenYearsAgo);    //these are the useState
    const [maxDate, setMaxDate] = useState(eighteenYearsAgo);


    const handleDateChange = (newDate) => {          //these are the events in react
        setDate(newDate);
    };

    // submit form
    const handleSubmit = async (e) => {                  //these are the events in react //handleSubmit -> is an asynchronous function that handles the form submission.
        e.preventDefault();                              //preventDefault is used so that the complete page do not get refresh every time we click onto the button
        console.log("clicked");
        


        // Collect form data
        const formData = {
            
            fname: e.target.fname.value,
            lname: e.target.lname.value,
            state: e.target.state.value,
            city: e.target.city.value,
            dob: date ? date.toISOString().split('T')[0] : '', // Convert date to a string format
        };

        try {
            const docRef = await addDoc(collection(db, "enqueries"), formData);
        } catch (error) {
            console.log(error, "Error.......")
        }
        

        if (!date || new Date(date) > maxDate) {
            toast.error("You must be at least 18 years old to fill out this form.");   //if the person age is greater than 18 it decline the user to fill the form
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/submit-form', formData);   
            //Axios helps developers make HTTP requests from NodeJS, If the request is successful, you will receive a response with the data requested. If the request fails, you will get an error.
            //await: as we know the database reed the data line by line and during axios action to take place it take some time ..so await fuction stops the process of further reading the code till the axios function complete its working

         
                handleClose();
                toast.success('Successfully submitted the form!');

    


        } catch (error) {
            console.error('There was an error!', error);
            toast.error("There was an error in submitting the form.");
        }
    };

    return (
        <>
            <div className="form-container max-h-[400px] overflow-y-scroll p-4 border border-gray-300 rounded-md">
                <h1 className="font-bold flex justify-center">Contact Form</h1><br />
                <form onSubmit={handleSubmit}>
                    <label className="font-medium" htmlFor="fname">First name:</label><br />
                    <input className="border border-1 border-black w-[100%] rounded rounded-md mb-2" type="text" id="fname" name="fname" required /><br />
                    <label className="font-medium" htmlFor="lname">Last name:</label><br />
                    <input className="border border-1 border-black w-[100%] rounded rounded-md mb-2" type="text" id="lname" name="lname" required /><br />
                    <label className="font-medium" htmlFor="state">State:</label><br />
                    <input className="border border-1 border-black w-[100%] rounded rounded-md mb-2" type="text" id="state" name="state" required /><br />
                    <label className="font-medium" htmlFor="city">City:</label><br />
                    <input className="border border-1 border-black w-[100%] rounded rounded-md mb-2" type="text" id="city" name="city" required /><br />
                    <label className="font-medium" htmlFor="dob">Date of Birth:</label><br />
                    <Calendar
                    className="rounded rounded-md"
                        onChange={handleDateChange}
                        value={date}
                        maxDate={maxDate}
                      
                    />
                    <div className="flex justify-center">
                        <button  className="font-medium border border-orange-500 p-2 mt-2 rounded rounded-md" type="submit">Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
