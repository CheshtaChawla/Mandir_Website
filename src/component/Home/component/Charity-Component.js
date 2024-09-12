// import CharityCard from "./Charity-Card";
// import Slider from "react-slick";
// import MahaShivratri from "../../Image/MahaShivratri.jpg"
// // import banner2 from "../../Image/banner-2.jpg"
// // import banner4 from "../../Image/banner-4.jpg"
// import '../component/responsiveness/Charity.css';
// import React, { useEffect, useState, useRef } from 'react';
// import DonatePopUp from "../component/DonatePopUp";
// import fetchCharityData from  './fetchCharityData';

// export default function CharityComponent() {

//   const [activeModal, setActiveModal] = useState(null);

//   const [charityData, setCharityData] = useState([]);

//   useEffect(() => {
//     const getCharityData = async () => {
//       const data = await fetchCharityData();  // fetches all documents from the events collection.
//       setCharityData(data);
      
//     };
//     getCharityData();
//   }, []);



//   const handlePopUpButtonClick = () => {
//     setActiveModal(true);
//   };

//   const handlePopUpButtonClose = () => {
//     setActiveModal(null);
//   };

//   const settings = {
//     dots: true,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     // slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//   };

//   return (
//     <>
//       <div className="custom-charity-complete-div">
//         <div className="custom-charity-heading-div">
//           <h1 className="custom-charity-heading text-5xl font-medium font-bellefair 2xl:mt-10 xl:mt-10 lg:mt-5 md:mt-8 sm:mt-10 lg:ml-40 lg:mr-40 md:ml-20 md:mr-20 sm:ml-14 sm:mr-14">
//             Charity
//             <div className="custom-charity-underline 2xl:display-none xl:display-none lg:display-none md:display-none sm:display-none"></div>
//           </h1>
//         </div>

//         <div className="custom-charity-data-div flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col 2xl:mt-6 xl:mt-3 lg:mt-5 md:mt-5 sm:mt-5 lg:ml-40 lg:mr-40 md:ml-20 md:mr-20 sm:ml-14 sm:mr-14">

//           <div className="custom-slider-div xl:w-3/5 lg:w-[80%] md:w-[65%] " > {/* This is the slider div only */}
//             <Slider {...settings}>
//               {charityData.map((data,index) => (
//                 <CharityCard
                
//                 key={index}
//                 buttonName={data.donateButtonText}
//                 image={data.image}
//                 onButtonClick={handlePopUpButtonClick}
//                 //variables jo card me define kiye: db me jo variables define kiye
//                 />
//               ))}
//             </Slider>
//           </div>

//           <div className="custom-charity-scan-complete-div flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col sm:flex-row 2xl:ml-40 xl:ml-36 xl:ml-26 lg:ml-20 md:ml-20 sm:mt-10">

//             <div className="custom-charity-ScanToDonate-headingAndImage " >

//               <div className="custom-charity-ScanToDonate-heading flex justify-center mb-2">    {/*here flex is provided to justify the content in center*/}
//                 <h2 className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-2xl"> Scan to Donate </h2>
//               </div>

//               <div className="custom-charity-ScanToDonate-image rounded-3xl " >
//                 <img className="custom-charity-scaner-image rounded-2xl 2xl:w-[40%] xl:w-[60%]  lg:w-[60%] md:w-[60%] sm:w-[60%] mx-auto" src={MahaShivratri} />
//               </div>

//             </div>

//             <div className="custom-charity-ScanToDonate-details 2xl:text-xl xl:text-xl lg:text-sm md:text-sm sm:text-xl 2xl:justify-center xl:justify-center lg:justify-center md:justify-center sm:justify-center 2xl:items-center xl:items-center flex flex-col  ">
//               <h3 className="custom-charity-ScanToDonate-details-ac "> A/C No.: 990126786491</h3>
//               <h3 className="custom-charity-ScanToDonate-details-ifsc"> IFSC: 445798FF580 </h3>
//             </div>

//           </div>   {/* ye complete right side wala div close ho geya*/}
//         </div>   {/* ye complete charity wala div close ho geya h except charity heading*/}

//         {activeModal !== null && (
//         <Modal onClose={handlePopUpButtonClose} />
//       )}
//       </div>  {/* ye complete charity wala div close ho geya h including charity heading*/}

//     </>

//   );
// };

// function Modal({ onClose }) {
//   const modalRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [onClose]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg relative" ref={modalRef}>
//         <button className="absolute top-0 right-0 m-4 text-gray-600" onClick={onClose}>
//           &times;
//         </button>
//         <DonatePopUp handlePopUpButtonClose={onClose} />
//       </div>
//     </div>
//   );
// }