import PropTypes from "prop-types";

export default function DetailCard({
  movieDetails,
  handleDetailCardClick,
  handleCarrotClick,
}) {
  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

  console.log("movieDetails", movieDetails);

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
            <p>Quentin</p>
          </div>
          <div className="actor-list">
            <p>John Smith</p>
            <p>Amy Smith</p>
            <p>Bill Hader</p>
            <p>Hill Bader</p>
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
};
