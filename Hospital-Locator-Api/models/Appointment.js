const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null, // optional — since your modal doesn't choose doctor yet
    },

    date: {
      type: String, // yyyy-mm-dd
      required: true,
    },

    time: {
      type: String, // "12:30"
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);