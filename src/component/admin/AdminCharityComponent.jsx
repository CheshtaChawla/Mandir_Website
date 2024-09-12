// import React, { useState, useEffect } from 'react';
// import { db } from '../../dbConfig/db';
// import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// import { AdminNavbar } from './Adminnavbar';
// import AdminHeading from './AdminHeading';

// const AdminCharityComponent = () => {
//   const [charity, setCharity] = useState({
//     imageUrl: '',
//     donateButtonText: ''
//   });

//   const [charities, setCharities] = useState([]);
//   const [editingCharity, setEditingCharity] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCharity(prevState => ({ ...prevState, [name]: value }));
//   };

//   const createCharity = async (e) => {
//     e.preventDefault(); // Prevent form from submitting
//     try {
//       if (editingCharity) {
//         const charityDoc = doc(db, 'charities', editingCharity.id);
//         await updateDoc(charityDoc, {
//           image: charity.imageUrl,
//           donateButtonText: charity.donateButtonText
//         });

//         alert('Charity updated successfully');

//         setCharities(prevCharities => prevCharities.map(c =>
//           c.id === editingCharity.id ? 
//             { ...c, image: charity.imageUrl, donateButtonText: charity.donateButtonText }
//             : c
//         ));
//         setCharity({ imageUrl: '', donateButtonText: '' });
//         setEditingCharity(null);
//       } else {
//         const newCharity = {
//           image: charity.imageUrl,
//           donateButtonText: charity.donateButtonText
//         };
//         const docRef = await addDoc(collection(db, 'charities'), newCharity);
//         alert('Charity created successfully');
//         setCharities(prevCharities => [...prevCharities, { ...newCharity, id: docRef.id }]);
//         setCharity({ imageUrl: '', donateButtonText: '' });
//       }
//     } catch (error) {
//       console.error('Error creating/updating charity:', error);
//       alert('Error creating/updating charity. Please check the console for more details.');
//     }
//   };

//   const readCharities = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'charities'));
//       const charityArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
//       setCharities(charityArray);
//     } catch (error) {
//       console.error('Error reading charities:', error);
//       alert('Error fetching charities. Please check the console for more details.');
//     }
//   };

//   const deleteCharity = async (id) => {
//     if (!id) {
//       alert('Charity ID is required to delete a charity.');
//       return;
//     }
//     const isConfirmed = window.confirm('Are you sure you want to delete this charity?');
//     if (isConfirmed) {
//       try {
//         const charityDoc = doc(db, 'charities', id);
//         await deleteDoc(charityDoc);
//         setCharities(prevCharities => prevCharities.filter(charity => charity.id !== id));
//       } catch (error) {
//         console.error('Error deleting charity:', error);
//         alert('Error deleting charity. Please check the console for more details.');
//       }
//     }
//   };

//   const editCharity = (charityItem) => {
//     setCharity({
//       imageUrl: charityItem.image,
//       donateButtonText: charityItem.donateButtonText
//     });
//     setEditingCharity(charityItem);
//   };

//   useEffect(() => {
//     readCharities();
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen w-full">
//       <AdminHeading /> {/* Heading component */}
//       <div className="flex flex-1 w-full">
//         <AdminNavbar /> {/* Sidebar */}
//         <div className="flex-1 p-6 w-full max-w-full overflow-x-hidden"> {/* Main content area */}
//           <div className='bg-[#DCB44D] bg-opacity-[25%] ml-36 mr-4'>
//             <h3 className='mb-4 font-semibold text-3xl text-[#DCB44D] text-center'>Create New Charity!</h3>
//             <form className="flex flex-col p-5">
//               <label className='mb-2 text-lg'>Charity Image URL:</label>
//               <input 
//                 type="text" 
//                 name="imageUrl" 
//                 placeholder="Image URL" 
//                 value={charity.imageUrl} 
//                 onChange={handleChange} 
//                 className='border p-2 mb-4'
//               />
//               <label className='mb-2 text-lg'>Donate Button Text:</label>
//               <input 
//                 type="text" 
//                 name="donateButtonText" 
//                 placeholder="Button Text" 
//                 value={charity.donateButtonText} 
//                 onChange={handleChange} 
//                 className='border p-2 mb-4'
//               />
//               <div className="flex justify-center mt-5">
//                 <button 
//                   type="button"
//                   className='md:w-1/5 sm:w-2/5 font-semibold text-xl border px-4 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
//                   onClick={createCharity}
//                   disabled={!charity.imageUrl || !charity.donateButtonText}
//                 >
//                   {editingCharity ? 'Update Charity' : 'Create Charity'}
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className='ml-36 mr-4 min-w-screen bg-white border border-gray-200 mt-5 overflow-x-auto'>
//             <table className='w-full mt-5'>
//               <thead>
//                 <tr>
//                   <th className='text-xl text-left text-[#DCB44D] pl-2'>Charity Image</th>
//                   <th className='text-xl text-left text-[#DCB44D]'>Donate Button Text</th>
//                   <th className='text-xl text-left text-[#DCB44D]'>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {charities.map((charityItem) => (
//                   <tr key={charityItem.id}>
//                     <td className="py-4 pl-2">
//                       <a href={charityItem.image} target="_blank" rel="noopener noreferrer">
//                         View Image
//                       </a>
//                     </td>
//                     <td className="py-4">{charityItem.donateButtonText}</td>
//                     <td>
//                       <button 
//                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2 my-2" 
//                         onClick={() => editCharity(charityItem)}
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         className="bg-red-500 text-white px-4 py-2 rounded" 
//                         onClick={() => deleteCharity(charityItem.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminCharityComponent;
