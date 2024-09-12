
import React, { useState, useEffect } from 'react';
import { db } from '../../dbConfig/db';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AdminNavbar } from './Adminnavbar';
import AdminHeading from './AdminHeading';

const AdminCommitteeComponent = () => {
  const [committee, setCommittee] = useState({
    imageUrl: '',
    title: '',
    subtitle: '',
  });

  const [committees, setCommittees] = useState([]);
  const [editingCommittee, setEditingCommittee] = useState(null);

   // State for enquiries data
   const [enquiries, setEnquiries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommittee(prevState => ({ ...prevState, [name]: value }));
  };

  const createCommittee = async (e) => {
    e.preventDefault();
    try {
      if (editingCommittee) {
        const committeeDoc = doc(db, 'committees', editingCommittee.id);
        await updateDoc(committeeDoc, {
          image: committee.imageUrl,
          title: committee.title,
          subtitle: committee.subtitle,
        });

        alert('Committee updated successfully');
        setCommittees(prevCommittees =>
          prevCommittees.map(c =>
            c.id === editingCommittee.id ? { ...c, ...committee } : c
          )
        );
        setCommittee({ imageUrl: '', title: '', subtitle: '' });
        setEditingCommittee(null);
      } else {
        const newCommittee = {
          image: committee.imageUrl,
          title: committee.title,
          subtitle: committee.subtitle,
        };
        const docRef = await addDoc(collection(db, 'committees'), newCommittee);
        alert('Committee created successfully');
        setCommittees([...committees, { ...newCommittee, id: docRef.id }]);
        setCommittee({ imageUrl: '', title: '', subtitle: '' });
      }
    } catch (error) {
      console.error('Error creating Committee:', error);
      alert('Error creating Committee. Please check the console for more details.');
    }
  };

  const readCommittees = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'committees'));
      const committeeArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCommittees(committeeArray);
    } catch (error) {
      console.error('Error reading committees:', error);
      alert('Error fetching committees. Please check the console for more details.');
    }
  };

  const deleteCommittee = async (id) => {
    if (!id) {
      alert('Committee ID is required to delete a committee.');
      return;
    }
    const isConfirmed = window.confirm('Are you sure you want to delete this committee?');
    if (isConfirmed) {
      try {
        const committeeDoc = doc(db, 'committees', id);
        await deleteDoc(committeeDoc);
        setCommittees(prevCommittees => prevCommittees.filter(committee => committee.id !== id));
        alert('Committee deleted successfully');
      } catch (error) {
        console.error('Error deleting committee:', error);
        alert('Error deleting committee. Please check the console for more details.');
      }
    }
  };

  const deleteEnquery = async (id) => {
    if (!id) {
      alert('Enquery ID is required to delete a Enquery.');
      return;
    }
    const isConfirmed = window.confirm('Are you sure you want to delete this Enquery?');
    if (isConfirmed) {
      try {
        const enqueryDoc = doc(db, 'enqueries', id);
        await deleteDoc(enqueryDoc);
        setEnquiries(prevEnquery=> prevEnquery.filter(enquiries => enquiries.id !== id));
        alert('Enquery deleted successfully');
      } catch (error) {
        console.error('Error deleting Enquery:', error);
        alert('Error deleting Enquery. Please check the console for more details.');
      }
    }
  };

  const readEnquiries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'enqueries'));
      const enquiryArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setEnquiries(enquiryArray);
    } catch (error) {
      console.error('Error reading enquiries:', error);
      alert('Error fetching enquiries. Please check the console for more details.');
    }
  };

  const editCommittee = (committeeItem) => {
    setCommittee({
      imageUrl: committeeItem.image,
      title: committeeItem.title,
      subtitle: committeeItem.subtitle,
    });
    setEditingCommittee(committeeItem);
  };
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this submission?');

   
};

  useEffect(() => {
    readCommittees();
    readEnquiries();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full" >
    <AdminHeading /> {/* Heading component */}
    <div className="flex flex-1 w-full">
      <AdminNavbar /> {/* Sidebar */}
      <div className="flex-1 p-6 w-full max-w-full overflow-x-hidden">  {/* Main content area */}
          <div className='bg-[#DCB44D] bg-opacity-[25%] ml-36 mr-4'>
            <h3 className='mb-4 font-semibold text-3xl text-[#DCB44D] text-center'>Create New Committee Member!</h3>
            <form className="flex flex-col p-5">
              <label className='mb-2 text-lg'>Member Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={committee.imageUrl}
                onChange={handleChange}
                className='border p-2 mb-4'
              />
              <label className='mb-2 text-lg'>Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={committee.title}
                onChange={handleChange}
                className='border p-2 mb-4'
              />
              <label className='mb-2 text-lg'>Subtitle:</label>
              <textarea
                name="subtitle"
                placeholder="Subtitle"
                value={committee.subtitle}
                onChange={handleChange}
                className='border p-2 mb-4'
              />
              <div className="flex justify-center mt-5">
                <button
                  className='md:w-1/5 sm:w-2/5 font-semibold text-xl border px-4 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
                  onClick={createCommittee}
                  disabled={!committee.imageUrl || !committee.title || !committee.subtitle}
                >
                  {editingCommittee ? 'Update Committee' : 'Create Committee'}
                </button>
              </div>
            </form>
          </div>
          <div className='ml-36 mr-4  bg-white border border-gray-200 mt-5 overflow-x-auto'>
            <table className='w-full mt-5'>
              <thead>
                <tr>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap pl-2'>Committee Image</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Title</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>SubTitle</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {committees.map((committeeItem) => (
                  <tr key={committeeItem.id}>
                    <td className="py-4 pl-2 whitespace-nowrap">
                      <a href={committeeItem.image} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    </td>
                    <td className="py-4 whitespace-nowrap">{committeeItem.title}</td>
                    <td className="py-4 whitespace-nowrap">{committeeItem.subtitle}</td>
                    <td className='py-3 whitespace-nowrap'>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 ml-2 mb-2"
                        onClick={() => editCommittee(committeeItem)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => deleteCommittee(committeeItem.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

{/* Enquiries Section */}
{/* <div className='ml-36 mr-4 bg-white border border-gray-200 mt-5 overflow-x-auto'>
  <h3 className='mb-4 font-semibold text-3xl text-[#DCB44D] text-center'>Enquiries</h3>
  <table className='w-full mt-5'>
    <thead>
      <tr>
        <th className='text-xl text-left text-[#DCB44D]'>First Name</th>
        <th className='text-xl text-left text-[#DCB44D]'>Last Name</th>
        <th className='text-xl text-left text-[#DCB44D]'>Date of Birth</th>
        <th className='text-xl text-left text-[#DCB44D]'>State</th>
        <th className='text-xl text-left text-[#DCB44D]'>City</th>
        <th className='text-xl text-left text-[#DCB44D]'>Action</th>
      </tr>
    </thead>
    <tbody>
      {enquiries.map((enquiry) => (
        <tr key={enquiry.id}>
          <td className="py-4 px-2">{enquiry.fname}</td>
          <td className="py-4 px-2">{enquiry.lname}</td>
          <td className="py-4 px-2">{enquiry.dob}</td>
          <td className="py-4 px-2">{enquiry.state}</td>
          <td className="py-4 px-2">{enquiry.city}</td>
          <td className='py-3'>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => deleteEnquery(enquiry.id)}
                        >
                          Delete
                        </button>
                      </td>
        </tr>
      ))}
    </tbody>
  </table>
</div> */}

 {/* Enquiries Section */}
 <div className="bg-[#DCB44D] bg-opacity-[25%] ml-36 mr-4 mt-6 overflow-x-auto">
                        <div className="p-4 min-w-[600px]">
                            <h1 className="text-2xl text-center font-bold mb-4">Enquiries for joining the Membership</h1>
                            {enquiries.length > 0 ? (
                                <ul className="space-y-4">
                                    {enquiries.map(enquiry => (
                                        <li key={enquiry.id} className="border p-4 rounded shadow bg-white flex justify-between items-center">
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold mb-3">Enquiry ID: {enquiry.id}</h2>
                                                <p><strong>First Name:</strong> {enquiry.fname}</p>
                                                <p><strong>Last Name:</strong> {enquiry.lname}</p>
                                                <p><strong>Date of Birth:</strong> {enquiry.dob}</p>
                                                <p><strong>State:</strong> {enquiry.state}</p>
                                                <p><strong>City:</strong> {enquiry.city}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(enquiry.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Delete Enquiry
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No enquiries found.</p>
                            )}
                        </div>
                    </div>


        </div>
      </div>
    </div>
  );
};

export default AdminCommitteeComponent;
