import React from "react";

function DoctorCard({ doctor }) {
  return (
    <div
      style={{ border: "1px solid #ccc", marginBottom: "1em", padding: "1em" }}
    >
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>
      <p>Pincode: {doctor.pinconde}</p>
      {doctor.distance && (
        <p>Distance: {(doctor.distance / 1000).toFixed(2)} km</p>
      )}
    </div>
  );
}

export default DoctorCard;
