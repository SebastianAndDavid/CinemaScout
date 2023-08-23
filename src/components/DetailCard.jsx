import PropTypes from "prop-types";

export default function DetailCard({ movieDetails, handleDetailCardClick }) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

  console.log("movieDetails", movieDetails);

  return (
    <div className="detail-card" onClick={() => handleDetailCardClick()}>
      <div className="carrot-container-1">
        <a className="carrot-1"></a>
      </div>
      <div className="detail-image">
        <img src={BASE_POSTER_URL + movieDetails.poster_path} />
      </div>
      <div className="detail-text">
        <h3>{movieDetails.title}</h3>
        <h4>{movieDetails.tagline}</h4>
        <p>{movieDetails.overview}</p>
      </div>
      <div className="carrot-container-2">
        <a className="carrot-2"></a>
      </div>
      <div className="x-container">
        <div className="x-button">&times;</div>
      </div>
    </div>
  );
}

DetailCard.propTypes = {
  movieDetails: PropTypes.object.isRequired,
  handleDetailCardClick: PropTypes.func.isRequired,
};
