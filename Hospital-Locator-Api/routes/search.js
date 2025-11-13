const express = require("express");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const router = express.Router();
const mongoose = require("mongoose");

// This api endpoint having GET http verb helps to Search detail by passing set of request parameters (query parameters passed here not in request path)
// example of this api call:http://localhost:5000/api/search?city=Lucknow&specialization=cardiology&page=1&limit=10
router.get("/", async (req, res) => {
  try {
    // below const has default values and then reads from req.Query, those values which is not present in req.Query (query string) wil have default value defined below
    const {
      name = "",
      city = "",
      pincode = "",
      specialization = "",
      page = 1,
      limit = 20,
    } = req.query;

    // this variable is defined to handle pagination and fetch only required data on selected page
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // defining and initializing query so as compatible with mongoose library to search and filter
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (city) query.city = { $regex: city, $options: "i" };

    if (pincode) {
      query.pincode = pincode;
    }

    // Step 1: If specialization is passed to filter data, get hospitalIds that have such doctors with entered specialization available and add it in mongoose query _id field 
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

    // Step 2: Now do a mongoose query with all applied filters
    // the functions like find, distinct used below is defined in mongoose library
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
          imageUrl: hospital.imageUrl || "https://cdn-icons-png.flaticon.com/512/2966/2966327.png", // fallback 
        };
      })
    );

    // Sort result from mongoose query: Clinics (1 specialization) first, then multispeciality hospitals
    const sorted = hospitalsWithDocCount.sort(
      (a, b) => a.specializationCount - b.specializationCount
    );

    // Pagination after sort
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginated = sorted.slice(start, start + parseInt(limit));

    res.json({ results: paginated });

    // below commented line is proper way to allow mongoose do all pagination part also but need to check once as it is not working as of now
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
