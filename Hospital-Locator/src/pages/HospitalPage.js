import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./HospitalPage.css";
import StarRating from "../components/StarRating";
import DoctorReviewForm from "./DoctorReviewForm";

function HospitalPage() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHospital() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/hospital/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch hospital data");
        }
        const data = await res.json();
        setHospital(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHospital();
  }, [id]);

  if (loading) return <p>Loading hospital details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!hospital) return <p>No hospital data found.</p>;

  return (
    <div className="hospital-page">
      <div className="hospital-header">
        <div className="hospital-header-icon">
          {hospital.type === "clinic" ? "🏥" : "🏨"}
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{hospital.name}</h2>
          <p style={{ margin: 0, color: "#777" }}>
            <strong>Type:</strong> {hospital.type || "Hospital"}
          </p>
        </div>
      </div>

      <div className="hospital-info">
        <p>
          📍 <strong>City:</strong> {hospital.city} &nbsp; | &nbsp;
          <strong>Pincode:</strong> {hospital.pincode}
        </p>
        {hospital.fullAddress && (
          <p>
            🧭 <strong>Address:</strong> {hospital.fullAddress}
          </p>
        )}
      </div>

      {hospital.location?.coordinates && (
        <div className="map-container">
          <iframe
            title="Location Map"
            width="100%"
            height="300"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${hospital.location.coordinates[1]},${hospital.location.coordinates[0]}&hl=en&z=15&output=embed`}
          />
        </div>
      )}

      <h3 style={{ marginTop: "2rem" }}>
        Doctors at this {hospital.type === "clinic" ? "clinic" : "hospital"}:
      </h3>

      <div className="doctor-list">
        {hospital.doctors.length === 0 ? (
          <p>No doctors listed for this facility.</p>
        ) : (
          hospital.doctors.map((doc) => (
            <div key={doc._id} className="doctor-card">
              <img
                src={doc.photoUrl || "https://ui-avatars.com/api/?name=Doctor"}
                alt={doc.name}
                className="doctor-photo"
              />
              <div className="doctor-info">
                <h4>👨‍⚕️ {doc.name}</h4>
                <p>
                  <strong>Specialization:</strong> {doc.specialization}
                </p>
                {doc.fullAddress && <p>{doc.fullAddress}</p>}
                {doc.rating && (
                  <p>
                    <strong>Rating:</strong>{" "}
                    <StarRating rating={doc.rating || 0} /> (
                    {doc.reviewCount || 0} reviews)
                  </p>
                )}
                {doc.timings && (
                  <p>
                    <strong>Timings:</strong> {doc.timings.morning || "N/A"}{" "}
                    &nbsp;/&nbsp; {doc.timings.evening || "N/A"}
                  </p>
                )}
              </div>
              <details style={{ marginTop: "1rem" }}>
                <summary style={{ cursor: "pointer", color: "#007bff" }}>
                  Write a Review
                </summary>
                <DoctorReviewForm doctorId={doc._id} />
              </details>
            </div>
          ))
        )}
      </div>

      <Link to="/" className="back-link">
        ← Back to Search
      </Link>
    </div>
  );
}

export default HospitalPage;
