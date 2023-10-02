import { useEffect, useState } from "react";
import {
  getCreditsById,
  getDetailsById,
  getDiscover,
  getMovieBySearch,
  getTVShowBySearch,
  getTVShowDetailsById,
} from "./utils/tmdb-utils";
import MovieCard from "./components/MovieCard";
import "./App.css";
import Inputs from "./components/Inputs";
import DetailCard from "./components/DetailCard";
import TVShowDetailCard from "./components/TVShowDetailCard";

function App() {
  const [genreClick, setGenreClick] = useState([]);
  const [persistentGenreClick, setPersistentGenreClick] = useState([]);
  const [releaseDateValue, setReleaseDateValue] = useState("");
  const [persistentReleaseDateValue, setPersistentReleaseDateValue] =
    useState("");
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
  const [inputToggle, setInputToggle] = useState(false);
  const [credits, setCredits] = useState([]);
  const [splashPage, setSplashPage] = useState(true);
  const [didClickHandleSubmit, setDidClickHandleSubmit] = useState(false);
  const [didClickTVShowCard, setDidClickTVShowCard] = useState(false);
  const [TVShowDetails, setTVShowDetails] = useState({});

  async function handleSeeMoreResultsClick() {
    if (!inputToggle) {
      const res = await getMovieBySearch(persistentSearch, page + 1);
      setSearchResult([...searchResult, ...res]);
    } else {
      const { results } = await getDiscover(
        persistentReleaseDateValue,
        persistentGenreClick,
        page + 1
      );
      setSearchResult([...searchResult, ...results]);
    }

    setPage(page + 1);
  }

  async function handleMovieCardClick(id) {
    if (didClickHandleSubmit) {
      const creditResult = await getCreditsById(id);
      setCredits(creditResult);
      const result = await getDetailsById(id);
      setMovieDetails(result);
      document.body.style.overflow = "hidden";
      setDidClickMovieCard(true);
    } else {
      const tvResult = await getTVShowDetailsById();
      setTVShowDetails(tvResult);
      document.body.style.overflow = "hidden";
      setDidClickTVShowCard(true);
    }
  }

  async function handleCarrotClick(movieId, carrotDirection) {
    const currentMovieIndex = searchResult
      .map((movie) => movie.id)
      .indexOf(movieId);

    if (carrotDirection === "right") {
      const results =
        currentMovieIndex === searchResult.length - 1
          ? await getDetailsById(searchResult[0].id)
          : await getDetailsById(searchResult[currentMovieIndex + 1].id);
      const creditResult =
        currentMovieIndex === searchResult.length - 1
          ? await getCreditsById(searchResult[0].id)
          : await getCreditsById(searchResult[currentMovieIndex + 1].id);
      setCredits(creditResult);
      setMovieDetails(results);
      setDidClickCarrot(true);
    } else if (carrotDirection === "left") {
      const results =
        currentMovieIndex === 0
          ? await getDetailsById(searchResult[searchResult.length - 1].id)
          : await getDetailsById(searchResult[currentMovieIndex - 1].id);
      const creditResult =
        currentMovieIndex === 0
          ? await getCreditsById(searchResult[searchResult.length - 1].id)
          : await getCreditsById(searchResult[currentMovieIndex - 1].id);
      setCredits(creditResult);
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

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await getMovieBySearch(search);
    setSearchResult(result);
    setPersistentSearch(search);
    setSearch("");
    setPage(1);
    setDidClickMovieCard(false);
    setSplashPage(false);
    setDidClickHandleSubmit(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleTVSearchSubmit(e) {
    e.preventDefault();
    const result = await getTVShowBySearch(search);
    setSearchResult(result);
    setPersistentSearch(search);
    setSearch("");
    setDidClickMovieCard(false);
    setSplashPage(false);
    setDidClickHandleSubmit(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setIsChecked(false);
  }, [searchResult]);

  return (
    <>
      <div className="parent">
        {!didClickMovieCard && (
          <header className="header">
            {!isChecked && (
              <Inputs
                inputToggle={inputToggle}
                setInputToggle={setInputToggle}
                setPersistentGenreClick={setPersistentGenreClick}
                setPersistentReleaseDateValue={setPersistentReleaseDateValue}
                releaseDateValue={releaseDateValue}
                setReleaseDateValue={setReleaseDateValue}
                genreClick={genreClick}
                setGenreClick={setGenreClick}
                setDidClickMovieCard={setDidClickMovieCard}
                search={search}
                setSearch={setSearch}
                handleSubmit={handleSubmit}
                handleTVSearchSubmit={handleTVSearchSubmit}
                setSearchResult={setSearchResult}
                setIsChecked={setIsChecked}
                setDidClickDiscover={setDidClickDiscover}
                setSplashPage={setSplashPage}
              />
            )}
          </header>
        )}
        {splashPage && (
          <div className="splash-page">
            {/* <h2>Welcome to Nick Cage&apos;s Movie Library </h2> */}
            <img src="bunnycage.jpg" />
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
              credits={credits}
            />
          )}
          {didClickTVShowCard && (
            <TVShowDetailCard TVShowDetails={TVShowDetails} />
          )}
        </div>
        {searchResult.length % 20 === 0 && searchResult.length !== 0 && (
          <button onClick={() => handleSeeMoreResultsClick()}>more?</button>
        )}
      </div>
    </>
  );
}

export default App;
