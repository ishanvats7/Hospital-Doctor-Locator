const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const { getDoctorSlots } = require("../utils/timeSlots");

const router = express.Router();

// GET /api/slots?doctorId=XXX&date=YYYY-MM-DD
router.get("/", async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message: "doctorId and date are required",
      });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // All possible slots for the doctor
    const allSlots = getDoctorSlots(doctor.timings);

    // Already booked appointments
    const booked = await Appointment.find({ doctorId, date }).select("time");
    const bookedTimes = booked.map((b) => b.time);

    // Only show available slots
    const available = allSlots.filter((slot) => !bookedTimes.includes(slot));

    res.json({
      success: true,
      doctorId,
      date,
      availableSlots: available,
    });
  } catch (err) {
    console.error("Slot fetch error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;