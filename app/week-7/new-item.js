"use client";
import { useState } from "react";

// Custom function to generate an ID similar to "2KJH3k2j3H1k2J3K1H"
const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 17; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function NewItem({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 20));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = {
      id: generateRandomId(),
      name,
      quantity,
      category,
    };
    onAddItem(item);
    setName("");
    setQuantity(1);
    setCategory("Produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-200 rounded-lg shadow-sm w-full max-w-xs mx-auto"
    >
      <div className="mb-2">
        <input
          type="text"
          placeholder="Item name"
          className="w-full p-2 border rounded-lg"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-2xl">{quantity}</span>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={decrementQuantity}
            className="text-2xl p-2 bg-gray-400 rounded-lg w-10 h-10 flex items-center justify-center disabled:bg-gray-200"
            disabled={quantity === 1}
          >
            -
          </button>
          <button
            type="button"
            onClick={incrementQuantity}
            className="text-2xl p-2 bg-gray-400 rounded-lg w-10 h-10 flex items-center justify-center disabled:bg-gray-200"
            disabled={quantity === 20}
          >
            +
          </button>
        </div>
      </div>
      <div className="mb-2">
        <select
          className="w-full p-2 border rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Frozen Foods">Frozen Foods</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Dry Goods">Dry Goods</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg"
      >
        Add Item
      </button>
    </form>
  );
}
