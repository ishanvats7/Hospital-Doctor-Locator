const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");

router.get("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital)
      return res.status(404).json({ message: "Hospital not found" });

    const doctors = await Doctor.find({ hospitalId: hospital._id });

    res.json({ ...hospital.toObject(), doctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
