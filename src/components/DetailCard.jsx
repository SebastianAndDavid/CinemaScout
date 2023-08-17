import PropTypes from "prop-types";

export default function DetailCard({ movieDetails, setDidClickMovieCard }) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div onClick={() => setDidClickMovieCard(false)}>
      <h3>{movieDetails.title}</h3>
      <h4>{movieDetails.tagline}</h4>
      <img
        style={{ width: "480px", height: "720px" }}
        src={BASE_POSTER_URL + movieDetails.poster_path}
      />
    </div>
  );
}

DetailCard.propTypes = {
  movieDetails: PropTypes.object.isRequired,
  setDidClickMovieCard: PropTypes.func.isRequired,
};
