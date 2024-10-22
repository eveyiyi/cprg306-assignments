"use client";
import React, { useState } from "react";
import Item from "./item";
import items from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = items.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div>
      <div
        className="buttons"
        style={{ padding: "15px", marginBottom: "15px" }}
      >
        <span className="font-bold">Sort by: </span>
        <button
          className={`btn mr-10 ml-5 ${
            sortBy === "name"
              ? "bg-blue-700 text-white"
              : "bg-yellow-200 text-white"
          }`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>
        <button
          className={`btn ${
            sortBy === "category"
              ? "bg-blue-700 text-white"
              : "bg-yellow-200 text-white"
          }`}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
      </div>
      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <Item
            key={item.id} // Add key
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}
