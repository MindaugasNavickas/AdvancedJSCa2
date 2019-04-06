const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  engineSize: Number,
  fuelType: String,
  price: String,
  description: String,
  picture: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
