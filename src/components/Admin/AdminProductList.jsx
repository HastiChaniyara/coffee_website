import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./StylesAdmin/AdminProductList.css";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          setProducts((prev) => prev.filter((p) => p._id !== id));
        })
        .catch((err) => {
          console.error("Delete failed:", err);
        });
    }
  };

  const handleEdit = (product) => {
    console.log("Editing product:", product);
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("description", editingProduct.description);
    formData.append("price", editingProduct.price);

    // Only append image if it's a File (i.e., new image selected)
    if (editingProduct.image instanceof File) {
      formData.append("image", editingProduct.image);
    }

    await axios.put(
      `http://localhost:5000/api/products/${editingProduct._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    fetchProducts();
    handleModalClose();
    alert("Product updated successfully!");
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update product.");
  }
};

  return (
    <>
      <AdminSidebar />

      <div className="product-list-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price (Rs.)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${product.imageUrl}`}
                      alt={product.name}
                      className="product-img"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{parseFloat(product.price).toFixed(2)}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(product)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(product._id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     {showModal && editingProduct && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      background: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      animation: "fadeIn 0.3s ease-in-out",
    }}
  >
    <div
      style={{
        background: "#fff8f0",
        padding: "25px",
        width: "420px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        animation: "slideUp 0.4s ease-out",
        fontFamily: "Verdana, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "18px", color: "#6f4e37" }}>☕ Edit Coffee Product</h2>
      <form onSubmit={handleEditSubmit}>
        <label style={{ fontWeight: "bold", color: "#4e342e" }}>Product Name</label>
        <input
          type="text"
          name="name"
          value={editingProduct.name}
          onChange={handleEditChange}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <label style={{ fontWeight: "bold", color: "#4e342e" }}>Description</label>
        <textarea
          name="description"
          value={editingProduct.description}
          onChange={handleEditChange}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <label style={{ fontWeight: "bold", color: "#4e342e" }}>Price (Rs.)</label>
        <input
          type="number"
          name="price"
          value={editingProduct.price}
          onChange={handleEditChange}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Image Upload */}
        <label style={{ fontWeight: "bold", color: "#4e342e" }}>Change Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setEditingProduct({
                ...editingProduct,
                image: file,
                imageUrl: imageUrl,
              });
            }
          }}
          style={{
            marginBottom: "10px",
            fontSize: "14px",
          }}
        />
        {editingProduct.imageUrl && (
          <img
            src={
              editingProduct.image instanceof File
                ? editingProduct.imageUrl
                : `http://localhost:5000/${editingProduct.imageUrl}`
            }
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "12px",
              border: "1px solid #ccc",
            }}
          />
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "#6f4e37",
              color: "white",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleModalClose}
            style={{
              backgroundColor: "#ccc",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </>
  );
};

export default AdminProductList;