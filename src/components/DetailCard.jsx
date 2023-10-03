import PropTypes from "prop-types";

export default function DetailCard({
  movieDetails,
  handleDetailCardClick,
  handleCarrotClick,
  credits,
}) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

  const director = credits.crew.filter((person) => person.job === "Director");

  function renderVoteCount() {
    if (movieDetails.vote_average <= 1.9) {
      return <div>⭐️</div>;
    } else if (
      movieDetails.vote_average >= 2 &&
      movieDetails.vote_average < 4
    ) {
      return <div>⭐️⭐️</div>;
    } else if (
      movieDetails.vote_average >= 4 &&
      movieDetails.vote_average < 6
    ) {
      return <div>⭐️⭐️⭐️</div>;
    } else if (
      movieDetails.vote_average >= 6 &&
      movieDetails.vote_average < 8
    ) {
      return <div>⭐️⭐️⭐️⭐️</div>;
    } else if (
      movieDetails.vote_average >= 8 &&
      movieDetails.vote_average <= 10
    ) {
      return <div>⭐️⭐️⭐️⭐️⭐️</div>;
    }
  }
  return (
    <div className="detail-card">
      <div className="carrot-container-1">
        <a
          className="carrot-1"
          onClick={() => handleCarrotClick(movieDetails.id, "left")}
        ></a>
      </div>
      <div className="detail-image">
        {movieDetails.poster_path ? (
          <img
            style={{ width: "240px", height: "360px" }}
            src={BASE_POSTER_URL + movieDetails.poster_path}
          />
        ) : (
          <img style={{ width: "240px", height: "360px" }} src="niccage.jpg" />
        )}
      </div>
      <div className="detail-text">
        <h3>{movieDetails.title}</h3>
        <div className="vote-average">{renderVoteCount()}</div>
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
            {director[0] && <div>Director:</div>}
            {director[0] && <div>{director[0].name}</div>}
            {director[1] && <div>{director[1].name}</div>}
          </div>
          <br></br>
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
