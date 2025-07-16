const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const outletRoutes = require('./routes/outletRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


dotenv.config();
const mongoURI = process.env.MONGO_URI;

const app = express();
// app.use(cors());
app.use(cors({
  origin: "https://coffeeweb.netlify.app",
  credentials: true
}));


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/uploads", express.static("uploads")); 
app.use("/api/products", productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/outlets', outletRoutes);
app.use('/api/', contactRoutes);
app.use('/api/', dashboardRoutes);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.error(err));
