import { useEffect, useState } from "react";
import classes from "./Card.module.css";
import { apiKey } from "../../constants";
import { Movie } from "../../types";
import MovieTrailer from "../MovieTrailer/MovieTrailer";

const Card = ({ poster, title, overview, rating, id }: Movie) => {
  const [videoKey, setVideoKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const data = await response.json();
        setVideoKey(data.results[0].key);
      } catch (error) {}
    };

    fetchMovieData();
  }, [id]);

  const handleShowTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className={classes.card}>
      <img src={poster} alt={title} className={classes.poster} />

      <div className={classes.details}>
        <h2 className={classes.title}>{title}</h2>
        <p className={classes.description}>{overview}</p>

        <div className={classes.rating}>
          <span className={classes.ratingValue}>{rating}</span>
        </div>

        <button
          onClick={handleShowTrailer}
          className={classes.watchTrailerButton}
        >
          Watch Trailer
        </button>
      </div>

      {showTrailer && (
        <MovieTrailer
          title={title}
          videoKey={videoKey}
          handleCloseTrailer={handleCloseTrailer}
        />
      )}
    </div>
  );
};

export default Card;
