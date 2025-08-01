const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const searchRoutes = require("./routes/search");
const hospitalRoutes = require("./routes/hospital");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/reviews", require("./routes/review"));
app.get("/", (req, res) => res.send("Hospital Locator API is running"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit with failure if DB connection fails
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
