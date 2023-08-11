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

  function handleSeeMore() {
    setSeeMoreClick(true);
  }

  return (
    <>
      <div>
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
      <div>
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
        <a onClick={() => handleSeeMore()}>See more</a>
      </div>
    </>
  );
}

Inputs.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
