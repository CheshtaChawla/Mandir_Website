import React, { useState, useEffect } from 'react';
import { db } from '../../dbConfig/db';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AdminNavbar } from './Adminnavbar';
import AdminHeading from './AdminHeading';

const AdminAboutUsComponent = () => {
  const [aboutus, setAboutus] = useState({
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    paragraph: '',
  });

  const [aboutUss, setAboutUss] = useState([]);
  const [editingAboutus, setEditingAboutus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutus(prevState => ({ ...prevState, [name]: value }));
  };

  const createAboutUs = async (e) => { 
    e.preventDefault(); // Prevent default form submission .. this the reason due to which now I am able to make update my already entered data
    try {
    if (editingAboutus) {
        console.log('Editing AboutUs:', editingAboutus); // Debugging log
        const aboutusDoc = doc(db, 'aboutUs', editingAboutus.id);
        await updateDoc(aboutusDoc, {
            image1: aboutus.imageUrl1,
            image2: aboutus.imageUrl2,
            image3: aboutus.imageUrl3,
            paragraph: aboutus.paragraph,
         //key:value -> key is which is declared in firebase and value is which is decleared in this file above
        });
        
        alert('AboutUs updated successfully');
        setAboutUss(prevAboutus => prevAboutus.map(a => 
          a.id === editingAboutus.id ?{ ...a, ...aboutus } : a
          ));
          setAboutus({ imageUrl1: '', imageUrl2: '', imageUrl3: '', paragraph: ''});
          setEditingAboutus(null);
      } else {
        const newAboutUs = {
            image1: aboutus.imageUrl1,
            image2: aboutus.imageUrl2,
            image3: aboutus.imageUrl3,
            paragraph: aboutus.paragraph,
        };
        const docRef = await addDoc(collection(db, 'aboutUs'), newAboutUs);
        alert('AboutUs created successfully');
        setAboutUss(prevAboutus => [...prevAboutus, { ...newAboutUs, id: docRef.id }]);
        setAboutus({  imageUrl1: '', imageUrl2: '', imageUrl3: '', paragraph: '' });
      } 
    }catch (error) {
        console.error('Error creating AboutUs:', error);
      }
  };

  const readAboutUs = async () => {
    try {
    const querySnapshot = await getDocs(collection(db, 'aboutUs'));
    const aboutusArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setAboutUss(aboutusArray);
    }
    catch(error){
      console.error('Error reading AboutUs:', error);
      alert('Error fetching AboutUs. Please check the console for more details.');
    }

  };

  const deleteAboutUs = async (id) => {
    if (!id) {
      alert('AboutUs ID is required to delete a booking.');
      return;
    }
    const isConfirmed = window.confirm('Are you sure you want to delete this AboutUs?');
    if (isConfirmed) {
      try {
      const aboutusDoc = doc(db, 'aboutUs', id);
      await deleteDoc(aboutusDoc);
      setAboutUss(prevAboutus => prevAboutus.filter( aboutus=> aboutus.id !== id));
      }catch(error){
        console.error('Error deleting AboutUs:', error);
        alert('Error deleting AboutUs. Please check the console for more details.');
      }
    }
  };

  const editAboutUs= (aboutusItem) => {
    setAboutus({
        imageUrl1: aboutusItem.image1,
        imageUrl2: aboutusItem.image2,
        imageUrl3: aboutusItem.image3,
        paragraph: aboutusItem.paragraph,
    });
    setEditingAboutus(aboutusItem);
  };

  useEffect(() => {
    readAboutUs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full" >
    <AdminHeading /> {/* Heading component */}
    <div className="flex flex-1 w-full">
      <AdminNavbar /> {/* Sidebar */}
      <div className="flex-1 p-6 w-full max-w-full overflow-x-hidden"> {/* Main content area */}
          <div className='bg-[#DCB44D] bg-opacity-[25%] ml-36 mr-4'>
            <h3 className='mb-4 font-semibold text-3xl text-[#DCB44D] text-center'>Create New AboutUs!</h3>
            <form className="flex flex-col p-5">
              <label className='mb-2 text-lg'>Image URL 1:</label>
              <input 
                type="text" 
                name="imageUrl1" 
                placeholder="Image URL 1" 
                value={aboutus.imageUrl1} 
                onChange={handleChange} 
                className='border p-2 mb-4'
              />
              <label className='mb-2 text-lg'>Image URL 2:</label>
              <input 
                type="text" 
                name="imageUrl2" 
                placeholder="Image URL 2" 
                value={aboutus.imageUrl2} 
                onChange={handleChange} 
                className='border p-2 mb-4'
              />
              <label className='mb-2 text-lg'>Image URL 3:</label>
              <input 
                type="text" 
                name="imageUrl3" 
                placeholder="Image URL 3" 
                value={aboutus.imageUrl3} 
                onChange={handleChange} 
                className='border p-2 mb-4'
              />

              <label className='mb-2 text-lg'>Paragraph:</label>
              <textarea 
                name="paragraph" 
                placeholder="Paragraph" 
                value={aboutus.paragraph} 
                onChange={handleChange} 
                className='border p-2 mb-4'
              />

              <div className="flex justify-center mt-5">
                <button 
                  className='md:w-1/5 sm:w-2/5 font-semibold text-xl border px-4 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
                  onClick={createAboutUs}
                  disabled={!aboutus.imageUrl1 || !aboutus.imageUrl2 || !aboutus.imageUrl3 || !aboutus.paragraph}
                >
                  {editingAboutus ? 'Update AboutUs' : 'Create AboutUs'}
                </button>
              </div>
            </form>
          </div>
          <div className='ml-36 mr-4 bg-white border border-gray-200 mt-5 overflow-x-auto'>
            <table className='w-full mt-5'>
              <thead>
              <tr>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap pl-2'>Image 1</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Image 2</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Image 3</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'>Paragraph</th>
                  <th className='text-xl text-left text-[#DCB44D] whitespace-nowrap'> Action</th>
                </tr>
              </thead>
              {aboutUss.map((aboutusItem) => (
                  <tr key={aboutusItem.id}>
                    <td className="py-4 whitespace-nowrap pl-2">
                      <a href={aboutusItem.image1} target="_blank" rel="noopener noreferrer">
                        View Image1
                      </a>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <a href={aboutusItem.image2} target="_blank" rel="noopener noreferrer">
                        View Image2
                      </a>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <a href={aboutusItem.image3} target="_blank" rel="noopener noreferrer">
                        View Image3
                      </a>
                    </td>
                    <td className="py-4 whitespace-nowrap min-w-[800px] ">{aboutusItem.paragraph}</td>
                    <td className='py-3'>
                      <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 ml-2 mb-2"
                        onClick={() => editAboutUs(aboutusItem)}
                      >
                        Edit
                      </button>
                      <button 
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => deleteAboutUs(aboutusItem.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


function getText(html){
  var divContainer= document.createElement("div");
  divContainer.innerHTML = html;
  return divContainer.textContent || divContainer.innerText || "";
}
export default AdminAboutUsComponent;
