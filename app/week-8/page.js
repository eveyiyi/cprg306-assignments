"use client";
import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";

function removeInvalidChars(str) {
  return str.replace(/[\uE000-\uF8FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
}

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (item) => {
    setItems([...items, item]); // Add new item to the list
  };

  const handleItemSelect = (item) => {
    // Clean up the item name by removing extra details and emojis
    const rawName = item.name.split(",")[0];
    const cleanName = removeInvalidChars(rawName)
      .replace(/[^a-zA-Z ]/g, "")
      .trim();
    console.log("Selected ingredient (cleaned):", cleanName);
    setSelectedItemName(cleanName);
  };

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
