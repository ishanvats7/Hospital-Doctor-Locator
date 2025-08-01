const mongoose = require("mongoose");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Hospital.deleteMany();
  await Doctor.deleteMany();

  console.log("✅ Cleared old data.");

  const hospitals = await Hospital.insertMany([
    {
      name: "Sahara Hospital",
      type: "hospital",
      city: "Lucknow",
      pincode: "226010",
      fullAddress: "Viraj Khand, Gomti Nagar, Lucknow, Uttar Pradesh",
      location: { type: "Point", coordinates: [81.0212, 26.8663] },
    },
    {
      name: "Dr. Ram Manohar Lohia Institute of Medical Sciences",
      type: "hospital",
      city: "Lucknow",
      pincode: "226010",
      fullAddress: "Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh",
      location: { type: "Point", coordinates: [81.022, 26.8604] },
    },
    {
      name: "Medanta Hospital",
      type: "hospital",
      city: "Lucknow",
      pincode: "226014",
      fullAddress: "Amar Shaheed Path, Lucknow, Uttar Pradesh",
      location: { type: "Point", coordinates: [81.0039, 26.8234] },
    },
    {
      name: "King George's Medical University (KGMU)",
      type: "hospital",
      city: "Lucknow",
      pincode: "226003",
      fullAddress: "Chowk, Lucknow, Uttar Pradesh",
      location: { type: "Point", coordinates: [80.9132, 26.869] },
    },
    {
      name: "Smile Dental Clinic",
      type: "clinic",
      city: "Lucknow",
      pincode: "226001",
      fullAddress: "Hazratganj, Lucknow",
      location: { type: "Point", coordinates: [80.9462, 26.8467] },
    },
  ]);

  const doctors = [
    // Sahara Hospital (Multi-speciality)
    {
      name: "Dr. Anjali Verma",
      specialization: "Cardiology",
      pincode: "226010",
      fullAddress: "Gomti Nagar, Lucknow",
      location: { type: "Point", coordinates: [81.0212, 26.8663] },
      hospitalId: hospitals[0]._id,
      rating: 4.8,
      reviewCount: 125,
      timings: {
        morning: "10AM - 1PM",
        evening: "6PM - 9PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Anjali+Verma&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Rajeev Singh",
      specialization: "Orthopedics",
      pincode: "226010",
      fullAddress: "Gomti Nagar, Lucknow",
      location: { type: "Point", coordinates: [81.0212, 26.8663] },
      hospitalId: hospitals[0]._id,
      rating: 4.5,
      reviewCount: 93,
      timings: {
        morning: "9AM - 12PM",
        evening: "5PM - 8PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Rajeev+Singh&background=0D8ABC&color=fff&rounded=true",
    },

    // RML Hospital
    {
      name: "Dr. Swati Tiwari",
      specialization: "Dermatology",
      pincode: "226010",
      fullAddress: "Vibhuti Khand, Gomti Nagar",
      location: { type: "Point", coordinates: [81.022, 26.8604] },
      hospitalId: hospitals[1]._id,
      rating: 4.7,
      reviewCount: 110,
      timings: {
        morning: "11AM - 2PM",
        evening: "5PM - 7PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Swati+Tiwari&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Anurag Mishra",
      specialization: "Neurology",
      pincode: "226010",
      fullAddress: "Vibhuti Khand, Gomti Nagar",
      location: { type: "Point", coordinates: [81.022, 26.8604] },
      hospitalId: hospitals[1]._id,
      rating: 4.6,
      reviewCount: 88,
      timings: {
        morning: "10AM - 1PM",
        evening: "4PM - 7PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Anurag+Mishra&background=0D8ABC&color=fff&rounded=true",
    },

    // Medanta
    {
      name: "Dr. Pooja Agarwal",
      specialization: "Pediatrics",
      pincode: "226014",
      fullAddress: "Amar Shaheed Path, Lucknow",
      location: { type: "Point", coordinates: [81.0039, 26.8234] },
      hospitalId: hospitals[2]._id,
      rating: 4.9,
      reviewCount: 132,
      timings: {
        morning: "9AM - 12PM",
        evening: "6PM - 9PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Pooja+Agarwal&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Ashok Yadav",
      specialization: "General Medicine",
      pincode: "226014",
      fullAddress: "Amar Shaheed Path, Lucknow",
      location: { type: "Point", coordinates: [81.0039, 26.8234] },
      hospitalId: hospitals[2]._id,
      rating: 4.4,
      reviewCount: 77,
      timings: {
        morning: "10AM - 1PM",
        evening: "5PM - 8PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Ashok+Yadav&background=0D8ABC&color=fff&rounded=true",
    },

    // KGMU
    {
      name: "Dr. Neha Srivastava",
      specialization: "Gynecology",
      pincode: "226003",
      fullAddress: "Chowk, Lucknow",
      location: { type: "Point", coordinates: [80.9132, 26.869] },
      hospitalId: hospitals[3]._id,
      rating: 4.6,
      reviewCount: 101,
      timings: {
        morning: "10AM - 2PM",
        evening: "5PM - 7PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Neha+Srivastava&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Vivek Pandey",
      specialization: "Cardiology",
      pincode: "226003",
      fullAddress: "Chowk, Lucknow",
      location: { type: "Point", coordinates: [80.9132, 26.869] },
      hospitalId: hospitals[3]._id,
      rating: 4.5,
      reviewCount: 95,
      timings: {
        morning: "9AM - 12PM",
        evening: "6PM - 8PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Vivek+Pandey&background=0D8ABC&color=fff&rounded=true",
    },

    // Smile Dental Clinic (Single-speciality)
    {
      name: "Dr. Niharika Jain",
      specialization: "Dentistry",
      pincode: "226001",
      fullAddress: "Hazratganj, Lucknow",
      location: { type: "Point", coordinates: [80.9462, 26.8467] },
      hospitalId: hospitals[4]._id,
      rating: 4.7,
      reviewCount: 108,
      timings: {
        morning: "10AM - 1PM",
        evening: "5PM - 7PM",
      },
      photoUrl:
        "https://ui-avatars.com/api/?name=Niharika+Jain&background=0D8ABC&color=fff&rounded=true",
    },
  ];

  await Doctor.insertMany(doctors);
  console.log("✅ Seed data for Lucknow inserted successfully.");
  process.exit();
}

seed();
