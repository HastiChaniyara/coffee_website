const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });



// POST: Add product
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    // Optional: prevent duplicates by name
    const existing = await Product.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = new Product({ name, description, price, imageUrl });
    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

// GET: Show all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// DELETE: Delete product by ID
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});


// PUT: Update product by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updateFields = { name, description, price };
    if (imageUrl) {
      updateFields.imageUrl = imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});


module.exports = router;
