"use client"
import { useState } from "react";


export default function NewItem() {

    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Produce");

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(quantity - 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const item = {name, quantity, category};
        console.log(item);
        alert(`Added item: ${name}, quantity: ${quantity}. category: ${category}`);
        setName("");
        setQuantity(1);
        setCategory("Produce");
    }

    let buttonStyles = "bg-blue-400 hover:bg-blue-700 text-white rounded-xl py-1 px-4 mb-2 mt-4 mr-3";
    let disabledStyles = "bg-gray-400 text-white rounded-xl py-1 px-4 mt-4 hover:bg-gray-400";

    return (
        <main className="bg-black flex justify-center items-start min-h-screen pt-4">
            <form className="p-2 m-4 bg-slate-900 text-black w-full max-w-sm" > {/*onSubmit={handleSubmit}*/}
                <div className="mb-2">
                    <input 
                        type="text"
                        placeholder="Item name"
                        className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center bg-white rounded-lg max-w-sm">
                        <span className="text-xl text-black font-bold mr-10 mt-5">{quantity}</span>
                        <button
                        type="button" 
                    onClick={decrementQuantity}
                    className={`${buttonStyles} ${quantity === 1 ? disabledStyles : ''}`}
                    disabled={quantity === 1}
                >
                    -
                </button>
                <button 
                type="button" 
                    onClick={incrementQuantity}
                    className={`${buttonStyles} ${quantity === 20 ? disabledStyles : ''}`}
                    disabled={quantity === 20}
                >
                    +
                </button>
                    </div>
                    <select 
                        className="ml-1 border-2 border-gray-300 p-4 rounded-lg font-sans"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
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
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                    +
                </button>
            </form>
        </main>
    );



}


