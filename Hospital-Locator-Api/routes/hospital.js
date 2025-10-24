const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");

// This api endpoint having GET http verb helps to fetch a hospital detail by passing required id in request parameter (path parameter here not query parameter)
// example-http://localhost:5000/api/hospital/id in this case has been used where id contains required id value, additional info- it's different from query parameter example: http://localhost:5000/api/hospital?id=value (this is not the case used here)
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
