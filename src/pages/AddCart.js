import React, { useContext } from 'react';
import { CartContext } from '../helpers/CartContext';
import { FaTrash } from 'react-icons/fa';

const AddCart = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);

  const updatedCart = cart.map(item => ({
    ...item,
    quantity: item.quantity || 1
  }));

  const updateQuantity = (item, delta) => {
    const newCart = updatedCart.map(i =>
      i.name === item.name
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
    );
    setCart(newCart);
  };

  const getSubtotal = () =>
    updatedCart.reduce(
      (total, item) => total + item.quantity * parseFloat(item.price),
      0
    );

  const getTax = () => getSubtotal() * 0.1;
  const getShipping = () => 40;
  const getTotalPrice = () =>
    (getSubtotal() + getTax() + getShipping()).toFixed(2);

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">🛒 Your Cart</h1>

        {updatedCart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-8">
              {updatedCart.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-xl border shadow hover:shadow-lg transition-transform duration-300 transform hover:scale-[1.01] p-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0 rounded-lg overflow-hidden border mb-4 sm:mb-0 sm:mr-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'}
                      alt={item.name}
                      className="!w-full !h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div className="mb-2">
                      <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-green-600 text-lg font-bold">${Number(item.price).toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                        <button
                          onClick={() => updateQuantity(item, -1)}
                          className="w-9 h-9 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full shadow transition"
                        >
                          −
                        </button>
                        <span className="text-xl font-medium text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item, 1)}
                          className="w-9 h-9 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full shadow transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Delivery & Remove */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-4 sm:mt-0">
                        <p className="text-sm text-gray-500">🚚 Delivery within 20 minutes</p>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="flex items-center text-red-500 hover:text-red-600 font-semibold transition mt-2 sm:mt-0"
                        >
                          <FaTrash className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pricing Breakdown */}
            <div className="mt-10 border-t pt-6 space-y-4 text-gray-700 text-lg">
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Tax (10%):</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Shipping:</span>
                <span>${getShipping().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-2xl border-t pt-4 text-blue-700">
                <span>Total:</span>
                <span>${getTotalPrice()}</span>
              </div>
            </div>

            {/* Checkout */}
            <div className="mt-10 text-right">
              <button
                onClick={handleCheckout}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3 rounded-full text-xl shadow-lg transition transform hover:scale-105"
              >
                🧾 Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddCart;
