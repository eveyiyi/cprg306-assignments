export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li className="p-4 border border-gray-200 rounded shadow-sm hover:shadow-lg cursor-pointer" onClick={onSelect}>
      <h4 className="text-lg text-blue-800 font-bold">{name}</h4>
      <p className="text-sm text-gray-700">Quantity: {quantity}</p>
      <p className="text-sm text-gray-700">Category: {category}</p>
    </li>
  );
}
