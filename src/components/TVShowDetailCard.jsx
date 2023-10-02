import PropTypes from "prop-types";

export default function TVShowDetailCard({ TVShowDetails }) {
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
      <div className="detail-text"></div>
      <div className="carrot-container-2"></div>
      <div className="x-container"></div>
    </div>
  );
}
TVShowDetailCard.propTypes = {
  TVShowDetails: PropTypes.object.isRequired,
};
