import React, { useEffect, useState } from "react";
import "./SearchPage.css"; // <-- Import styles

function SearchPage() {
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

          // Optional: auto-fill the pincode filter
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

  // if on each letter change we want search -api call
  /* useEffect(() => {
    fetchResults(true);
  }, [filters]); */

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <img src="/banner.jpg" alt="Banner" className="banner" />

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
