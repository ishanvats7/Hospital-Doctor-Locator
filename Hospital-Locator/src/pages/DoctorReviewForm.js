import React, { useState } from "react";
import StarInput from "../components/StarInput";

function DoctorReviewForm({ doctorId, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId, userName, rating, comment }),
    });

    alert("Review submitted!");
    onSubmitted?.();
    setRating(0);
    setUserName("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <label>Rating:</label>
      <StarInput value={rating} onChange={setRating} />
      <br />
      <textarea
        placeholder="Write your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default DoctorReviewForm;
