import React, { useState } from 'react';
import './Styles/Cart.css';
import CartItem from './CartItem'; 
import VideoBanner from './VideoBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import PlaceOrderPage from './PlaceOrderPage';

const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
});

  const [showOrderPage, setShowOrderPage] = useState(false); 

  // const handleQuantityChange = (id, newQuantity) => {
  //   setCartItems(prev =>
  //     prev.map(item =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  const handleQuantityChange = (id, newQuantity) => {
  const updated = cartItems.map(item =>
    item._id === id ? { ...item, quantity: newQuantity } : item
  );
  setCartItems(updated);
  localStorage.setItem('cart', JSON.stringify(updated));
};

  const handleRemove = (id) => {
  const updated = cartItems.filter(item => item._id !== id);
  setCartItems(updated);
  localStorage.setItem('cart', JSON.stringify(updated));
};

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

const handlePlaceOrder = () => {
  // Clear localStorage and cartItems from state
  // localStorage.removeItem('cart');
  // setCartItems([]);
  setShowOrderPage(true); // Then redirect to order page
};
if (showOrderPage) {
  return <PlaceOrderPage cartItems={cartItems} />;
}

  return (
    <>
      <VideoBanner />
      <Navbar />
      <div className="cart-container">
        <h2 className="cart-title">🛒 Your Coffee Cart</h2>
        <div className="cart-header">
          <span>Image</span>
          <span>Product</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Total</span>
          <span>Action</span>
        </div>
        {cartItems.map(item => (
         <CartItem
  key={item._id} // not item.id
  item={item}
  onQuantityChange={handleQuantityChange}
  onRemove={handleRemove}
/>
        ))}
        <div className="cart-footer">
          <h3>Total: ₹{getTotal()}</h3>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
