import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../components/Navbar";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { getMoviesByGenre, getMovieDetails } from "../services/movieService";
import MovieModal from "../components/MovieModal";
import Spinner from "../components/Spinner";
import { Italic } from "lucide-react";


const ProfilePage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingGenres(true);
      const result = await getMoviesByGenre();
      setMoviesByGenre(result);
      setLoadingGenres(false);
    };

    fetchData();
  }, []);

  const handleCardClick = async (movieId) => {
    setLoadingModal(true);
    const movie_details = await getMovieDetails(movieId);
    setSelectedMovieId(movie_details);
    setLoadingModal(false);
    setModalOpen(true);
  };

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
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          onMovieClick={handleCardClick}
          allMovies={[...new Map(moviesByGenre.flatMap(s => s.movies).map(m => [m.movie_id, m])).values()]}
        />
  
        <div style={{ padding: "20px", color: "white" }}>
          <p style={{ textAlign: "left", fontSize: "19px", }}>
            Hi {username}, Welcome to CageMatch!<br/> <br/>
            Not all heroes wear capes. Some wear a new <em>Face</em> and laugh through the flames. <br/>
            Okaaaay. Lets ride! 

            
          </p>
  
          {loadingGenres ? (
            <Spinner label="Loading movies..." />
          ) : moviesByGenre.length > 0 ? (
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
            <p style={{ textAlign: "center", color: "white" }}>No movies found.</p>
          )}
        </div>
      </div>
      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "20px", marginTop: "40px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        color: "#888", fontSize: "12px", position: "relative", zIndex: 1,
      }}>
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="TMDB"
          style={{ height: "12px", verticalAlign: "middle", marginRight: "6px", opacity: 0.6 }}
        />
        This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
      </div>

      {/* Movie Modal mounted here, always on top */}
      {loadingModal && <Spinner label="Loading movie details..." fullscreen />}
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
