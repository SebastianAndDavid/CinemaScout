// import { useState } from "react";
import "./MovieCard.css";
import PropTypes from "prop-types";

export default function MovieCard({
  movieObject,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <div
      className="movie-card"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <img
        style={{ width: "240px", height: "360px" }}
        src={BASE_POSTER_URL + movieObject.poster_path}
      />
    </div>
  );
}
MovieCard.propTypes = {
  movieObject: PropTypes.object.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
};
