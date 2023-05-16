import { useEffect, useState } from "react";
import Spinner from "./components/Spinner/Spinner";
import Card from "./components/Card/Card";
import classes from "./App.module.css";

const apiKey = "209a0952e9d4f65bafc7f673b71d9632";

export type Movie = {
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

  const getMovies = async () => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

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
        <h1>{errorMessage}</h1>
      </div>
    );
  }

  return (
    <div>
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
