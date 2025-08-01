const mongoose = require("mongoose");
const HospitalSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["hospital", "clinic"], default: "hospital" },
  city: String,
  pincode: String,
  fullAddress: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [lng, lat]
  },
});
HospitalSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Hospital", HospitalSchema);
