// import { useState } from "react";
import "./MovieCard.css";
import PropTypes from "prop-types";

export default function MovieCard({ movieObject }) {
  // const [isHover, setIsHover] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHover(true);
  // };
  // const handleMouseLeave = () => {
  //   setIsHover(false);
  // };

  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";
  console.log("movieObject", movieObject);
  return (
    <div className="movie-card">
      <img
        style={{ width: "240px", height: "360px" }}
        src={BASE_POSTER_URL + movieObject.poster_path}
      />
    </div>
  );
}
MovieCard.propTypes = {
  movieObject: PropTypes.object.isRequired,
};
