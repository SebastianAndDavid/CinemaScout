import PropTypes from "prop-types";

export default function DetailCard({ movieDetails }) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <h3>{movieDetails.title}</h3>
      <img
        style={{ width: "240px", height: "360px" }}
        src={BASE_POSTER_URL + movieDetails.poster_path}
      />
    </div>
  );
}

DetailCard.propTypes = {
  movieDetails: PropTypes.object.isRequired,
};
