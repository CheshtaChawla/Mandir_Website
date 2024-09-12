import { collection, getDocs } from "firebase/firestore";
import { db , storage} from "../../../dbConfig/db";  // storage is used to fetch the URL of images stored in Firebase Storage and add it to the event data fetched from Firestore.
import { ref, getDownloadURL } from "firebase/storage";


const fetchCommitteeData = async () => {
    const querySnapshot = await getDocs(collection(db, "committees"));  //fetches all documents from the events collection.
    const committees = [];  //fetches all documents from the events collection....this array is kept empty for initiallisation and no need to add the data manually and the data will be fetched from the firebase itself


    for (const doc of querySnapshot.docs) {
      const data = doc.data(); // Get the data of each document... retrieves the data of each document.

    // Create a reference to the image in Firebase Storage
    const imageRef = ref(storage, data.image); // Assuming `data.event_image` stores the image path in Firebase Storage
    let imageUrl = "";

    try {
        imageUrl  = await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Error getting image URL:", error);
    }

    committees.push({
        ...data, // Spread the document data

        image:imageUrl,
        title:data.title,
        subtitle:data.subtitle,      });
    }
    // console.log("Fetched Event Data:", events); 
    return committees;

};
export default fetchCommitteeData;