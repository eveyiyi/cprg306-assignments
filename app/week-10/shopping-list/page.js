"use client";
import { useState, useEffect } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

function removeInvalidChars(str) {
  return str.replace(/[\uE000-\uF8FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
}

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user } = useUserAuth();

  // Fetch items
  useEffect(() => {
    if (user) {
      const fetchItems = async () => {
        const fetchedItems = await getItems(user.uid);
        setItems(fetchedItems);
      };
      fetchItems();
    }
  }, [user]);

  // Handle adding a new item
  const handleAddItem = async (newItem) => {
    if (user) {
      const newItemId = await addItem(user.uid, newItem);
      if (newItemId) {
        setItems((prevItems) => [...prevItems, { ...newItem, id: newItemId }]);
      }
    }
  };

  // Handle selecting an item
  const handleItemSelect = (item) => {
    const cleanName = removeInvalidChars(item.name)
      .replace(/[^a-zA-Z ]/g, "")
      .trim();
    setSelectedItemName(cleanName);
  };

  // Show loading if the user is not authenticated yet
  if (!user) return <p>Loading...</p>;

  return (
    <main className="flex">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold text-center mt-4 mb-4">
          Shopping List
        </h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
      <div className="w-1/2">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
