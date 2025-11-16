import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000, // 1 second transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds per slide
    arrows: false,
    pauseOnHover: false,
    cssEase: "ease-in-out",
  };

  return (
    <div className="home-container">
      {/* Slider Section */}
      <div className="home-slider">
        <Slider {...sliderSettings}>
          <div>
            <img src="/find-doctor.png" alt="Find Doctor" />
          </div>
          <div>
            <img src="/hospitals.png" alt="Talk to Doctor" />
          </div>
          <div>
            <img src="/banner.jpg" alt="Healthcare" />
          </div>
        </Slider>
      </div>

      {/* Info Section */}
      <div className="home-info">
        <h1>Welcome to HealthConnect</h1>
        <p>
          Easily find doctors and hospitals near you. Book appointments
          hassle-free from the comfort of your home.
        </p>
        <button
          className="start-search-btn"
          onClick={() => navigate("/search")}
        >
          Start Searching
        </button>
      </div>
    </div>
  );
}

export default HomePage;