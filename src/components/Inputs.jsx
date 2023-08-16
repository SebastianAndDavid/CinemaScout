import PropTypes from "prop-types";
import { useState } from "react";
import { genreArray } from "../utils/genres";
import { getDiscover } from "../utils/tmdb-utils";

export default function Inputs({
  search,
  setSearch,
  handleSubmit,
  setSearchResult,
  setIsChecked,
  setDidClickDiscover,
  setDidClickMovieCard,
}) {
  const [genreClick, setGenreClick] = useState([]);
  const [seeMoreClick, setSeeMoreClick] = useState(false);
  const [releaseDateValue, setReleaseDateValue] = useState("");

  function checkValue(array, value) {
    if (array.includes(value)) {
      const updatedArray = array.filter((item) => item !== value);
      setGenreClick(updatedArray);
    } else {
      setGenreClick([...array, value]);
    }
  }

  function handleGenreClick(e) {
    const value = e.target.value;
    checkValue(genreClick, value);
  }

  async function handleDiscover() {
    setDidClickMovieCard(false);
    if (
      (releaseDateValue != "") & (releaseDateValue < 1888) ||
      releaseDateValue > 2026
    ) {
      return alert("Please enter a valid date between 1888 and present");
    } else {
      const genres = genreClick.join();
      const { results } = await getDiscover(releaseDateValue, genres);
      setSearchResult(results);
      setReleaseDateValue("");
      setIsChecked(true);
      setDidClickDiscover(true);
    }
  }

  return (
    <div className="inputs-container">
      <div className="search-container">
        <input
          placeholder="Search"
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
      <div className="discover-container">
        <div className="genres-container">
          <label>
            <input
              type="checkbox"
              value={"35"}
              onClick={(e) => handleGenreClick(e)}
            />
            Comedy
          </label>
          <label>
            <input
              type="checkbox"
              value={"18"}
              onClick={(e) => handleGenreClick(e)}
            />
            Drama
          </label>
          <label>
            <input
              type="checkbox"
              value={"28"}
              onClick={(e) => handleGenreClick(e)}
            />
            Action
          </label>
          {seeMoreClick &&
            genreArray.map((genre, i) => {
              return (
                <label key={genre.id + i}>
                  <input
                    type="checkbox"
                    value={genre.id}
                    onClick={(e) => handleGenreClick(e)}
                  />
                  {genre.name}
                </label>
              );
            })}
          <br></br>
          {seeMoreClick ? (
            <a onClick={() => setSeeMoreClick(false)}>See less</a>
          ) : (
            <a onClick={() => setSeeMoreClick(true)}>See more</a>
          )}
        </div>
        <div className="release-date-container">
          <input
            placeholder="Release date"
            value={releaseDateValue}
            type="number"
            onChange={(e) => setReleaseDateValue(e.target.value)}
          />
          <button onClick={() => handleDiscover()}>Discover</button>
        </div>
      </div>
    </div>
  );
}

Inputs.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSearchResult: PropTypes.func.isRequired,
  setDidClickDiscover: PropTypes.func.isRequired,
  setIsChecked: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setDidClickMovieCard: PropTypes.func.isRequired,
};
