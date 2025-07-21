// MovieModal.jsx
import React from 'react';
import './MovieModal.css';
import { ThumbsUp, ThumbsDown, Bookmark } from 'lucide-react';

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const embedUrl = movie.trailer_url?.replace("watch?v=", "embed/")?.concat("?autoplay=1&rel=0&showinfo=0");

  return (
    <div className="modal-container">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-wrapper">
        <div className="modal-content">
          <p/>
          <iframe
            src={embedUrl}
            title="Trailer"
            className="modal-video"
            allow="autoplay;"
            allowFullScreen
          />
          <div className="modal-details">
            <div className="modal-header">
                <h2>{movie.title}</h2>
                <div className="modal-icon-buttons">
                <div className="tooltip">
                    <ThumbsUp className="icon" />
                    <span className="tooltip-text">Liked it?</span>
                </div>
                <div className="tooltip">
                    <ThumbsDown className="icon" />
                    <span className="tooltip-text">Nah, not my vibe</span>
                </div>
                <div className="tooltip">
                    <Bookmark className="icon" />
                    <span className="tooltip-text">Add to Watchlist</span>
                </div>
                </div>
            </div>
            <p>{movie.plot}</p>
            <p><span>Release Date:</span> {movie.release_date}</p>
            <p><span>Popularity:</span> {movie.popularity?.join(", ")}</p>
            <p><span>Duration:</span> {movie.duration}</p>
            <p><span>Maturity:</span> {movie.maturity}</p>
            <p><span>Language:</span> {movie.language}</p>
            <p><span>Cast:</span> {movie.cast?.join(", ")}</p>
            <p><span>Available On:</span> {movie.available_on?.join(", ")}</p>
            {/* Add genres, release date, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
}
