import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from '../../dbConfig/db';
import AdminHeading from './AdminHeading';
import { AdminNavbar } from './Adminnavbar';

export default function AdminContactUsComponent() {
    const [contactForms, setContactForms] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const [enquiries, setEnquiries] = useState([]); 

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const docRef = doc(db, 'contact_form', 'formImage');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setImageUrl(docSnap.data().imageUrl);
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        const fetchContactForms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contact_form'));
                const forms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setContactForms(forms);
            } catch (error) {
                console.error('Error fetching contact forms:', error);
            }
        };

        const fetchEnquiries = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'enqueries'));
                const enquiryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEnquiries(enquiryData);
            } catch (error) {
                console.error('Error fetching enquiries:', error);
            }
        };

        fetchImage();
        fetchContactForms();
        fetchEnquiries();
    }, []);

    const handleImageUpdate = async () => {
        if (!newImageUrl.trim()) {
            setErrorMessage('Image URL cannot be empty.');
            return;
        }

        try {
            const docRef = doc(db, 'contact_form', 'formImage');
            await setDoc(docRef, { imageUrl: newImageUrl });
            setImageUrl(newImageUrl);
            setNewImageUrl(""); 
            setErrorMessage('');
            alert('Image URL updated successfully!');
        } catch (error) {
            console.error('Error updating image URL:', error);
            alert('There was an error updating the image URL.');
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this submission?');

        if (isConfirmed) {
            try {
                await deleteDoc(doc(db, 'contact_form', id));
                setContactForms(contactForms.filter(form => form.id !== id));
                alert('Contact form deleted successfully!');
            } catch (error) {
                console.error('Error deleting contact form:', error);
                alert('There was an error deleting the contact form.');
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-full">
            <AdminHeading /> {/* Heading component */}
            <div className="flex flex-1 w-full">
                <AdminNavbar /> {/* Sidebar */}
                <div className="flex-1 p-6 w-full overflow-x-hidden">
                    {/* Image Management Section */}
                    <div className="bg-[#DCB44D] bg-opacity-[25%] ml-36 mr-4">
                        <div className="p-4">
                            <h1 className="text-2xl text-center font-bold mb-4">Manage Contact Us Image</h1>
                            <div className="flex flex-col items-center">
                                {imageUrl && <img src={imageUrl} alt="Current Contact Us" className="mb-4 rounded" />}
                                <input 
                                    type="text" 
                                    value={newImageUrl} 
                                    onChange={(e) => setNewImageUrl(e.target.value)} 
                                    placeholder="Enter new image URL" 
                                    className="mb-4 p-2 border rounded sm:w-[50%] w-[30%] text-center"
                                />
                                <button onClick={handleImageUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
                                    Update Image
                                </button>
                                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Submissions Section */}
                    <div className="bg-[#DCB44D] bg-opacity-[25%] ml-36 mr-4 mt-6 overflow-x-auto">
                        <div className="p-4 min-w-[600px]">
                            <h1 className="text-2xl text-center font-bold mb-4">Contact Us Form Submissions</h1>
                            {contactForms.length > 0 ? (
                                <ul className="space-y-4">
                                    {contactForms.map(form => (
                                        <li key={form.id} className="border p-4 rounded shadow bg-white flex justify-between items-center">
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold mb-3 ">Submission ID: {form.id}</h2>
                                                <p><strong>Full Name:</strong> {form.fullName}</p>
                                                <p><strong>Phone Number:</strong> {form.phoneNumber}</p>
                                                <p className='max-w-full break-words '><strong>Message:</strong> {form.message}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(form.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Delete Details
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No submissions found.</p>
                            )}
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    );
}
