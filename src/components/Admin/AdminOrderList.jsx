import React, { useState, useEffect } from "react";
import "./StylesAdmin/AdminOrderList.css";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
const [editAddress, setEditAddress] = useState('');
const [editableItems, setEditableItems] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`http://localhost:5000/api/orders/${id}`)
        .then(() => setOrders(orders.filter((order) => order._id !== id)))
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  const handleUpdateOrder = async () => {
  try {
    await axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, {
      address: editAddress,
      cartItems: editableItems,
    });

    setEditingOrder(null);
    setEditAddress('');
    setEditableItems([]);

    // Refresh orders
    const res = await axios.get("http://localhost:5000/api/orders");
    setOrders(res.data);
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update order.");
  }
};

  return (
    <>
      <AdminSidebar />

      <div className="order-list-container">
        {/* <h2 className="list-title">📦 Order List</h2> */}
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Shipping Address</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
        <tbody>
  {orders.length > 0 ? (
    orders.map((order, orderIndex) =>
      order.cartItems.map((item, itemIndex) => (
        <tr key={`${order._id}-${itemIndex}`}>
          {/* Only show Order ID and user info on first item of each order */}
          {itemIndex === 0 ? (
            <>
              <td rowSpan={order.cartItems.length}>{orderIndex + 1}</td>
              <td rowSpan={order.cartItems.length}>{order.user?.name}</td>
              <td rowSpan={order.cartItems.length}>{order.user?.email}</td>
              <td rowSpan={order.cartItems.length}>{order.address}</td>
            </>
          ) : null}

          <td>{item.name}</td>
          <td>{item.quantity || 1}</td>
          <td>₹{item.price}</td>
          <td>₹{(item.price * (item.quantity || 1)).toFixed(2)}</td>

          {/* Only show delete button on first row of each order */}
          {itemIndex === 0 ? (
            <td rowSpan={order.cartItems.length}>
               <button
  className="action-button edit"
  onClick={() => {
    setEditingOrder(order);
    setEditAddress(order.address);
    setEditableItems(order.cartItems);
  }}
  title="Edit"
>
  ✏️
</button>
                        <button className="action-button delete" onClick={() => handleDelete(order._id)} title="Delete">🗑️</button>
                      
            </td>
          ) : null}
        </tr>
      ))
    )
  ) : (
    <tr>
      <td colSpan="9" className="no-data">
        No orders available
      </td>
    </tr>
  )}
</tbody>

        </table>
        {editingOrder && (
  <div className="popup-overlay">
  <div className="popup-box">
    <h3>Edit Order</h3>
    <p><strong>User:</strong> {editingOrder.user?.name}</p>
    <p><strong>Email:</strong> {editingOrder.user?.email}</p>

    <label><strong>Shipping Address:</strong></label>
    <textarea
      value={editAddress}
      onChange={(e) => setEditAddress(e.target.value)}
      rows="3"
      placeholder="Update shipping address"
    />

    <h4>Cart Items</h4>
    <table className="edit-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {editableItems.map((item, index) => (
          <tr key={index}>
            <td>
              <input
                type="text"
                value={item.name}
                onChange={(e) => {
                  const newItems = [...editableItems];
                  newItems[index].name = e.target.value;
                  setEditableItems(newItems);
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={item.quantity !== undefined ? item.quantity : 1}
                // value={item.quantity || 1}
                onChange={(e) => {
                  const newItems = [...editableItems];
                  newItems[index].quantity = parseInt(e.target.value);
                  setEditableItems(newItems);
                }}
              />
            </td>
            <td>
              <input
                type="number"
                // value={item.price}
                value={item.price !== undefined ? item.price : 0}
                onChange={(e) => {
                  const newItems = [...editableItems];
                  newItems[index].price = parseFloat(e.target.value);
                  setEditableItems(newItems);
                }}
              />
            </td>
            <td>₹{(item.quantity * item.price).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="popup-actions">
      <button className="cancel-btn" onClick={() => setEditingOrder(null)}>
        Cancel
      </button>
      <button className="confirm-btn" onClick={handleUpdateOrder}>
        Save Changes
      </button>
    </div>
  </div>
</div>

)}

      </div>
    </>
  );
};

export default AdminOrderList;
