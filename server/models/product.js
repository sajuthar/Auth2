const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: String,
  product_name: String,
  weight: Number,
  mnfDate: Date,
  expDate: Date,
  price: Number,
  stockAvailable: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
