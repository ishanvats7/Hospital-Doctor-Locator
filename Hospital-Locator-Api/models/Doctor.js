const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  pincode: String,
  fullAddress: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [lng, lat]
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  rating: {
    type: Number,
    default: null,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  timings: {
    morning: String, // e.g. "10AM - 1PM"
    evening: String, // e.g. "6PM - 9PM"
  },
  photoUrl: {
    type: String,
    default: "",
  },
});
DoctorSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Doctor", DoctorSchema);
