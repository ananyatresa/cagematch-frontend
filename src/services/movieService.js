import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const getMoviesByMood = async (mood) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cage_match/get_movie`, {
      mood: mood,
    });
    console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching movies: ", error);
    return [];
  }
};
