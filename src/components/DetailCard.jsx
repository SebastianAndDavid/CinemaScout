import PropTypes from "prop-types";

export default function DetailCard({
  movieDetails,
  handleDetailCardClick,
  handleCarrotClick,
}) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="detail-card">
      <div className="carrot-container-1">
        <a
          className="carrot-1"
          onClick={() => handleCarrotClick(movieDetails.id, "left")}
        ></a>
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
        <a
          className="carrot-2"
          onClick={() => handleCarrotClick(movieDetails.id, "right")}
        ></a>
      </div>
      <div className="x-container">
        <div className="x-button" onClick={() => handleDetailCardClick()}>
          &times;
        </div>
      </div>
    </div>
  );
}

DetailCard.propTypes = {
  movieDetails: PropTypes.object.isRequired,
  handleDetailCardClick: PropTypes.func.isRequired,
  handleCarrotClick: PropTypes.func.isRequired,
};
