import classes from "./Card.module.css";
import { Movie } from "../../App";

const Card = ({ poster, title, overview, rating }: Movie) => {
  return (
    <div className={classes.card}>
      <img src={poster} alt={title} className={classes.poster} />

      <div className={classes.details}>
        <h2 className={classes.title}>{title}</h2>
        <p className={classes.description}>{overview}</p>
        <div className={classes.rating}>
          <span className={classes.ratingValue}>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
