import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWQ1YmQ4ZDY0NTJmZmUxYmMzMGE3Y2U4MDFkODZhMCIsInN1YiI6IjY0OGIxMWIyMDc2Y2U4MDBhZDcyMGIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5L6yk5X8x7OeUoD9H5ddPSZS7gyQXUb2CREe1R_jLcc";
  // don't change

  


const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
