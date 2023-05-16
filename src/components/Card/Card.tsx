import { useEffect, useState } from "react";
import { Movie } from "../../App";
import classes from "./Card.module.css";

const Card = ({ poster, title, overview, rating, id }: Movie) => {
  const [videoKey, setVideoKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=209a0952e9d4f65bafc7f673b71d9632`
        );
        const data = await response.json();
        setVideoKey(data.results[0].key);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
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
        <div className={classes.backdrop} onClick={handleCloseTrailer}>
          <iframe
            title="movie-trailer"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}`}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Card;
