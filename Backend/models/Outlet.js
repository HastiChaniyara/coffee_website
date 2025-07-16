const mongoose = require('mongoose');

const outletSchema = new mongoose.Schema({
  city: String,
  outlet: String,
  address: String,
  phone: String,
  year: Number,
  map: String,
});

module.exports = mongoose.model('Outlet', outletSchema);
