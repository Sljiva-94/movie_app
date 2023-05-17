import { useEffect, useState } from "react";
import Spinner from "./components/Spinner/Spinner";
import Card from "./components/Card/Card";
import classes from "./App.module.css";
import { apiKey } from "./constants";
import { Movie } from "./types";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
      );
      setLoading(true);

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();

      const moviesInfo = data.results.map((movie: Record<string, unknown>) => ({
        id: movie.id,
        overview: movie.overview,
        title: movie.original_title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
      }));

      setMovies(moviesInfo);
    } catch (error) {
      setErrorMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <div className={classes.wrapper}>
        <Spinner />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className={classes.wrapper}>
        <h1 className={classes.errorMessage}>{errorMessage}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className={classes.heading}>Netflix</h1>

      <div className={classes.wrapperCard}>
        {movies.map((movie, index) => (
          <Card
            id={movie.id}
            poster={movie.poster}
            title={movie.title}
            overview={movie.overview}
            rating={movie.rating}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
