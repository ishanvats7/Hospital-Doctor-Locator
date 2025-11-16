// importing Express JS. Express JS is a Node JS framework which provides lot of functionalities helping to build backend web applications and API. Ex- support of adding middleware, routings, server config etc
// Express JS is a framework for Node JS and Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. It is built on Google Chrome's V8 JavaScript engine.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// dotenv package helps to load environment variables from a .env file into the process.env object, making them accessible within the application's runtime.
require("dotenv").config();
// loading api endpoints routing paths
const searchRoutes = require("./routes/search");
const hospitalRoutes = require("./routes/hospital");
const loginRegistrationRoutes = require("./routes/userAuth");
const appointmentRoutes = require("./routes/appointment");

//below line initializes express application
const app = express();
const aiRoutes = require("./routes/ai");


/*  below line integrates the cors middleware, which handles Cross-Origin Resource Sharing (CORS) which means
By default, browsers block requests from a web page on one "origin" (e.g., http://example.com:3000) to a resource on another "origin" (e.g., http://api.example.com:5000). The cors middleware adds the necessary HTTP headers (like Access-Control-Allow-Origin) to your Express.js server's responses, signaling to the browser that it's permissible for specific or all origins to access the server's resources.
for example when front end is running on one origin/domain, browser by default will restrict requests to another origin/domain url on which server is running. Browser if finds necessary header Access-Control-Allow-Origin in server response it will allow the content access on the basis of this header value explained below
Access-Control-Allow-Origin: https://example.com this value will allow server content access only to https://example.com and     Access-Control-Allow-Origin: * means it allows request made from any url to server */
app.use(cors());

//below line integrates middleware to parse incoming JSON data from HTTP requests
app.use(express.json());

//registrating routes in application, these routes contains api endpoints
// example- searchRoutes contains search api's defined in ./routes/search path. It will be called with base path + "/api/search" + whatever api endpoints defined in search route path
// /api/search, /api/hospital these are defined to be appended in base path (localhost:5000) and then respective api endpoint path as defined in respective files
app.use("/api/search", searchRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/reviews", require("./routes/review"));
app.use("/api/auth", loginRegistrationRoutes);

app.use("/api/appointments", appointmentRoutes);
app.use("/api/slots", require("./routes/slots"));
// this is just a health check endpoint "/" means http://locahost:port/ will print below response if application runs properly
app.use("/api/ai", require("./routes/ai"));



app.get("/", (req, res) => res.send("Hospital Locator API is running"));

// mongoose is a javascript library which allows connection between MongoDB and the Node.js JavaScript runtime environment
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
// this line is to instruct Express application to run on defined port
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
