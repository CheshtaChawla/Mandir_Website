//fetchEventData function is intended to fetch event data from Firestore and then retrieve image URLs from Firebase Storage. 
import { collection, getDocs } from "firebase/firestore";
import { db , storage} from "../../../dbConfig/db";  // storage is used to fetch the URL of images stored in Firebase Storage and add it to the event data fetched from Firestore.
import { ref, getDownloadURL } from "firebase/storage";


const fetchAboutUsData = async () => {
    const querySnapshot = await getDocs(collection(db, "aboutUs"));  //fetches all documents from the events collection.
    const AboutUs = [];  //fetches all documents from the events collection....this array is kept empty for initiallisation and no need to add the data manually and the data will be fetched from the firebase itself


    for (const doc of querySnapshot.docs) {
      const data = doc.data(); // Get the data of each document... retrieves the data of each document.

    // Create a reference to the image in Firebase Storage
    const imageRef = ref(storage, data.image);
    let imageUrl = "";

    try {
        imageUrl  = await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Error getting image URL:", error);
    }

      AboutUs.push({
        ...data, // Spread the document data

        image:imageUrl,
        paragraph:data.paragraph,
      });
    }
    // console.log("Fetched Event Data:", events); 
    return AboutUs;
  };
  
  export default fetchAboutUsData;