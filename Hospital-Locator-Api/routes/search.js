const express = require("express");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const {
      name = "",
      city = "",
      pincode = "",
      specialization = "",
      page = 1,
      limit = 20,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (city) query.city = { $regex: city, $options: "i" };

    if (pincode) {
      query.pincode = pincode;
    }

    // Step 1: If filtering by specialization, get hospitalIds that have such doctors
    if (specialization) {
      const doctorHospitalIds = await Doctor.distinct("hospitalId", {
        specialization: { $regex: specialization, $options: "i" },
      });

      if (doctorHospitalIds.length === 0) {
        return res.json({ results: [] });
      }

      query._id = {
        $in: doctorHospitalIds.map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    // Step 2: Find hospitals with applied filters and pagination
    const hospitalsRaw = await Hospital.find(query).lean();

    const hospitalsWithDocCount = await Promise.all(
      hospitalsRaw.map(async (hospital) => {
        const specializations = await Doctor.distinct("specialization", {
          hospitalId: hospital._id,
        });

        return {
          ...hospital,
          specializations,
          specializationCount: specializations.length,
        };
      })
    );

    // Sort: Clinics (1 specialization) first, then multispeciality hospitals
    const sorted = hospitalsWithDocCount.sort(
      (a, b) => a.specializationCount - b.specializationCount
    );

    // Pagination after sort
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginated = sorted.slice(start, start + parseInt(limit));

    res.json({ results: paginated });
    /* 
    const hospitalResults = await Hospital.find(query)
      .limit(parseInt(limit))
      .skip(skip);
      

    res.json({ results: hospitalResults }); */
  } catch (err) {
    console.error("❌ Error in search:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
