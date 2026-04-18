import React, { useState } from 'react';
import './MovieModal.css';
import { ThumbsUp, ThumbsDown, Bookmark } from 'lucide-react';
import { addToWatchlist } from '../services/movieService';

export default function MovieModal({ movie, onClose }) {
  const [isWatchlisted, setIsWatchlisted] = useState(movie?.is_watchlist ?? false);

  if (!movie) return null;

  const embedUrl = movie.trailer_url
  ? movie.trailer_url
      .replace("watch?v=", "embed/")
      .concat("?autoplay=1&rel=0&showinfo=0")
  : "";

  const handleWatchlistClick = async () => {
    const newToggle = !isWatchlisted;

    setIsWatchlisted(newToggle);

    try {
      await addToWatchlist(movie.movie_id, newToggle);
    } catch (err) {
      // rollback to previous state if API fails
      setIsWatchlisted(!newToggle);
    }

  };


  return (
    <div className="modal-container">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-wrapper">
        <div className="modal-content">
          <p/>
          {movie.trailer_url ? (
          <iframe
            src={embedUrl}
            title="Trailer"
            className="modal-video"
            allow="autoplay;"
            allowFullScreen
          />
          ) : (
            <p style={{ textAlign: "center", fontStyle: "italic", marginTop: "1rem" }}>
              Sorry, Trailer is unavailable!
            </p>
          )}
          <div className="modal-details">
            <div className="modal-header">
              <div className="header-left">
                <h2>{movie.title}</h2>

                <div className="movie-meta">
                <span>{movie.release_date}</span>
                  <span>• {movie.duration}</span>
                  <span>• {movie.maturity}</span>
                  <span>• {movie.language}</span>
                </div>
              </div>                  
              
              <div className="header-right">
                <div className="modal-icon-buttons">
                  <div className="tooltip">
                    <ThumbsUp className="icon" />
                    <span className="tooltip-text">Liked it?</span>
                  </div>
                  <div className="tooltip">
                    <ThumbsDown className="icon" />
                    <span className="tooltip-text">Nah, not my vibe</span>
                  </div>
                  <div className="tooltip" onClick={handleWatchlistClick}>
                    <Bookmark 
                      className="icon"
                      fill={isWatchlisted ? "yellow" : "none"}
                    />
                    <span className="tooltip-text">
                      {isWatchlisted ? "Remove from Watchlist":"Add to Watchlist"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-body">
            <div className="left-section">
              <p className="plot">{movie.plot}</p>
              <p><strong>Cast:</strong> {movie.cast?.join(", ")}</p>
            </div>

            <div className="right-section">
              <h4>Available On</h4>
              <ul>
                {movie.available_on?.map((platform, idx) => (
                  <li key={idx}>{platform}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}
