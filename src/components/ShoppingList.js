import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectCategories, selectItems } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function ShoppingList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  const items = useSelector(selectItems);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState(1);

  const handleAddItem = () => {
    if (!selectedCategory || !productName || amount < 1) {
      alert('Please fill all fields');
      return;
    }
    
    const newItem = {
      id: Date.now().toString(),
      name: productName,
      category: selectedCategory,
      amount: parseInt(amount, 10)
    };
    
    dispatch(addItem(newItem));
    setProductName('');
    setAmount(1);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleProceedToOrder = () => {
    if (items.length === 0) {
      alert('Your cart is empty 🥺🥺');
      return;
    }
    navigate('/order');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Shopping List</h2>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Product</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          
          <div className="w-32">
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="self-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleAddItem}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      {items.length > 0 ? (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-medium mb-4">Cart Items</h3>
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({item.category})</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">Qty: {item.amount}</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 text-right">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={handleProceedToOrder}
            >
              Proceed to Order
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;