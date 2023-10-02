import PropTypes from "prop-types";

export default function TVShowDetailCard({
  TVShowDetails,
  handleDetailCardClick,
}) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";
  console.log("TVShowDetails", TVShowDetails);

  return (
    <div className="detail-card">
      <div className="carrot-container-1"></div>
      <div className="detail-image">
        {TVShowDetails.poster_path ? (
          <img
            style={{ width: "240px", height: "360px" }}
            src={BASE_POSTER_URL + TVShowDetails.poster_path}
          />
        ) : (
          <img style={{ width: "240px", height: "360px" }} src="niccage.jpg" />
        )}
      </div>
      <div className="detail-text">
        <h3>{TVShowDetails.name}</h3>
        {TVShowDetails.tagline && <h4>{TVShowDetails.tagline}</h4>}
        <div className="releasedate-runtime">
          <p>Release Date: {TVShowDetails.first_air_date}</p>
          <p>Runtime: {TVShowDetails.episode_run_time}</p>
        </div>
        {TVShowDetails.homepage && (
          <a href={TVShowDetails.homepage} target="blank">
            Official Page
          </a>
        )}
        <p>{TVShowDetails.overview}</p>
      </div>
      <div className="carrot-container-2"></div>
      <div className="x-container">
        <div className="x-button" onClick={() => handleDetailCardClick()}>
          &times;
        </div>
      </div>
    </div>
  );
}
TVShowDetailCard.propTypes = {
  TVShowDetails: PropTypes.object.isRequired,
  handleDetailCardClick: PropTypes.func.isRequired,
};
