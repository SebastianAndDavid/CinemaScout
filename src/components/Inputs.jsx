import PropTypes from "prop-types";
import { useState } from "react";
import { genreArray } from "../utils/genres";

export default function Inputs({ search, setSearch, handleSubmit }) {
  const [genreClick, setGenreClick] = useState([]);
  const [seeMoreClick, setSeeMoreClick] = useState(false);
  console.log("genreClick", genreClick);

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
          <input placeholder="Release date" />
          <button>Discover</button>
        </div>
      </div>
    </div>
  );
}

Inputs.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
