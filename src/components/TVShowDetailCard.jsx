import PropTypes from "prop-types";

export default function TVShowDetailCard({
  TVShowDetails,
  handleDetailCardClick,
  credits,
  handleCarrotClick,
}) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="detail-card">
      <div className="carrot-container-1">
        <a
          className="carrot-1"
          onClick={() => handleCarrotClick(TVShowDetails.id, "left")}
        ></a>
      </div>
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
        <div className="credits">
          <div className="director">
            {TVShowDetails.created_by[0] && <div>Created By: </div>}
            {TVShowDetails.created_by[0] && (
              <div>{TVShowDetails.created_by[0].name}</div>
            )}
            {TVShowDetails.created_by[1] && (
              <div>{TVShowDetails.created_by[1].name}</div>
            )}
          </div>
          {credits.cast[0] && <div>Cast:</div>}
          <div className="actor-list">
            {credits.cast[0] && <div>{credits.cast[0].name}</div>}
            {credits.cast[1] && <div>{credits.cast[1].name}</div>}
            {credits.cast[2] && <div>{credits.cast[2].name}</div>}
            {credits.cast[3] && <div>{credits.cast[3].name}</div>}
          </div>
        </div>
      </div>
      <div className="carrot-container-2">
        <a
          className="carrot-2"
          onClick={() => handleCarrotClick(TVShowDetails.id, "right")}
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
TVShowDetailCard.propTypes = {
  TVShowDetails: PropTypes.object.isRequired,
  credits: PropTypes.object.isRequired,
  handleDetailCardClick: PropTypes.func.isRequired,
  handleCarrotClick: PropTypes.func.isRequired,
};
