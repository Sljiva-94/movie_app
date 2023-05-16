import React, { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter/Filter";
import Spinner from "./components/Spinner/Spinner";

const apiKey = "209a0952e9d4f65bafc7f673b71d9632";

type Movie = {
  id: number;
  poster: string;
  title: string;
  overview: string;
  rating: number;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const getMovies = async (filter: string) => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

      if (filter) {
        url += `&sort_by=${filter}`;
      }

      const response = await fetch(url);
      setLoading(true);

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();

      const moviesInfo = data.results.map((movie: any) => ({
        id: movie.id,
        overview: movie.overview,
        title: movie.original_title,
        poster: movie.poster_path,
        rating: movie.vote_average,
      }));

      setMovies(moviesInfo);
    } catch (error) {
      setErrorMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (selectedOption: string) => {
    setFilter(selectedOption);
  };

  useEffect(() => {
    getMovies(filter);
  }, [filter]);

  return (
    <>
      <Filter onOptionChange={handleOptionChange} />
    </>
  );
}

export default App;
