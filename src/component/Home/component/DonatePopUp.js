import React from "react";
import MahaShivratri from "../../Image/MahaShivratri.jpg";
export default function DonatePopUp(){
    return(
        <>
        <div className="DonatePopUp border-1 border-black ">
            <h1 className="flex justify-center font-bold mb-4"> Account Details for Donation</h1>
            <ul>
                <li className="mb-2">Name of Bank: State Bank of India</li>
                <li className="mb-2">Account No.: 123456789</li>
                <li className="mb-2">IFSC Code: 12345</li>
            </ul>
                
                <h1 className="mb-2 font-bold flex justify-center">Scan to Donate</h1>
                <div className="flex justify-center 2xl:w-[100%]">
                <img className="w-[40%] h-[40%] rounded rounded-md" 
                src={MahaShivratri} 
                alt="Scan this image to Donate"/>
                </div>
        </div>
        </>
    );
}