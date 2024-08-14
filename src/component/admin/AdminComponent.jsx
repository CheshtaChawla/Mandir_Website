import React, { useState, useEffect } from 'react';
import { db } from '../../dbConfig/db';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import ConfirmModal from "../component/ComponentModal";


const AdminComponent = () => {
  const [event, setEvent] = useState({
    event_name: '',
    event_start_date: '',
    event_end_date: '',
    event_start_time: '',
    event_end_time: '',
    event_description: '',
    event_image: ''

    
  });

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };


  const handleDeleteEvent = (id) => {
    setEventId(id);
    setModalAction('delete');
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (modalAction === 'create') {
      await createEvent();
    } else if (modalAction === 'delete') {
      await deleteEvent(eventId);
    }
    setShowModal(false);
  };
// this funtion is created in the way that if user directly click ont he create-event button without filling the information about the new event to be created it should through the error of the same 
  const createEvent = async () => {
    const { event_name, event_start_date, event_end_date, event_start_time, event_end_time, event_image, event_description } = event;
  
    // Check if all required fields are filled
    if (!event_name || !event_start_date || !event_end_date || !event_start_time || !event_end_time || !event_image || !event_description) {
      alert('Please fill all the required fields.');
      return;
    }
    let imageUrl = event_image;

    if (typeof event_image !== 'string' && event_image) {
      imageUrl = await uploadImage(event_image);
    }
  
    const newEvent = {
      event_name,
      event_start_date,
      event_end_date,
      event_start_time,
      event_end_time,
      event_description,
      event_image: imageUrl,
    };
    // const newEvent = { ...event };

    if (typeof event_image !== 'string') {
      const imageUrl = await uploadImage(event_image);
      newEvent.event_image = imageUrl;
    }

    await addDoc(collection(db, 'events'), event);
  alert('Event created successfully');
  setEvent({  //setEvent with empty values are set so that if once the create event is created the field become empty and get prepared for the creation of next event in the event list
    event_name: '',
    event_start_date: '',
    event_end_date: '',
    event_start_time: '',
    event_end_time: '',
    event_image: '',
    event_description: ''
  }); // Reset form fields
  readEvents(); // Refresh events list after creation
};

  const readEvents = async () => {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const eventsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setEvents(eventsArray);
  };



  const handleEdit = (event) => {
    setEditingEvent({...event});
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  const updateEvent = async () => {
    if (!editingEvent) {
      alert('Please select an event to update.');
      return;
    }
  
    const eventDoc = doc(db, 'events', editingEvent.id);
    await updateDoc(eventDoc, editingEvent);
    alert('Event updated successfully');
    setEditingEvent(null);
    readEvents();
  };

  const cancelEdit = () => {
    setEditingEvent(null);
  };


  const deleteEvent = async (id) => {
    if (!id) {
      alert('Event ID is required to delete an event.');
      return;
    }
    
    // Use window.confirm and store the result....window.confirm is used instead of simple alert statement bcz to display the confirm and cancel buttons
    const isConfirmed = window.confirm('Are you sure you want to delete this event?');
    console.log(isConfirmed)
    // Only proceed with deletion if the user confirmed
    if (isConfirmed) {
      const eventDoc = doc(db, 'events', id);
      await deleteDoc(eventDoc);                //if isConfirmed is true then the the event will be deleted successfuly
      alert('Event deleted successfully');
      readEvents(); // Refresh events list after deletion
    }
    // If not confirmed, do nothing (which effectively cancels the delete operation)
  };

  useEffect(() => {
    readEvents();
  }, []);


const storage = getStorage();

const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    setEvent({ ...event, event_image: file });
  }
}



;
  return (
    <div>
      <h2 className='flex justify-center font-semibold text-5xl leading-tight mb-5 mt-3'>Admin Panel</h2>
      {/* line height -> leading-none: 1, leading-tight: 1.25, leading-snug: 1.375, leading-normal: 1.5, leading-relaxed: 1.625, leading-loose: 2 */}
      <h3 className=' font-semibold text-xl m-2'>For creating a New Event, fill details:</h3>
      <form>
        <label className='m-2'>New Event Name: &nbsp;</label>
        <input type="text" name="event_name" placeholder="Event Name" value={event.event_name} onChange={handleChange} /><br />   {/*onChange={handleChange} ... this is important for managing the changes */}

        <label className='m-2'>Event Starting Date: &nbsp;</label>
        <input type="date" name="event_start_date" placeholder="Event Starting Date" value={event.event_start_date} onChange={handleChange} /><br />

        <label className='m-2'>Event Ending Date: &nbsp;</label>
        <input type="date" name="event_end_date" placeholder="Event Ending Date" value={event.event_end_date} onChange={handleChange} /><br />

        <label className='m-2'>Event Starting Time: &nbsp;</label>
        <input type="time" name="event_start_time" placeholder="Event Starting Time" value={event.event_start_time} onChange={handleChange} /><br />

        <label className='m-2'>Event Starting Time: &nbsp;</label>
        <input type="time" name="event_end_time" placeholder="Event Ending Time" value={event.event_end_time} onChange={handleChange} /><br />

        <label className='m-2'>Event Image URL: &nbsp;</label>
        <input type="text" name="event_image" placeholder="Event Image" value={event.event_image} onChange={handleChange} /><br />
        {/* the image URL which we are providing in this in admin panel ..... this image should firstly be uploaded into firebase storage and then this image URL should be uploaded into the image URL uploaded*/}
        <label className='m-2'>Event Description: &nbsp;</label>
        <input type="text" name="event_description" placeholder="Event Description" value={event.event_description} onChange={handleChange}  /><br />
        
         {/* <label className='m-2'>Event Image: &nbsp;</label>
       <input type="file" accept="event_image"  onChange={handleImageUpload} />  value={event.event_image}-- this is removed bcz when we give "value'=file to kuch error aa reha tha */}

        
        {/* <input type="text" placeholder="Event ID (for Update/Delete)" value={eventId} onChange={(e) => setEventId(e.target.value)} /> */}
      </form>

      <button className='font-semibold text-xl m-1  px-4 py-2 mt-5 bg-green-600 rounded text-white'  onClick={createEvent}>Create New Event &nbsp; &nbsp;</button>
      {/* <button className='font-semibold text-xl m-1 border border-black px-4 py-2' onClick={readEvents}>Read Events &nbsp; &nbsp; </button>
      <button className='font-semibold text-xl m-1 border border-black px-4 py-2' onClick={updateEvent}>Update Event &nbsp; &nbsp; </button> */}
      {/* <button className='font-semibold text-xl' onClick={deleteEvent}>Delete Event &nbsp; &nbsp; </button> */}  

      <div><br /><br />
        {/* <h3>Events List</h3> */}
        <div className="overflow-x-auto w-full">  {/* using this overflow-x-auto the admin panel form is able to scroll into x direction....a nd width is set to be full*/}
  <table className="min-w-full bg-white">    {/* using this minimum width is set to be full and bg is set as white*/}
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 w-1/6 text-left">Event Name</th>
        <th className="py-3 px-6 w-1/6 text-left">Start Date</th>
        <th className="py-3 px-6 w-1/6 text-left">End Date</th>
        <th className="py-3 px-6 w-1/6 text-left">Start Time</th>
        <th className="py-3 px-6 w-1/6 text-left">End Time</th>
        <th className="py-3 px-6 w-1/6 text-left">Description</th>
        <th className="py-3 px-6 w-1/6 text-left">Image URL</th>
        <th className="py-3 px-6 w-1/6 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-medium">
      {events.map(event => (
        <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-100">
          {editingEvent && editingEvent.id === event.id ? (
            <>
              <td className="py-3 px-6"><input className="w-full" name="event_name" value={editingEvent.event_name} onChange={handleEditChange} /></td>
              <td className="py-3 px-6"><input className="w-full" type="date" name="event_start_date" value={editingEvent.event_start_date} onChange={handleEditChange} /></td>
              <td className="py-3 px-6"><input className="w-full" type="date" name="event_end_date" value={editingEvent.event_end_date} onChange={handleEditChange} /></td>
              <td className="py-3 px-6"><input className="w-full" type="time" name="event_start_time" value={editingEvent.event_start_time} onChange={handleEditChange} /></td>
              <td className="py-3 px-6"><input className="w-full" type="time" name="event_end_time" value={editingEvent.event_end_time} onChange={handleEditChange} /></td>
              <td className="py-3 px-6"><input className="w-full" name="event_description" value={editingEvent.event_description} onChange={handleEditChange} /></td>
              <td className="py-3 px-6"><input className="w-full" name="event_image" value={editingEvent.event_image} onChange={handleEditChange} /></td>
              <td className="py-3 px-6 text-center">
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 ml-2 mb-2" onClick={updateEvent}>Save</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={cancelEdit}>Cancel</button>
              </td>
            </>
          ) : (
            <>
              <td className="py-3 px-6">{event.event_name}</td>
              <td className="py-3 px-6">{event.event_start_date}</td>
              <td className="py-3 px-6">{event.event_end_date}</td>
              <td className="py-3 px-6">{event.event_start_time}</td>
              <td className="py-3 px-6">{event.event_end_time}</td>
              <td className="py-3 px-6">{event.event_description}</td>
              <td className="py-3 px-6">{event.event_image}</td>
              <td className="py-3 px-6 text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 ml-2 mb-2" onClick={() => handleEdit(event)}>Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteEvent(event.id)}>Delete</button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    
      {/* {showModal && (
        <ConfirmModal
          title={modalAction === 'create' ? "Confirm Event Creation" : "Confirm Event Deletion"}
          message={modalAction === 'create' ? "Are you sure you want to create this event?" : "Are you sure you want to delete this event?"}
          onConfirm={confirmAction}
          onCancel={() => setShowModal(false)}
        />
      )} */}
    </div>
  );
};
//The error Firebase Storage: Invalid URL is shown because Firebase Storage expects the URL provided to be a valid and direct URL to an image or a file that it can access and possibly retrieve. However, the URL you've provided is a Google redirect link, not a direct link to an image.
export default AdminComponent;
