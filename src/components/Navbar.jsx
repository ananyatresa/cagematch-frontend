import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { getWatchlist } from '../services/movieService';
import Spinner from './Spinner';
import Fuse from 'fuse.js';

export default function Navbar({ setIsAuthenticated, onMovieClick, allMovies = [] }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [loadingSideBar, setLoadingSideBar] = useState(false);
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const fuse = useMemo(() => new Fuse(allMovies, {
        keys: ["title"],
        threshold: 0.4,
    }), [allMovies]);

    const searchResults = searchTerm.trim()
        ? fuse.search(searchTerm).slice(0, 6).map(r => r.item)
        : [];

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const handleWatchListClick = async () => {
        setLoadingSideBar(true);
        setSideBarOpen(true);
        const results = await getWatchlist();
        setWatchlistMovies(results);
        setLoadingSideBar(false);
    };

    const handleCloseSidebar = () => {
        setSideBarOpen(false);
        setWatchlistMovies([]);
    };

    const handleSearchSelect = (movie) => {
        setSearchTerm("");
        setSearchOpen(false);
        onMovieClick && onMovieClick(movie.movie_id);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className="navbar">
                {/* Left Side */}
                <div className="navbar-left">
                    <div className="funky-title">
                        {"CAGE MATCH".split("").map((char, index) => (
                            <span key={index} className="wave rainbow" style={{ animationDelay: `${index * 0.1}s` }}>
                                {char}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right Side */}
                <div className="navbar-right">
                    <div className="search-wrapper" ref={searchRef}>
                        <input
                            className="search-bar"
                            type="text"
                            placeholder="Search a Cage classic..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setSearchOpen(true); }}
                            onFocus={() => setSearchOpen(true)}
                        />
                        {searchOpen && searchResults.length > 0 && (
                            <div className="search-dropdown">
                                {searchResults.map((movie) => (
                                    <div
                                        key={movie.movie_id}
                                        className="search-dropdown-item"
                                        onMouseDown={() => handleSearchSelect(movie)}
                                    >
                                        <img src={movie.img_url} alt={movie.title} className="search-result-img" />
                                        <div className="search-result-info">
                                            <span className="search-result-title">{movie.title}</span>
                                            <span className="search-result-meta">{movie.release_date?.slice(0, 4)} • ⭐ {movie.score?.toFixed(1)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="watchlist-btn" onClick={handleWatchListClick}>Watchlist🎬</button>
                    <div className="profile-wrapper" ref={dropdownRef}>
                        <button className="profile" onClick={() => setDropdownOpen((prev) => !prev)}>
                            <img src="/images/cage.png" alt="Cage" className="profile" onError={() => console.log("Image failed to load!")} />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown">
                                <div className="dropdown-item">View Profile</div>
                                <div className="dropdown-item">Account Settings</div>
                                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {sideBarOpen && (
                <div className="sidebar-overlay" onClick={handleCloseSidebar} />
            )}

            {/* Watchlist Sidebar */}
            <div className={`sidebar ${sideBarOpen ? "sidebar-open" : ""}`}>
                <div className="sidebar-header">
                    <h2 className="sidebar-title">My Watchlist🎬</h2>
                    <button className="sidebar-close" onClick={handleCloseSidebar}>✕</button>
                </div>

                <div className="sidebar-content">
                    {loadingSideBar ? (
                        <Spinner label="Loading your watchlist..." />
                    ) : watchlistMovies.length === 0 ? (
                        <p className="sidebar-message">Your watchlist is empty!</p>
                    ) : (
                        <div className="sidebar-grid">
                            {watchlistMovies.map((movie) => (
                                <div key={movie.movie_id} className="sidebar-card" onClick={() => onMovieClick && onMovieClick(movie.movie_id)}>
                                    <img src={movie.img_url} alt={movie.title} className="sidebar-card-img" />
                                    <p className="sidebar-card-title">{movie.title}</p>
                                    <div className="sidebar-card-meta">
                                        <span>🎬 {movie.duration}</span>
                                        <span>⭐ {movie.score?.toFixed(1)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
