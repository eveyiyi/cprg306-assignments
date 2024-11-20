"use client";
import { useState, useEffect } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";

function removeInvalidChars(str) {
  return str.replace(/[\uE000-\uF8FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
}

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user } = useUserAuth();
  


  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleItemSelect = (item) => {
    const cleanName = removeInvalidChars(item.name).replace(/[^a-zA-Z ]/g, "").trim();
    setSelectedItemName(cleanName);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className="flex">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold text-center mt-4 mb-4">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
      <div className="w-1/2">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
