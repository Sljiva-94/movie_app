import classes from "./MovieTrailer.module.css";

type Props = {
  title: string;
  videoKey: string;
  handleCloseTrailer: () => void;
};

const MovieTrailer = ({ title, handleCloseTrailer, videoKey }: Props) => {
  return (
    <div className={classes.backdrop} onClick={handleCloseTrailer}>
      <iframe
        title={title}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoKey}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default MovieTrailer;
