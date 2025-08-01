import React, { useState } from "react";
import "./StarInput.css";

function StarInput({ value = 0, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-input">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hovered || value) ? "filled" : ""}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarInput;
