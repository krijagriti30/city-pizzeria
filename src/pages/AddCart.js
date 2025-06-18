import React, { useContext, useState } from 'react';
import { CartContext } from '../helpers/CartContext';
import { FaTrash, FaMoon, FaSun } from 'react-icons/fa';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import CheckoutForm from './checkoutform';

const AddCart = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [darkMode, setDarkMode] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const updatedCart = cart.map(item => ({
    ...item,
    quantity: item.quantity || 1,
  }));

  const updateQuantity = (item, delta) => {
    const newCart = updatedCart.map(i =>
      i.name === item.name
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
    );
    setCart(newCart);
  };

  const saveCartToFirebase = async () => {
    try {
      await setDoc(doc(db, 'carts', 'currentUserCart'), { items: updatedCart });
      alert('🛒 Cart saved to Firebase!');
    } catch (error) {
      alert('❌ Error saving cart: ' + error.message);
    }
  };

  const getSubtotal = () =>
    updatedCart.reduce((total, item) => total + item.quantity * parseFloat(item.price), 0);

  const getTax = () => getSubtotal() * 0.1;
  const getShipping = () => 40;
  const getTotalPrice = () => (getSubtotal() + getTax() + getShipping()).toFixed(2);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const themeStyles = {
    backgroundColor: darkMode ? '#1a202c' : '#f7fafc',
    color: darkMode ? '#e2e8f0' : '#1a202c',
  };

  if (showCheckout) {
    return <CheckoutForm />;
  }

  return (
    <div style={{ ...themeStyles, minHeight: '100vh', padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '32px' }}>🛒 Your Cart</h1>
        <button onClick={toggleDarkMode} style={{ fontSize: '20px', cursor: 'pointer' }}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {updatedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {updatedCart.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '16px',
                width: '250px',
                textAlign: 'center',
                background: darkMode ? '#2d3748' : '#fff',
              }}
            >
              <img
                src={item.image || 'https://via.placeholder.com/200'}
                alt={item.name}
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200';
                }}
              />
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <div>
                <button onClick={() => updateQuantity(item, -1)}>-</button>
                <button onClick={() => updateQuantity(item, 1)}>+</button>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                style={{ marginTop: '10px', color: 'red', cursor: 'pointer' }}
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {updatedCart.length > 0 && (
        <>
          <div style={{ marginTop: '40px', fontSize: '18px' }}>
            <p>Subtotal: ₹{getSubtotal().toFixed(2)}</p>
            <p>Tax (10%): ₹{getTax().toFixed(2)}</p>
            <p>Shipping: ₹{getShipping().toFixed(2)}</p>
            <h3>Total: ₹{getTotalPrice()}</h3>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setShowCheckout(true)}
              style={{
                backgroundColor: '#3182ce',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '18px',
                marginRight: '10px',
              }}
            >
              🧾 Proceed to Checkout
            </button>
            <button
              onClick={saveCartToFirebase}
              style={{
                backgroundColor: '#38a169',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '18px',
              }}
            >
              🔄 Save Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCart;
