import React from 'react';
import './Styles/Cart.css';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-row fade-in">
      {/* <img src={item.image} alt={item.name} className="cart-image" /> */}
      <img className="cart-image"
  src={item.image ? item.image : `http://coffee-website-83vf.onrender.com/${item.imageUrl}`}
  alt={item.name}
/>
      <span>{item.name}</span>
      {/* <input
        type="number"
        value={item.quantity}
        min="1"
        className="qty-input"
        onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
      /> */}
      <input
        type="number"
        
        min="1"
        value={item.quantity}
        onChange={(e) => onQuantityChange(item._id, parseInt(e.target.value))}
        className="qty-input cart-qty"
      />
      <span>₹{item.price}</span>
      <span>₹{item.quantity * item.price}</span>
      {/* <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button> */}
      <button onClick={() => onRemove(item._id)} className="remove-btn">❌Remove</button>
    </div>
  );
};

export default CartItem;
