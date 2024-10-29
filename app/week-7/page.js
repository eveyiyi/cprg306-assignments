"use client";
import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (item) => {
    setItems([...items, item]); // Add new item to the list
  };

  return (
    <main>
      <h1 className="text-2xl font-bold text-center mt-4 mb-4">
        Shopping List
      </h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}
