"use client"
import { useState } from "react";


export default function NewItem() {

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        if (quantity < 20) 
            setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) 
            setQuantity(quantity - 1);
    };

    let buttonStyles = "bg-blue-400 hover:bg-blue-700 text-white rounded-xl py-1 px-4 mt-4";
    let disabledStyles = "bg-gray-400 text-white rounded-xl py-1 px-4 mt-4 hover:bg-gray-400";

    return (
        <div className="flex items-center justify-center  bg-white">
            <div className="flex items-center space-x-2 bg-white p-2 border border-gray-300">
                <span className="text-xl font-bold mr-10 mt-5">{quantity}</span>
                <button 
                    onClick={decrementQuantity}
                    className={`${buttonStyles} ${quantity === 1 ? disabledStyles : ''}`}
                    disabled={quantity === 1}
                >
                    -
                </button>
                <button 
                    onClick={incrementQuantity}
                    className={`${buttonStyles} ${quantity === 20 ? disabledStyles : ''}`}
                    disabled={quantity === 20}
                >
                    +
                </button>
            </div>
        </div>
    );
}


