//fetchEventData function is intended to fetch event data from Firestore and then retrieve image URLs from Firebase Storage. 
import { collection, getDocs } from "firebase/firestore";
import { db , storage} from "../../../dbConfig/db";  // storage is used to fetch the URL of images stored in Firebase Storage and add it to the event data fetched from Firestore.
import { ref, getDownloadURL } from "firebase/storage";


const fetchEventData = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));  //fetches all documents from the events collection.
    const events = [];  //fetches all documents from the events collection....this array is kept empty for initiallisation and no need to add the data manually and the data will be fetched from the firebase itself


    for (const doc of querySnapshot.docs) {
      const data = doc.data(); // Get the data of each document... retrieves the data of each document.
      const event_date = data.event_date ? data.event_date.toDate().toLocaleDateString() : "";  //converted to readable strings.
      const event_time = data.event_time ? data.event_time.toDate().toLocaleTimeString() : "";  //converted to readable strings.

    // Create a reference to the image in Firebase Storage
    const imageRef = ref(storage, data.event_image); // Assuming `data.event_image` stores the image path in Firebase Storage
    let imageUrl = "";

    try {
      imageUrl = await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Error getting image URL:", error);
    }

      events.push({
        ...data, // Spread the document data
        event_date,
        event_time,  //adds into the document data
        event_image: imageUrl, // Add the image URL to the event data
      });
    }
    // console.log("Fetched Event Data:", events); 
    return events;
  };
  
  export default fetchEventData;