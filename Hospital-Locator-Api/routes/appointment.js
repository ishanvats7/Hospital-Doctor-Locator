const express = require("express");
const Appointment = require("../models/Appointment");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");

const router = express.Router();

/** PHONE VALIDATION (Indian Format) **/
const phoneRegex = /^[6-9]\d{9}$/;

router.post("/", async (req, res) => {
  try {
    const { patientName, mobile, hospitalId, doctorId, date, time } = req.body;

    // Required Fields
    if (!patientName || !mobile || !hospitalId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All fields except doctorId are required",
      });
    }

    // Phone validation
    if (!phoneRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must be 10 digits starting with 6-9",
      });
    }

    // Hospital check
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    // Doctor validation
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || doctor.hospitalId.toString() !== hospitalId) {
      return res.status(400).json({
        success: false,
        message: "Invalid doctor for this hospital",
      });
    }

    // CHECK SLOT ALREADY BOOKED
    const exist = await Appointment.findOne({
      doctorId,
      date,
      time,
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    // CREATE APPOINTMENT
    const newAppointment = await Appointment.create({
      patientName,
      mobile,
      hospitalId,
      doctorId,
      date,
      time,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked. It will be confirmed via phone.",
      appointment: newAppointment,
    });
  } catch (err) {
    console.error("Appointment Creation Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Check if a user has existing bookings
// GET /api/appointments/check?mobile=1234567890
router.get("/check", async (req, res) => {
  try {
    const { mobile } = req.query;

    if (!mobile) {
      return res
        .status(400)
        .json({ success: false, message: "Mobile number required" });
    }

    const existingAppointments = await Appointment.find({ mobile });

    if (existingAppointments.length > 0) {
      return res.json({
        success: true,
        hasBooking: true,
        appointments: existingAppointments,
      });
    } else {
      return res.json({ success: true, hasBooking: false, appointments: [] });
    }
  } catch (err) {
    console.error("Check booking error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
