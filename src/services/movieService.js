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
      }
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
    const response = await axios.post(
      `${API_BASE_URL}/cagematch/get_movie_details`,
      { movie_id: movie_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching movie details: ", error);
    return [];
  }
};
