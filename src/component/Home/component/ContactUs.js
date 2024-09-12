import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../dbConfig/db';
import ContactUsForm from "../component/ContactUs-Form";

export default function ContactUs() {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const docRef = doc(db, 'contact_form', 'formImage'); // Assuming the document ID is 'formImage'
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setImageUrl(docSnap.data().imageUrl);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, []);

    return (
        <div className="custom-contactUs flex flex-col">
            <div className="custom-contactUs-heading-div">
                <h1 className="custom-form-heading text-5xl font-medium font-bellefair 2xl:mt-12 xl:mt-12 lg:mt-8 md:mt-8 sm:mt-10 2xl:mb-4 xl:mb-4 lg:mb-4 md:mb-4 sm:mb-4 lg:ml-40 lg:mr-40 md:ml-20 md:mr-20 sm:ml-14 sm:mr-14">
                    Contact Us
                    <div className="custom-contactUs-underline 2xl:display-none xl:display-none lg:display-none md:display-none sm:display-none"></div>
                </h1>
            </div>
            <div className="custom-form-div border border-orange-100 shadow-md shadow-orange-200 2xl:ml-40 2xl:mr-40 xl:ml-40 xl:mr-40 lg:ml-40 lg:mr-40 md:ml-20 md:mr-10 sm:ml-10 sm:mr-10 rounded-2xl ">
                <div className="w-full 2xl:w-1/2 xl:w-1/2 lg:w-3/5 md:w-1/2 float-left p-5">
                    <ContactUsForm />
                </div>
                <div className="2xl:w-1/2 xl:w-1/2 lg:w-2/5 md:w-1/2 sm:w-1/2 float-right flex flex-row justify-center">
                    {imageUrl && <img className="rounded rounded-xl md:inline hidden object-cover h-full w-auto" src={imageUrl} alt="Contact Us" />}
                </div>
            </div>
        </div>
    );
}
