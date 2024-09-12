import React, { useState, useEffect } from "react";
import { db } from "../../dbConfig/db";
import {collection,addDoc,getDocs,updateDoc,deleteDoc,doc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AdminNavbar } from "./Adminnavbar";
import AdminHeading from "./AdminHeading";

const AdminEventComponent = () => {
  const [event, setEvent] = useState({
    event_name: "",
    event_start_date: "",
    event_end_date: "",
    event_start_time: "",
    event_end_time: "",
    event_description: "",
    event_image: "",
  });

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  // const handleDeleteEvent = (id) => {
  //   setEventId(id);
  //   setModalAction("delete");
  //   setShowModal(true);
  // };
  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
    }
  };

  const confirmAction = async () => {
    if (modalAction === "create") {
      await createEvent();
    } else if (modalAction === "delete") {
      await deleteEvent(eventId);
    }
    setShowModal(false);
  };
  // this funtion is created in the way that if user directly click ont he create-event button without filling the information about the new event to be created it should through the error of the same
  const createEvent = async () => {
    const {event_name ,event_start_date ,event_end_date ,event_start_time ,event_end_time ,event_image ,event_description } = event;
    // Check if all required fields are filled
    if (!event_name ||!event_start_date ||!event_end_date ||!event_start_time ||!event_end_time ||!event_image ||!event_description) {
      alert("Please fill all the required fields.");
      return;
    }
    
    let imageUrl = event_image;

    if (typeof event_image === "object" && event_image) {
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

    await addDoc(collection(db, "events"), newEvent); //addDoc is basically used to add or fetch the data from the db
    alert("Event created successfully");
    setEvent({  //setEvent with empty values are set so that if once the create event is created the field become empty and get prepared for the creation of next event in the event list
      event_name: "",
      event_start_date: "",
      event_end_date: "",
      event_start_time: "",
      event_end_time: "",
      event_image: "",
      event_description: "",
    }); // Reset form fields
    readEvents(); // Refresh events list after creation
  };

  const readEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const eventsArray = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setEvents(eventsArray);
  };

  const handleEdit = (event) => {
   console.log("handel edit is called");
    setEditingEvent({ ...event });
  };

  const handleEditChange = (e) => {
    console.log("handel edit change is called");
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  const updateEvent = async () => {
    setShowModal(false);
    console.log("update event is called");
    if (!editingEvent) {
      alert("Please select an event to update.");
      return;
    }
  

    const eventDoc = doc(db, "events", editingEvent.id);
    await updateDoc(eventDoc, editingEvent);
    alert("Event updated successfully");
    setEditingEvent(null);
    readEvents();
  };

  const cancelEdit = () => {
    setEditingEvent(null);
  };

  const deleteEvent = async (id) => {
    if (!id) {
      alert("Event ID is required to delete an event.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (isConfirmed) {
      const eventDoc = doc(db, "events", id);
      await deleteDoc(eventDoc);
      alert("Event deleted successfully");
      readEvents();
    }
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
  };

  return (
    <div className="flex flex-col">
      <AdminHeading /> {/* Heading component */}
      <div className="">
        <AdminNavbar /> {/* Sidebar */}
        <div className="p-6">
          <div className="bg-[#DCB44D] bg-opacity-[25%]  ml-36 mr-4 pl-5 pr-5 mx-4 rounded-lg">      {/* Main content area */}
            <h3 className=" mb-4 font-semibold text-3xl text-[#DCB44D] text-center">
            {editingEvent ? "Edit Event" : "Create New Event!"}
            </h3>
            <form className="space-y-4 ">
              <div>
                <label className="m-2 block mb-1">Event Name: &nbsp;</label>
                <input
                  className="border border-grey-200 p-2 m-2 w-full "
                  type="text"
                  name="event_name"
                  placeholder="Type Here"
                  value={editingEvent ? editingEvent.event_name : event.event_name}   // value={event.event_name}
                  onChange={editingEvent ? handleEditChange : handleChange}   // onChange={handleChange}
                />
                <br />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">
                    Event Starting Date: &nbsp;
                  </label>
                  <input
                    className=" border border-grey-200 p-2 m-2 flex flex-row w-full text-sm"
                    type="date"
                    name="event_start_date"
                    placeholder="Event Starting Date"
                    value={editingEvent ? editingEvent.event_start_date : event.event_start_date} // value={event.event_start_date}
                    onChange={editingEvent ? handleEditChange : handleChange} // onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 z-index">
                    Event Ending Date: &nbsp;
                  </label>
                  <input
                    className="border border-grey-200 p-2 m-2 flex flex-row w-full text-sm"
                    type="date"
                    name="event_end_date"
                    placeholder="Event Ending Date"
                    value={editingEvent ? editingEvent.event_end_date : event.event_end_date}  // value={event.event_end_date}
                    onChange={editingEvent ? handleEditChange : handleChange}  // onChange={handleChange} 
                  />
                </div>
                <div>                   {/* Event Time DATA */}
                  <label className="block mb-1">
                    Event Starting Time: &nbsp;
                  </label>
                  <input
                    className="border border-grey-200 p-2 m-2 flex flex-row w-full text-sm"
                    type="time"
                    name="event_start_time"
                    placeholder="Event Starting Time"
                    value={editingEvent ? editingEvent.event_start_time : event.event_start_time} // value={event.event_start_time}
                    onChange={editingEvent ? handleEditChange : handleChange} // onChange={handleChange}
                    
                  />
                </div>
                <div>
                  <label className="block mb-1">
                    Event Ending Time: &nbsp;
                  </label>
                  <input
                    className="border border-grey-200 p-2 m-2 flex flex-row w-full text-sm"
                    type="time"
                    name="event_end_time"
                    placeholder="Event Ending Time"
                    value={editingEvent ? editingEvent.event_start_time : event.event_start_time} // value={event.event_end_time}
                    onChange={editingEvent ? handleEditChange : handleChange}  // onChange={handleChange}
                   
                  />
                </div>
              </div>
              <br />
              <div>
                <label className="block mb-1">Event Image URL: &nbsp;</label>
                <input
                  className="border border-grey-200 p-2 m-2 w-full"
                  type="text"
                  name="event_image"
                  placeholder="Event Image"
                  value={editingEvent ? editingEvent.event_image : event.event_image} // value={event.event_image}
                  onChange={editingEvent ? handleEditChange : handleChange} // onChange={handleChange}
                />
              </div>
              <br />
              {/* the image URL which we are providing in this in admin panel ..... this image should firstly be uploaded into firebase storage and then this image URL should be uploaded into the image URL uploaded*/}
              <div>
                <label className="block mb-1">Event Description: &nbsp;</label>
                <input
                  className="border border-grey-200 p-2 m-2 w-full"
                  type="text"
                  name="event_description"
                  placeholder="Event Description"
                  value={editingEvent ? editingEvent.event_description : event.event_description} // value={event.event_description}
                  onChange={editingEvent ? handleEditChange : handleChange} // onChange={handleChange}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="md:w-1/5 sm:w-2/5 font-semibold text-xl p-2 rounded mt-2 mb-4 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={
                  (editingEvent && (
                    !editingEvent.event_name ||
                    !editingEvent.event_start_date ||
                    !editingEvent.event_end_date ||
                    !editingEvent.event_start_time ||
                    !editingEvent.event_end_time ||
                    !editingEvent.event_image ||
                    !editingEvent.event_description
                  )) ||
                  (!editingEvent && (
                    !event.event_name ||
                    !event.event_start_date ||
                    !event.event_end_date ||
                    !event.event_start_time ||
                    !event.event_end_time ||
                    !event.event_image ||
                    !event.event_description
                  ))
                  } //here event.__ will be used instaed of events bcz we are concentrated on one event only while we are filling form
                  onClick={() => {
                    setModalAction(editingEvent ? "update" : "create"); // setModalAction("create");
                    setShowModal(true);
                  }}
                >
                   {/* new changes done */}
                  {editingEvent ? "Update Event" : "Create Event"} {/* Create Event */}
                </button>
                {/* {editingEvent && (
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                )} */}

              </div>
            </form>
          </div>

          <div className="mt-8 ml-36 mr-4">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-[#DCB44D]">
                      Event Name
                    </th>
                    <th className="px-4 py-2 text-[#DCB44D]">
                      Start Date
                    </th>
                    <th className="px-4 py-2 text-[#DCB44D]">
                      End Date
                    </th>
                    <th className="px-4 py-2 text-[#DCB44D]">
                      Start Time
                    </th>
                    <th className="px-4 py-2 text-[#DCB44D]">
                      End Time
                    </th>
                    <th className="px-4 py-2 text-[#DCB44D]">
                      Description
                    </th>
                    <th className="px-4 py-2 text-[#DCB44D]">
                      Event URL
                    </th>
                    <th className="px-4 py-2 text-[#DCB44D]">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* <tbody className="text-gray-600 text-sm font-medium border border-gray-200  ">
                  {events.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      {editingEvent && editingEvent.id === e.id ? (
                        <>
                          <td className="py-3 px-6">
                            <input
                              className="w-full"
                              name="event_name"
                              value={editingEvent.event_name}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td className="py-3 px-6">
                            <input
                              className="w-full"
                              type="date"
                              name="event_start_date"
                              value={editingEvent.event_start_date}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td className="py-3 px-6">
                            <input
                              className="w-full"
                              type="date"
                              name="event_end_date"
                              value={editingEvent.event_end_date}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td className="py-3 px-6">
                            <input
                              className="w-full"
                              type="time"
                              name="event_start_time"
                              value={editingEvent.event_start_time}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td className="py-3 px-6">
                            <input
                              className="w-full"
                              type="time"
                              name="event_end_time"
                              value={editingEvent.event_end_time}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td className="py-3 px-6">
                            <input
                              className="w-full"
                              name="event_description"
                              value={editingEvent.event_description}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td className="py-3 px-6">
                            <input
                              className="w-full"
                              name="event_image"
                              value={editingEvent.event_image}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td className="py-3 px-6 text-center">
                            <button
                              className="bg-green-500 text-white px-4 py-2 rounded mr-2 ml-2 mb-2"
                              onClick={updateEvent}
                            >
                              Save
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-6 ">{e.event_name}</td>
                          <td className="py-3 px-6 ">{e.event_start_date}</td>
                          <td className="py-3 px-6 ">{e.event_end_date}</td>
                          <td className="py-3 px-6 ">{e.event_start_time}</td>
                          <td className="py-3 px-6 ">{e.event_end_time}</td>
                          <td className="py-3 px-6 ">{e.event_description}</td>
                          <td className="py-3 px-6 ">{e.event_image}</td>
                          <td className="py-3 px-6  text-center">
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 ml-2 mb-2"
                              onClick={() => handleEdit(e)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded"
                              onClick={() => deleteEvent(e.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody> */}
                <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.event_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.event_start_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.event_end_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.event_start_time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.event_end_time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.event_description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.event_image}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 my-2 "
                        onClick={() => handleEdit(event)}
                        // onClick={updateEvent}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded "
                        onClick={() => handleDeleteEvent(event.id)}
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

          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-md">
                <h3 className="text-lg font-semibold">
                  {/* {modalAction === "create"? "Create Event": "Confirm Deletion"} */}
                  {modalAction === "delete" ? "Confirm Delete" : modalAction === "update" ? "Confirm Update" : "Confirm Create"}
                </h3>
                <p className="mt-2">
                  {/* {modalAction === "create"
                    ? "Are you sure you want to create this event?"
                    : "Are you sure you want to delete this event?"} */}
                    Are you sure you want to {modalAction} this event?
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={updateEvent}
                  >
                    {/* {modalAction === "create" ? "Create" : "Yes, Delete"} */}
                    Confirm
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminEventComponent;
