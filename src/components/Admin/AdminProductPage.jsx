import React, { useState } from "react";
import "./StylesAdmin/AdminProductPage.css";
import AdminSidebar from './AdminSidebar';
import { useNavigate } from "react-router-dom";

const AdminProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    imagePreview: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({
        ...product,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);

    try {
      const res = await fetch("http://coffee-website-83vf.onrender.com/api/products/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.message}`);
        setLoading(false);
        return;
      }

      alert("Product submitted successfully!");
      console.log(data);

      // Reset form
      setProduct({
        name: "",
        description: "",
        price: "",
        image: null,
        imagePreview: "",
      });
    } catch (err) {
      console.error("Error submitting product:", err);
      alert("Something went wrong while submitting the product.");
    } finally {
      setLoading(false);
    }
  };

  const handleshowProducts = () => {
    navigate('/Admin/ShowProduct');
  };

  return (
    <>
      <AdminSidebar />

      <div className="admin-containerr">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Add New Coffee Product</h2>

          <div className="form-group">
            <label>Product Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {product.imagePreview && (
              <img
                src={product.imagePreview}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>

          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="e.g. Espresso Classic"
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              placeholder="Write product description..."
            ></textarea>
          </div>

          <div className="form-group">
            <label>Price (Rs.):</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </button>

          <button
            type="button"
            className="submit-button showbtn"
            onClick={handleshowProducts}
          >
            Show Products
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminProductPage;
