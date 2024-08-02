// import React, { useEffect, useRef } from 'react';
// import DonatePopUp from "./DonatePopUp";
// import CharityCard from "./Charity-Card";

// export default function ModalCharity ({ onClose, children }) {
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
//         <DonatePopUp  handlePopUpButtonClose={onClose} />
//       </div>
//     </div>
//   );
// }


