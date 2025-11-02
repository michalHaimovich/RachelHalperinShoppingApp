import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectOrderDetails, updateOrderDetails, clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function OrderDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectItems);
  const orderDetails = useSelector(selectOrderDetails);
  
  const [formData, setFormData] = useState({
    fullName: orderDetails.fullName || '',
    address: orderDetails.address || '',
    email: orderDetails.email || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    // Update order details in Redux
    dispatch(updateOrderDetails(formData));
    
    // Prepare data for submission
    const orderData = {
      ...formData,
      items: items
    };
    
    setIsSubmitting(true);
    
    try {
      // Send order to Node.js backend
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit order');
      }
      
      // Order submitted successfully
      dispatch(clearCart());
      alert('Order submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="fullName">
              Full Name *
            </label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full p-2 border rounded"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label className="block text-sm font-medium mb-1" htmlFor="fullName">
              Phone Number * 

            </label>
            
            <input
            type="number"

            />
            
            

          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              className="w-full p-2 border rounded"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <h3 className="text-lg font-medium mb-2 mt-6">Order Summary</h3>
          {items.length > 0 ? (
            <div className="border rounded mb-4">
              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item.id} className="p-3 flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({item.category})</span>
                    </div>
                    <span>Qty: {item.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center p-4 border rounded mb-4">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          )}
          
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={() => navigate('/')}
            >
              Back to Shopping
            </button>
            
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              disabled={isSubmitting || items.length === 0}
            >
              {isSubmitting ? 'Processing...' : 'Send Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderDetails;