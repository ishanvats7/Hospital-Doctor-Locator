import React from "react";

function StarRating({ rating = 0, max = 5 }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (halfStar ? 1 : 0);

  return (
    <span style={{ color: "#f5c518", fontSize: "1.2rem" }}>
      {"★".repeat(fullStars)}
      {halfStar && "☆"}
      {"☆".repeat(emptyStars)}
    </span>
  );
}

export default StarRating;
