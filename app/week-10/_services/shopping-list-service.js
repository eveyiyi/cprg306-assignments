import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// Function to get all items for a specific user
export const getItems = async (userId) => {
    try {
      const itemsRef = collection(db, "users", userId, "items");
      const q = query(itemsRef);  // If you need to apply more filters, modify the query here
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      console.error("Failed to fetch items:", error);
      return [];
    }
  };
  
  // Function to add a new item to a specific user's list
  export const addItem = async (userId, item) => {
    try {
      const itemsRef = collection(db, "users", userId, "items");
      const docRef = await addDoc(itemsRef, item);
      return docRef.id;  // returns the newly created document's ID
    } catch (error) {
      console.error("Failed to add item:", error);
      return null;  // handle the error accordingly in your UI
    }
  };