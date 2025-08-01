const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/", async (req, res) => {
  try {
    const { doctorId, userName, rating, comment } = req.body;
    const review = await Review.create({ doctorId, userName, rating, comment });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit review" });
  }
});

router.get("/:doctorId", async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.doctorId }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

module.exports = router;
