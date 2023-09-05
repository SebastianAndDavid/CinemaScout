import PropTypes from "prop-types";

export default function DetailCard({
  movieDetails,
  handleDetailCardClick,
  handleCarrotClick,
  credits,
}) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

  const director = credits.crew.filter((person) => person.job === "Director");

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
        {movieDetails.tagline && <h4>{movieDetails.tagline}</h4>}

        <div className="releasedate-runtime">
          <p>Release Date: {movieDetails.release_date}</p>
          <p>Runtime: {movieDetails.runtime}</p>
        </div>
        {movieDetails.homepage && (
          <a href={movieDetails.homepage} target="blank">
            Official Page
          </a>
        )}
        <p>{movieDetails.overview}</p>
        <div className="credits">
          <div className="director">
            {director && <p>{director[0].name}</p>}
            {director[1] && <p>{director[1].name}</p>}
          </div>
          <div className="actor-list">
            {credits.cast[0] && <p>{credits.cast[0].name}</p>}
            {credits.cast[1] && <p>{credits.cast[1].name}</p>}
            {credits.cast[2] && <p>{credits.cast[2].name}</p>}
            {credits.cast[3] && <p>{credits.cast[3].name}</p>}
          </div>
        </div>
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
  credits: PropTypes.object.isRequired,
};
