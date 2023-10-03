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
  setDidClickHandleSubmit,
  setDidClickMovieCard,
  setGenreClick,
  genreClick,
  releaseDateValue,
  setReleaseDateValue,
  setPersistentGenreClick,
  setPersistentReleaseDateValue,
  inputToggle,
  setInputToggle,
  setSplashPage,
  handleTVSearchSubmit,
  searchOptionValue,
  setSearchOptionValue
}) {
  const [seeMoreClick, setSeeMoreClick] = useState(false);
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

  async function handleDiscover(e) {
    e.preventDefault();
    if (searchOptionValue == 'movie') {
      setDidClickHandleSubmit(true);
    } else {
      setDidClickHandleSubmit(false);
    }
    setDidClickMovieCard(false);
    if (
      (releaseDateValue != "") & (releaseDateValue < 1888) ||
      releaseDateValue > 2026
    ) {
      return alert("Please enter a valid date between 1888 and present");
    } else {
      const genres = genreClick.join();
      const { results } = await getDiscover(searchOptionValue, releaseDateValue, genres);
      console.log(results)
      setSearchResult(results);
      setPersistentGenreClick(genreClick);
      setPersistentReleaseDateValue(releaseDateValue);
      setIsChecked(true);
      setDidClickDiscover(true);
      setReleaseDateValue("");
      setGenreClick([]);
      setSplashPage(false);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="inputs-container">
      <>
        {!inputToggle ? (
          <button
            className="toggle-button"
            onClick={() => setInputToggle(true)}
            title="Click to discover"
          >
            🔮
          </button>
        ) : (
          <button
            className="toggle-button"
            onClick={() => setInputToggle(false)}
            title="Click to search"
          >
            🔍
          </button>
        )}
        {!inputToggle ? (
          <div className="search-container">
            <select onChange={(e) => setSearchOptionValue(e.target.value)}>
              <option value="movie">Movies</option>
              <option value="tv">TV shows</option>
            </select>
            <form>
              <input
                placeholder="Search"
                value={search}
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
              {searchOptionValue === "movie" ? (
                <button type="submit" onClick={(e) => handleSubmit(e)}>
                  <img src="search.svg" />
                </button>
              ) : (
                <button type="submit" onClick={(e) => handleTVSearchSubmit(e)}>
                  <img src="search.svg" />
                </button>
              )}
            </form>
          </div>
        ) : (
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
              <label>
                <input
                  type="checkbox"
                  value={"12"}
                  onClick={(e) => handleGenreClick(e)}
                />
                Adventure
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
            <select onChange={(e) => setSearchOptionValue(e.target.value)}>
              <option value="movie">Movies</option>
              <option value="tv">TV shows</option>
            </select>
              <form>
                <input
                  placeholder="Release date"
                  value={releaseDateValue}
                  type="number"
                  onChange={(e) => setReleaseDateValue(e.target.value)}
                />
                <button onClick={(e) => handleDiscover(e)}>
                  <img src="globe.svg" />
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

Inputs.propTypes = {
  search: PropTypes.string.isRequired,
  searchOptionValue: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSearchOptionValue: PropTypes.func.isRequired,
  releaseDateValue: PropTypes.string.isRequired,
  setSearchResult: PropTypes.func.isRequired,
  inputToggle: PropTypes.bool.isRequired,
  setInputToggle: PropTypes.func.isRequired,
  setDidClickDiscover: PropTypes.func.isRequired,
  setDidClickHandleSubmit: PropTypes.func.isRequired,
  setIsChecked: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTVSearchSubmit: PropTypes.func.isRequired,
  setDidClickMovieCard: PropTypes.func.isRequired,
  setGenreClick: PropTypes.func.isRequired,
  setPersistentGenreClick: PropTypes.func.isRequired,
  setPersistentReleaseDateValue: PropTypes.func.isRequired,
  setReleaseDateValue: PropTypes.func.isRequired,
  setSplashPage: PropTypes.func.isRequired,
  genreClick: PropTypes.array.isRequired,
};
