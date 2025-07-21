import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../components/Navbar";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { getMoviesByGenre, getMovieDetails } from "../services/movieService";
import MovieModal from "../components/MovieModal";


const ProfilePage = ({ setIsAuthenticated }) => {
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = async (movieId) => {
    const movie_details = await getMovieDetails(movieId);
    setSelectedMovieId(movie_details);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMoviesByGenre();
      setMoviesByGenre(result);
    };

    fetchData();
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: { value: "#2e1a47" },
          },
          particles: {
            number: { value: 100 },
            size: { value: 2 },
            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
            },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        }}
      />
  
      {/* Foreground Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar setIsAuthenticated={setIsAuthenticated} />
  
        <div style={{ padding: "20px", color: "white" }}>
          <p style={{ textAlign: "left", fontSize: "19px", }}>
            Welcome to CageMatch! <br/>
            A one stop destination for all your Nick Cage movies. <br/>
            Just pick a mood - Funny, Weird, Rage,  anything and we'll help you with a curated list of Cage's finest.
            
          </p>
  
          {moviesByGenre.length > 0 ? (
            moviesByGenre.map((section, index) => (
              <div key={index} style={{ marginTop: "40px" }}>
                <h2 style={{ marginBottom: "10px", textTransform: "capitalize", color: 'white' }}>
                  {section.genre}
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                  }}
                >
                  {section.movies.map((movie) => (
                    <div
                      key={movie.movie_id}
                      onClick={() => handleCardClick(movie.movie_id)}
                      className="cursor-pointer hover:scale-105 transition"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "10px",
                        width: "150px",
                        textAlign: "center",
                        backgroundColor:'rgb(53, 6, 101)',
                        boxShadow: "0 4px 6px rgba(7, 3, 3, 0.42)",
                        transition: "box-shadow 0.3s ease, transform 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 255, 255, 0.5)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <img
                        src={movie.img_url}
                        alt={movie.title}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                        {movie.title}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                          fontSize: "15px",
                          color: "#ccc",
                          marginTop: "5px",
                        }}
                      >
                        <span>🎬 {movie.duration}</span>
                        <span>⭐ {movie.score}</span>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}></p>
          )}
        </div>
      </div>
      {/* Movie Modal mounted here, always on top */}
      {modalOpen && selectedMovieId && (
        <MovieModal
          movie={selectedMovieId}
          onClose={() => {
            setModalOpen(false);
            setSelectedMovieId(null);
          }}
        />
      )}
    </div>
  );
  
};

export default ProfilePage;
