import Navbar from "./components/Navbar";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import React, { useState, useCallback } from "react";
import { getMoviesByMood } from "./services/movieService";

function App() {
  const [movies, setMovies] = useState([]);
  const moods = ["oscar", "weird", "comedy", "thriller", "crime", "drama"];

  const fetchMovies = async (mood) => {
    const result = await getMoviesByMood(mood);
    console.log(result);
    setMovies(result.movies); // Adjusted based on API response
  };
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      <Navbar />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: { value: "#2F055E" },
          },
          particles: {
            number: { value: 100 },
            size: { value: 2 },
            move: {
              enable: true, // ensure movement is enabled
              speed: 0.6, // slight movement speed
              direction: "none", // random direction
              random: true, // makes movement feel more organic
              straight: false, // prevents straight-line movement
              outModes: {
                default: "bounce", // bounce off edges
              },
            },
          },
        }}
      />
      <div className="bg-green-600 text-white p-4">Is Tailwind working?</div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Nicolas Cage Movie Recommender 🎬</h1>

        {/* Mood Selection Buttons */}
        <div style={{ marginBottom: "20px" }}>
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => fetchMovies(mood)}
              style={{
                padding: "10px 15px",
                margin: "5px",
                borderRadius: "5px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </button>
          ))}
        </div>

        {/* Movie List Display */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row", // make children go in a row
            flexWrap: "wrap", // wrap to next row if needed
            justifyContent: "center", // center horizontally
            gap: "20px", // space between cards
          }}
        >
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "150px",
                  textAlign: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={movie.image || "https://via.placeholder.com/150"}
                  alt={movie.name || "Movie Poster"}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                  {movie.name}
                </p>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
