import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/MyOrderPage.css';
import VideoBanner from './VideoBanner';
import Navbar from './Navbar';
import Footer from './Footer';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
 const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?._id; // ✅ FIXED: because your _id is top-level

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://coffee-website-83vf.onrender.com/api/orders');
const userOrders = res.data.filter(order => {
  if (typeof order.user === 'string') return order.user === userId;
  if (typeof order.user === 'object' && order.user._id) return order.user._id === userId;
  
  
  return false;
});
setOrders(userOrders);

      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <>
      <VideoBanner />
      <Navbar />
      <div className="orders-container">
        <h1 className="orders-title">📦 My Orders</h1>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card fade-in">
                <div className="order-info">
                  <p><strong>🗓️ Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>💰 Total:</strong> ₹{order.totalAmount}</p>
                  <p><strong>🚚 Status:</strong> Confirmed</p>
                  <p><strong>📍 Shipping:</strong> {order.address}</p>
                </div>
                <div className="order-products">
                  <h4>🛒 Ordered Items:</h4>
                  <ul>
                    {order.cartItems.map((product, index) => (
                      <li key={index}>
                        {product.name} × {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
