import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const getMoviesByGenre = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_BASE_URL}/cagematch/get_movies_by_genre`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching movies by genre: ", error);
    return [];
  }
};

export const getMovieDetails = async (movie_id) => {
  try {
    const token = localStorage.getItem("token");
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.post(
      `${API_BASE_URL}/cagematch/get_movie_details`,
      { movie_id: movie_id, user_timezone: timezone },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching movie details: ", error);
    return [];
  }
};

export const getWatchlist = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_BASE_URL}/cagematch/get_user_watchlist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching watchlist: ", error);
    return [];
  }
};

export const addToWatchlist = async (movie_id, watchlist_toggle) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${API_BASE_URL}/cagematch/add_to_watchlist`,
      { movie_id: movie_id, watchlist_toggle: watchlist_toggle },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error("Error adding to watchlist: ", error);
    return;
  }
};
