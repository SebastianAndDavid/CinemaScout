import PropTypes from "prop-types";

export default function MovieCard({ movieObject }) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";
  console.log("movieObject", movieObject);
  return (
    <div>
      <img src={BASE_POSTER_URL + movieObject.poster_path} />
    </div>
  );
}
MovieCard.propTypes = {
  movieObject: PropTypes.object.isRequired,
};
