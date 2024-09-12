import React, { useState, useEffect } from 'react';
import { db } from '../../dbConfig/db';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AdminNavbar } from './Adminnavbar';
import AdminHeading from './AdminHeading';

const AdminComponent = () => {
  const [banner, setBanner] = useState({
    imageUrl: '',
    type: ''
  });

  const [banners, setBanners] = useState([]);
  const [editingBanner, setEditingBanner] = useState(null);
  // const [bannerId, setBannerId] = useState('');
  // const [modalAction, setModalAction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner(prevState => ({ ...prevState, [name]: value }));
  };

  const createBanner = async (e) => {
    e.preventDefault(); // Prevent form from submitting
    if (editingBanner) {
      try {
        const bannerDoc = doc(db, 'banners', editingBanner.id);
        await updateDoc(bannerDoc, {
          image: banner.imageUrl,
          type: banner.type
        //DB name:file name
        });
        alert('Banner updated successfully');
        setBanners(prevBanners => prevBanners.map(b => b.id === editingBanner.id ? { ...b, image: banner.imageUrl, type: banner.type } : b));
        setBanner({ imageUrl: '', type: '' });
        setEditingBanner(null);
      } catch (error) {
        console.error('Error updating banner:', error);
      }
    } else {
      try {
        const newBanner = {
          image: banner.imageUrl,
          type: banner.type,
        };
        const docRef = await addDoc(collection(db, 'banners'), newBanner);
        alert('Banner created successfully');
        setBanners(prevBanners => [...prevBanners, { ...newBanner, id: docRef.id }]);
        setBanner({ imageUrl: '', type: '' });
      } catch (error) {
        console.error('Error creating banner:', error);
      }
    }
  };

  const readBanners = async () => {
    const querySnapshot = await getDocs(collection(db, 'banners'));
    const bannerArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setBanners(bannerArray);
  };

  const deleteBanner = async (id) => {
    if (!id) {
      alert('Banner ID is required to delete a banner.');
      return;
    }
    const isConfirmed = window.confirm('Are you sure you want to delete this banner?');
    if (isConfirmed) {
      const bannerDoc = doc(db, 'banners', id);
      await deleteDoc(bannerDoc);
      setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
    }
  };

  const editBanner = (bannerItem) => {
    setBanner({
      imageUrl: bannerItem.image,
      type: bannerItem.type,
    });
    setEditingBanner(bannerItem);
  };

  useEffect(() => {
    readBanners();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full" >
      <AdminHeading /> {/* Heading component */}
      <div className="flex flex-1 w-full">
        <AdminNavbar /> {/* Sidebar */}
        <div className="flex-1 p-6 w-full max-w-full overflow-x-hidden"> {/* Main content area...... using this flex-1 this create new banner is streched and is placed at the center of the screen */}
          <div className='relative bg-[#DCB44D] bg-opacity-[25%]  ml-36 mr-4'>
            <h3 className=' mb-4 font-semibold text-3xl text-[#DCB44D] text-center'>Create New Banner!</h3>
            <form className="flex flex-col  p-5">
              <label className='mb-2 text-lg'>Banner Image URL:</label>
              <input 
                type="text" 
                name="imageUrl" 
                placeholder="Image URL" 
                value={banner.imageUrl} 
                onChange={handleChange} 
                className='border p-2 mb-4'
              />
              <label className='mb-2 text-lg'>Banner Heading:</label>
              <input 
                type="text" 
                name="type" 
                placeholder="Type Here" 
                value={banner.type} 
                onChange={handleChange} 
                className='border p-2 mb-4'
              />
              <div className="flex justify-center mt-5">
              <button  // if you want to allign button into the center of the form you have to give allignment to the div containing this butoon
                className='md:w-1/5 sm:w-2/5 font-semibold text-xl border px-4 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
                onClick={createBanner}
                disabled={!banner.imageUrl || !banner.type}
              >
                {editingBanner ? 'Update Banner' : 'Create Banner'}
              </button>
            </div>
            </form>
          </div>
          <div className=' ml-36 mr-4 min-w-screen bg-white border border-gray-200 mt-5 overflow-x-auto'>
            <table className='w-full mt-5'>
              <thead>
                <tr>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap pl-2'>Banner Image</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap '>Banner Heading</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((bannerItem) => (
                  <tr key={bannerItem.id}>
                    <td className="py-4 pl-2 whitespace-nowrap ">
                      <a href={bannerItem.image} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    </td>
                    <td className="py-6 whitespace-nowrap">{bannerItem.type}</td>
                    <td >
                      <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 my-2 whitespace-nowrap" 
                        onClick={() => editBanner(bannerItem)}
                      >
                        Edit
                      </button>
                      <button 
                        className="bg-red-500 text-white px-4 py-2 rounded whitespace-nowrap " 
                        onClick={() => deleteBanner(bannerItem.id)}
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

export default AdminComponent;
