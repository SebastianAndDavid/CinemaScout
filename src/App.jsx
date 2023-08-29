import { useEffect, useState } from "react";
import {
  getDetailsById,
  getDiscover,
  getMovieBySearch,
} from "./utils/tmdb-utils";
import MovieCard from "./components/MovieCard";
import "./App.css";
import Inputs from "./components/Inputs";
import DetailCard from "./components/DetailCard";

function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [didClickMovieCard, setDidClickMovieCard] = useState(false);
  const [didClickCarrot, setDidClickCarrot] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [didClickDiscover, setDidClickDiscover] = useState(false);
  const [page, setPage] = useState(1);
  const [persistentSearch, setPersistentSearch] = useState("");

  // res will be ternery for either getMovieBySearch or getDiscover
  async function handleSeeMoreClick() {
    const res = await getMovieBySearch(persistentSearch, page + 1);
    setSearchResult([...searchResult, ...res]);
    setPage(page + 1);
  }

  async function handleMovieCardClick(id) {
    const result = await getDetailsById(id);
    setMovieDetails(result);
    document.body.style.overflow = "hidden";
    setDidClickMovieCard(true);
  }

  async function handleCarrotClick(movieId, carrotDirection) {
    const currentMovieIndex = searchResult
      .map((movie) => movie.id)
      .indexOf(movieId);

    if (carrotDirection === "right") {
      const results = await getDetailsById(
        searchResult[currentMovieIndex + 1].id
      );
      setMovieDetails(results);
      setDidClickCarrot(true);
    } else if (carrotDirection === "left") {
      const results = await getDetailsById(
        searchResult[currentMovieIndex - 1].id
      );
      setMovieDetails(results);
      setDidClickCarrot(true);
    }
  }

  function handleDetailCardClick() {
    document.body.style.overflow = "";
    setDidClickMovieCard(false);
    setDidClickCarrot(false);
  }

  function handleMouseEnter(movieId) {
    setIsHover(true);
    setMovieId(movieId);
  }
  function handleMouseLeave() {
    setIsHover(false);
  }
  async function handleSubmit() {
    const result = await getMovieBySearch(search);
    setSearchResult(result);
    setPersistentSearch(search);
    setSearch("");
    setPage(1);
    setDidClickMovieCard(false);
  }

  useEffect(() => {
    setIsChecked(false);
  }, [searchResult]);

  return (
    <>
      <div className="parent">
        {!didClickMovieCard && (
          <div className="header">
            <h1>Hello from TMDB-Search-Display</h1>
            {!isChecked && (
              <Inputs
                setDidClickMovieCard={setDidClickMovieCard}
                search={search}
                setSearch={setSearch}
                handleSubmit={handleSubmit}
                setSearchResult={setSearchResult}
                setIsChecked={setIsChecked}
                setDidClickDiscover={setDidClickDiscover}
              />
            )}
          </div>
        )}
        <div
          className={
            didClickMovieCard
              ? "movie-list-container-opaque"
              : "movie-list-container"
          }
        >
          {searchResult.length <= 0 && didClickDiscover ? (
            <p>Sorry, no results!</p>
          ) : (
            searchResult.map((movie, i) => {
              if (isHover & (movie.id === movieId)) {
                return (
                  <>
                    <div className="movie-card-container">
                      <h4>{movie.title}</h4>
                      <MovieCard
                        handleMovieCardClick={handleMovieCardClick}
                        movieObject={movie}
                        key={movie.id + i}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        isHover={isHover}
                      />
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <MovieCard
                      handleMovieCardClick={handleMovieCardClick}
                      movieObject={movie}
                      key={movie.id + i + 1}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      isHover={isHover}
                    />
                  </>
                );
              }
            })
          )}
        </div>
        <div className="detail-container">
          {(didClickMovieCard || didClickCarrot) && (
            <DetailCard
              movieDetails={movieDetails}
              handleDetailCardClick={handleDetailCardClick}
              handleCarrotClick={handleCarrotClick}
            />
          )}
        </div>
        {searchResult.length >= 19 && (
          <button onClick={() => handleSeeMoreClick()}>more?</button>
        )}
      </div>
    </>
  );
}

export default App;
