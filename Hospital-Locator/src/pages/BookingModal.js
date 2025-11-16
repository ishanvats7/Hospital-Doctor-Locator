import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingModal.css";

function BookingModal({ show, onClose, hospital }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  // Fetch doctors for the selected hospital
  useEffect(() => {
    if (hospital?._id) {
      fetch(`http://localhost:5000/api/hospital/${hospital._id}`)
        .then((res) => res.json())
        .then((data) => setDoctors(data.doctors || []));
    }
  }, [hospital]);

  // Fetch available slots whenever doctor or date changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      fetch(
        `http://localhost:5000/api/slots?doctorId=${selectedDoctor._id}&date=${dateStr}`
      )
        .then((res) => res.json())
        .then((data) => setAvailableSlots(data.availableSlots || []));
      setSelectedSlot(""); // reset previously selected slot
    } else {
      setAvailableSlots([]);
      setSelectedSlot("");
    }
  }, [selectedDoctor, selectedDate]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const patientName = form.get("patientName");
    const mobile = form.get("mobile");

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      alert("Please select doctor, date, and time slot");
      return;
    }

    const body = {
      patientName,
      mobile,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedSlot,
      hospitalId: hospital._id,
      doctorId: selectedDoctor._id,
    };

    await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    alert("Appointment booked! It will be confirmed via phone.");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="modal-container"
      >
        <h2 className="modal-title">Book Appointment</h2>

        <div className="hospital-info">
          <h3>{hospital?.name}</h3>
          <p>{hospital?.fullAddress}</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            name="patientName"
            type="text"
            placeholder="Patient Name"
            required
          />
          <input
            name="mobile"
            type="text"
            placeholder="Mobile Number"
            required
          />

          <select
            value={selectedDoctor?._id || ""}
            onChange={(e) =>
              setSelectedDoctor(doctors.find((d) => d._id === e.target.value))
            }
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()} // prevents past dates
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date"
            className="date-picker-input"
            required
          />

          <div className="slots-grid">
            {availableSlots.length === 0 ? (
              <p className="message">Select doctor & date to see slots</p>
            ) : (
              availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`slot-btn ${
                    selectedSlot === slot ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))
            )}
          </div>

          <button type="submit" className="btn-submit">
            Confirm Booking
          </button>
        </form>

        <button className="btn-close" onClick={onClose}>
          ✕
        </button>
      </motion.div>
    </div>
  );
}

export default BookingModal;