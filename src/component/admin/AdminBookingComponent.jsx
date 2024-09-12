  import React, { useState, useEffect } from 'react';
  import { db } from '../../dbConfig/db';
  import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
  import { AdminNavbar } from './Adminnavbar';
  import AdminHeading from './AdminHeading';

  const AdminBookingComponent = () => {
    const [booking, setBooking] = useState({
      imageUrl: '',
      heading: '',
      paragraph: '',
      buttonText: ''
    });

    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setBooking(prevState => ({ ...prevState, [name]: value }));
    };

    const createBooking = async (e) => { 
      e.preventDefault(); // Prevent default form submission .. this the reason due to which now I am able to make update my already entered data
      try {
      if (editingBooking) {
          const bookingDoc = doc(db, 'bookings', editingBooking.id);
          await updateDoc(bookingDoc, {
            image: booking.imageUrl,
            heading: booking.heading,
            paragraph: booking.paragraph,
            buttonText: booking.buttonText  //key:value -> key is which is declared in firebase and value is which is decleared in this file above
          });
          
          alert('Booking updated successfully');
          setBookings(prevBookings => prevBookings.map(b => 
            b.id === editingBooking.id ?{ ...b, ...booking } : b
            ));
          setBooking({ imageUrl: '', heading: '', paragraph: '', buttonText: '' });
          setEditingBooking(null);
        } else {
          const newBooking = {
            image: booking.imageUrl,
            heading: booking.heading,
            paragraph: booking.paragraph,
            buttonText: booking.buttonText,
          };
          const docRef = await addDoc(collection(db, 'bookings'), newBooking);
          alert('Booking created successfully');
          setBookings(prevBookings => [...prevBookings, { ...newBooking, id: docRef.id }]);
          setBooking({ imageUrl: '', heading: '', paragraph: '', buttonText: '' });
        } 
      }catch (error) {
          console.error('Error creating booking:', error);
        }
    };

    const readBookings = async () => {
      try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookingArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setBookings(bookingArray);
      }
      catch(error){
        console.error('Error reading bookings:', error);
        alert('Error fetching bookings. Please check the console for more details.');
      }
  
    };

    const deleteBooking = async (id) => {
      if (!id) {
        alert('Booking ID is required to delete a booking.');
        return;
      }
      const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
      if (isConfirmed) {
        try {
        const bookingDoc = doc(db, 'bookings', id);
        await deleteDoc(bookingDoc);
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
        }catch(error){
          console.error('Error deleting bookings:', error);
          alert('Error deleting booking. Please check the console for more details.');
        }
      }
    };

    const editBooking = (bookingItem) => {
      setBooking({
        imageUrl: bookingItem.image,
        heading: bookingItem.heading,
        paragraph: bookingItem.paragraph,
        buttonText: bookingItem.buttonText,
      });
      setEditingBooking(bookingItem);
    };

    useEffect(() => {
      readBookings();
    }, []);

    return (
      <div className="flex flex-col min-h-screen w-full" >
      <AdminHeading /> {/* Heading component */}
      <div className="flex flex-1 w-full">
        <AdminNavbar /> {/* Sidebar */}
        <div className="flex-1 p-6 w-full max-w-full overflow-x-hidden">  {/* Main content area */}
            <div className='bg-[#DCB44D] bg-opacity-[25%] ml-36 mr-4'>
              <h3 className='mb-4 font-semibold text-3xl text-[#DCB44D] text-center'>Create New Booking!</h3>
              <form className="flex flex-col p-5">
                <label className='mb-2 text-lg'>Booking Image URL:</label>
                <input 
                  type="text" 
                  name="imageUrl" 
                  placeholder="Image URL" 
                  value={booking.imageUrl} 
                  onChange={handleChange} 
                  className='border p-2 mb-4'
                />
                <label className='mb-2 text-lg'>Heading:</label>
                <input 
                  type="text" 
                  name="heading" 
                  placeholder="Heading" 
                  value={booking.heading} 
                  onChange={handleChange} 
                  className='border p-2 mb-4'
                />
                <label className='mb-2 text-lg'>Paragraph:</label>
                <textarea 
                  name="paragraph" 
                  placeholder="Paragraph" 
                  value={booking.paragraph} 
                  onChange={handleChange} 
                  className='border p-2 mb-4'
                />
                <label className='mb-2 text-lg'>Button Text:</label>
                <input 
                  type="text" 
                  name="buttonText" 
                  placeholder="Button Text" 
                  value={booking.buttonText} 
                  onChange={handleChange} 
                  className='border p-2 mb-4'
                />
                <div className="flex justify-center mt-5">
                  <button 
                    className='md:w-1/5 sm:w-2/5 font-semibold text-xl border px-4 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
                    onClick={createBooking}
                    disabled={!booking.imageUrl || !booking.heading || !booking.paragraph || !booking.buttonText}
                  >
                    {editingBooking ? 'Update Booking' : 'Create Booking'}
                  </button>
                </div>
              </form>
            </div>
            <div className='ml-36 mr-4 min-w-screen bg-white border border-gray-200 mt-5 overflow-x-auto'>
              <table className='w-full mt-5'>
                <thead>
                  <tr>
                    <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap pl-2'>Image</th>
                    <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Heading</th>
                    <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Paragraph</th>
                    <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Button Text</th>
                    <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((bookingItem) => (
                    <tr key={bookingItem.id}>
                      <td className="py-4 pl-2">
                        <a href={bookingItem.image} target="_blank" rel="noopener noreferrer">
                          View Image
                        </a>
                      </td>
                      <td className="py-4 whitespace-nowrap ">{bookingItem.heading}</td>
                      <td className="py-4 whitespace-nowrap">{bookingItem.paragraph}</td>
                      <td className="py-4 whitespace-nowrap">{bookingItem.buttonText}</td>
                      <td className='py-3 whitespace-nowrap'>
                        <button 
                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2 ml-2 mb-2 "
                          onClick={() => editBooking(bookingItem)}
                        >
                          Edit
                        </button>
                        <button 
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => deleteBooking(bookingItem.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default AdminBookingComponent;
