const mongoose = require("mongoose");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Hospital.deleteMany();
  await Doctor.deleteMany();

  console.log("Cleared old data.");

  // --- Insert Hospitals & Clinics ---
  const hospitals = await Hospital.insertMany([
    // LUCKNOW
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
      fullAddress: "Hazratganj, Lucknow, Uttar Pradesh",
      location: { type: "Point", coordinates: [80.9462, 26.8467] },
    },

    // GORAKHPUR
    {
      name: "BRD Medical College and Hospital",
      type: "hospital",
      city: "Gorakhpur",
      pincode: "273013",
      fullAddress: "Medical College Road, Gorakhpur, Uttar Pradesh",
      location: { type: "Point", coordinates: [83.3771, 26.7606] },
    },
    {
      name: "City Hospital Gorakhpur",
      type: "hospital",
      city: "Gorakhpur",
      pincode: "273001",
      fullAddress: "Civil Lines, Gorakhpur, Uttar Pradesh",
      location: { type: "Point", coordinates: [83.3666, 26.7636] },
    },
    {
      name: "Arogya Hospital",
      type: "hospital",
      city: "Gorakhpur",
      pincode: "273015",
      fullAddress: "Transport Nagar, Gorakhpur, Uttar Pradesh",
      location: { type: "Point", coordinates: [83.3955, 26.7521] },
    },
    {
      name: "Life Care Clinic",
      type: "clinic",
      city: "Gorakhpur",
      pincode: "273008",
      fullAddress: "Basharatpur, Gorakhpur, Uttar Pradesh",
      location: { type: "Point", coordinates: [83.3982, 26.7633] },
    },
    {
      name: "Smile Dental Care",
      type: "clinic",
      city: "Gorakhpur",
      pincode: "273001",
      fullAddress: "Golghar, Gorakhpur, Uttar Pradesh",
      location: { type: "Point", coordinates: [83.3678, 26.7615] },
    },
  ]);

  // --- Insert Doctors ---
  const doctors = [
    // --- LUCKNOW ---
    {
      name: "Dr. Anjali Verma",
      specialization: "Cardiology",
      pincode: "226010",
      fullAddress: "Gomti Nagar, Lucknow",
      location: { type: "Point", coordinates: [81.0212, 26.8663] },
      hospitalId: hospitals[0]._id,
      rating: 4.8,
      reviewCount: 125,
      timings: { morning: "10AM - 1PM", evening: "6PM - 9PM" },
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
      timings: { morning: "9AM - 12PM", evening: "5PM - 8PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Rajeev+Singh&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Swati Tiwari",
      specialization: "Dermatology",
      pincode: "226010",
      fullAddress: "Vibhuti Khand, Gomti Nagar",
      location: { type: "Point", coordinates: [81.022, 26.8604] },
      hospitalId: hospitals[1]._id,
      rating: 4.7,
      reviewCount: 110,
      timings: { morning: "11AM - 2PM", evening: "5PM - 7PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Swati+Tiwari&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Pooja Agarwal",
      specialization: "Pediatrics",
      pincode: "226014",
      fullAddress: "Amar Shaheed Path, Lucknow",
      location: { type: "Point", coordinates: [81.0039, 26.8234] },
      hospitalId: hospitals[2]._id,
      rating: 4.9,
      reviewCount: 132,
      timings: { morning: "9AM - 12PM", evening: "6PM - 9PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Pooja+Agarwal&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Neha Srivastava",
      specialization: "Gynecology",
      pincode: "226003",
      fullAddress: "Chowk, Lucknow",
      location: { type: "Point", coordinates: [80.9132, 26.869] },
      hospitalId: hospitals[3]._id,
      rating: 4.6,
      reviewCount: 101,
      timings: { morning: "10AM - 2PM", evening: "5PM - 7PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Neha+Srivastava&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Niharika Jain",
      specialization: "Dentistry",
      pincode: "226001",
      fullAddress: "Hazratganj, Lucknow",
      location: { type: "Point", coordinates: [80.9462, 26.8467] },
      hospitalId: hospitals[4]._id,
      rating: 4.7,
      reviewCount: 108,
      timings: { morning: "10AM - 1PM", evening: "5PM - 7PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Niharika+Jain&background=0D8ABC&color=fff&rounded=true",
    },

    // --- GORAKHPUR ---
    {
      name: "Dr. Rakesh Kumar",
      specialization: "Pediatrics",
      pincode: "273013",
      fullAddress: "Medical College Road, Gorakhpur",
      location: { type: "Point", coordinates: [83.3771, 26.7606] },
      hospitalId: hospitals[5]._id,
      rating: 4.8,
      reviewCount: 98,
      timings: { morning: "9AM - 12PM", evening: "5PM - 8PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Rakesh+Kumar&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Priya Shukla",
      specialization: "Gynecology",
      pincode: "273001",
      fullAddress: "Civil Lines, Gorakhpur",
      location: { type: "Point", coordinates: [83.3666, 26.7636] },
      hospitalId: hospitals[6]._id,
      rating: 4.7,
      reviewCount: 112,
      timings: { morning: "10AM - 1PM", evening: "6PM - 8PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Priya+Shukla&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Amit Srivastava",
      specialization: "Cardiology",
      pincode: "273015",
      fullAddress: "Transport Nagar, Gorakhpur",
      location: { type: "Point", coordinates: [83.3955, 26.7521] },
      hospitalId: hospitals[7]._id,
      rating: 4.9,
      reviewCount: 140,
      timings: { morning: "10AM - 1PM", evening: "5PM - 8PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Amit+Srivastava&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Sneha Rai",
      specialization: "Dermatology",
      pincode: "273008",
      fullAddress: "Basharatpur, Gorakhpur",
      location: { type: "Point", coordinates: [83.3982, 26.7633] },
      hospitalId: hospitals[8]._id,
      rating: 4.5,
      reviewCount: 89,
      timings: { morning: "11AM - 2PM", evening: "6PM - 8PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Sneha+Rai&background=0D8ABC&color=fff&rounded=true",
    },
    {
      name: "Dr. Ankit Gupta",
      specialization: "Dentistry",
      pincode: "273001",
      fullAddress: "Golghar, Gorakhpur",
      location: { type: "Point", coordinates: [83.3678, 26.7615] },
      hospitalId: hospitals[9]._id,
      rating: 4.6,
      reviewCount: 105,
      timings: { morning: "10AM - 1PM", evening: "5PM - 7PM" },
      photoUrl:
        "https://ui-avatars.com/api/?name=Ankit+Gupta&background=0D8ABC&color=fff&rounded=true",
    },
  ];

  await Doctor.insertMany(doctors);
  console.log("Seed data for Lucknow and Gorakhpur inserted successfully.");
  process.exit();
}

seed();
