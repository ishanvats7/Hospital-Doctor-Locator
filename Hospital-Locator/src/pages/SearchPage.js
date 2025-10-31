import React, { useEffect, useState, useContext } from "react";
import "./SearchPage.css";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [currentLocation, setCurrentLocation] = useState({
    city: "Detecting...",
    pincode: "",
  });

  const [filters, setFilters] = useState({
    name: "",
    pincode: "",
    specialization: "",
    city: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // --- AI Assistant States ---
  const [symptoms, setSymptoms] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Get current city using geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setCurrentLocation({ city: "Geolocation not supported", pincode: "" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );
          const data = await res.json();
          const address = data.address;

          const city =
            address.city ||
            address.state_district ||
            address.town ||
            address.village ||
            address.state ||
            "Unknown city";
          const pincode = address.postcode || "";

          setCurrentLocation({ city, pincode });
          setFilters((prev) => ({ ...prev, city }));
          fetchResults(true);
        } catch (err) {
          setCurrentLocation({
            city: "Unable to fetch location",
            pincode: "",
          });
        }
      },
      () =>
        setCurrentLocation({
          city: "Permission denied or unavailable",
          pincode: "",
        })
    );
  }, []);

  // Fetch hospitals/doctors
  const fetchResults = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        name: filters.name,
        city: filters.city,
        specialization: filters.specialization,
        page: reset ? 1 : page,
        limit: 20,
      });

      const res = await fetch(
        `http://localhost:5000/api/search?${queryParams}`
      );
      const data = await res.json();

      if (reset) {
        setResults(data.results);
        setPage(2);
      } else {
        setResults((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      }

      setHasMore(data.results.length === 20);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const username = user ? user.name : "Guest";

  // --- Ask AI Function ---
  const handleAskAI = async () => {
    if (!symptoms.trim()) return alert("Please enter symptoms first!");
    setAiLoading(true);
    setAiResult("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: symptoms }),
});

      const data = await res.json();
      const specialization = data.specialization || "No suggestion found.";
      setAiResult(specialization);

      // Optional: auto-fill specialization and search
      setFilters((prev) => ({
        ...prev,
        specialization: specialization.toLowerCase(),
      }));
      fetchResults(true);
    } catch (err) {
      console.error(err);
      setAiResult("Error fetching AI suggestion.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Banner with right-side buttons */}
      <div className="banner-container">
        <img src="/banner.jpg" alt="Banner" className="banner" />
        <div className="user-greeting">Hello, {username}</div>

        <div className="banner-buttons-right">
          {user ? (
            <button className="auth-btn logout-btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <button className="auth-btn login-btn" onClick={handleLoginClick}>
                Login
              </button>
              <button
                className="auth-btn register-btn"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* --- AI Assistant Box --- */}
        <div className="ai-box">
          <h3>🧠 Ask AI</h3>
          <p className="ai-subtext">Find out which specialist you should visit!</p>
          <input
            type="text"
            placeholder="Enter symptoms (e.g. fever, rashes)"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button onClick={handleAskAI} disabled={aiLoading}>
            {aiLoading ? "Thinking..." : "Ask AI"}
          </button>

          {aiResult && (
            <div className="ai-result">
              <strong>Suggested Specialist:</strong> {aiResult}
            </div>
          )}
        </div>
      </div>

      <h1>Find Doctors and Hospitals</h1>
      <p>
        Your location:{" "}
        <strong>
          {currentLocation.city}
          {currentLocation.pincode && ` (${currentLocation.pincode})`}
        </strong>
      </p>

      <div className="search-filters">
        <input
          type="text"
          name="name"
          placeholder="Doctor or Hospital Name"
          value={filters.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleChange}
        />
        <select
          name="specialization"
          value={filters.specialization}
          onChange={handleChange}
        >
          <option value="">Select Specialization</option>
          <option value="cardiology">Cardiology</option>
          <option value="dermatology">Dermatology</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="neurology">Neurology</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="gynecology">Gynecology</option>
          <option value="oncology">Oncology</option>
          <option value="psychiatry">Psychiatry</option>
          <option value="radiology">Radiology</option>
          <option value="gastroenterology">Gastroenterology</option>
          <option value="endocrinology">Endocrinology</option>
          <option value="ophthalmology">Ophthalmology</option>
          <option value="General Practice">Ophthalmology</option>
          <option value="Internal Medicine">Ophthalmology</option>
        </select>
        <button onClick={() => fetchResults(true)}>Search</button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        {results.map((item) => (
          <div key={item._id} className="search-card">
            <a href={`/hospital/${item._id}`} className="search-link">
              <h3>{item.name}</h3>
            </a>
            <p>
              <strong>Type:</strong> {item.type || "hospital"}
            </p>
            <p>
              <strong>Pincode:</strong> {item.pincode}
            </p>
            {item.fullAddress && (
              <p>
                <strong>Address:</strong> {item.fullAddress}
              </p>
            )}
          </div>
        ))}
        {loading && <p>Loading...</p>}
        {!hasMore && !loading && <p>No more results</p>}
        {hasMore && !loading && (
          <button onClick={() => fetchResults()}>Load More</button>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
