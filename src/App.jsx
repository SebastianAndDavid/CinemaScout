import { useEffect, useState } from "react";
import {
  getCreditsById,
  getDetailsById,
  getDiscover,
  getMovieBySearch,
  getTVShowBySearch,
  getTVShowCreditsById,
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
  const [didClickTVCarrot, setDidClickTVCarrot] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [didClickDiscover, setDidClickDiscover] = useState(false);
  const [page, setPage] = useState(1);
  const [persistentSearch, setPersistentSearch] = useState("");
  const [inputToggle, setInputToggle] = useState(false);
  const [credits, setCredits] = useState([]);
  const [TVCredits, setTVCredits] = useState([]);

  const [splashPage, setSplashPage] = useState(true);
  const [didClickHandleSubmit, setDidClickHandleSubmit] = useState(false);
  const [didClickTVShowCard, setDidClickTVShowCard] = useState(false);
  const [TVShowDetails, setTVShowDetails] = useState({});

  async function handleSeeMoreResultsClick() {
    if (!inputToggle) {
      if (didClickHandleSubmit) {}
      const res = didClickHandleSubmit ? 
      await getMovieBySearch(persistentSearch, page + 1)
      : await getTVShowBySearch(persistentSearch, page + 1);
      // const res = await getMovieBySearch(persistentSearch, page + 1);
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
      const tvCreditResult = await getTVShowCreditsById(id);
      setTVCredits(tvCreditResult);
      const tvResult = await getTVShowDetailsById(id);
      setTVShowDetails(tvResult);
      document.body.style.overflow = "hidden";
      setDidClickTVShowCard(true);
    }
  }

  async function handleCarrotClick(id, carrotDirection) {
    const currentIndex = searchResult.map((result) => result.id).indexOf(id);

    if (didClickHandleSubmit) {
      if (carrotDirection === "right") {
        const results =
          currentIndex === searchResult.length - 1
            ? await getDetailsById(searchResult[0].id)
            : await getDetailsById(searchResult[currentIndex + 1].id);
        const creditResult =
          currentIndex === searchResult.length - 1
            ? await getCreditsById(searchResult[0].id)
            : await getCreditsById(searchResult[currentIndex + 1].id);
        setCredits(creditResult);
        setMovieDetails(results);
        setDidClickCarrot(true);
      } else if (carrotDirection === "left") {
        const results =
          currentIndex === 0
            ? await getDetailsById(searchResult[searchResult.length - 1].id)
            : await getDetailsById(searchResult[currentIndex - 1].id);
        const creditResult =
          currentIndex === 0
            ? await getCreditsById(searchResult[searchResult.length - 1].id)
            : await getCreditsById(searchResult[currentIndex - 1].id);
        setCredits(creditResult);
        setMovieDetails(results);
        setDidClickCarrot(true);
      }
    } else {
      if (carrotDirection === "right") {
        const results =
          currentIndex === searchResult.length - 1
            ? await getTVShowDetailsById(searchResult[0].id)
            : await getTVShowDetailsById(searchResult[currentIndex + 1].id);
        const creditResult =
          currentIndex === searchResult.length - 1
            ? await getTVShowCreditsById(searchResult[0].id)
            : await getTVShowCreditsById(searchResult[currentIndex + 1].id);
        setTVCredits(creditResult);
        setTVShowDetails(results);
        setDidClickTVCarrot(true);
      } else if (carrotDirection === "left") {
        const results =
          currentIndex === 0
            ? await getTVShowDetailsById(
                searchResult[searchResult.length - 1].id
              )
            : await getTVShowDetailsById(searchResult[currentIndex - 1].id);
        const creditResult =
          currentIndex === 0
            ? await getTVShowCreditsById(
                searchResult[searchResult.length - 1].id
              )
            : await getTVShowCreditsById(searchResult[currentIndex - 1].id);
        setTVCredits(creditResult);
        setTVShowDetails(results);
        setDidClickTVCarrot(true);
      }
    }
  }

  function handleDetailCardClick() {
    document.body.style.overflow = "";
    if (didClickMovieCard) {
      setDidClickMovieCard(false);
    } else if (didClickTVShowCard) {
      setDidClickTVShowCard(false);
    }
    setDidClickCarrot(false);
    setDidClickTVCarrot(false);
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
    setPage(1)
    setDidClickTVShowCard(false);
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
        {!didClickMovieCard & !didClickTVShowCard && (
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
                setDidClickHandleSubmit={setDidClickHandleSubmit}
                setSplashPage={setSplashPage}
              />
            )}
          </header>
        )}
        {splashPage && (
          <div className="splash-page">
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
                      {
                        movie.title ? 
                        <h4>{movie.title}</h4>
                        :
                       <h4>{movie.name}</h4> 
                      }
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
          {(didClickTVShowCard || didClickTVCarrot) && (
            <TVShowDetailCard
              TVShowDetails={TVShowDetails}
              handleDetailCardClick={handleDetailCardClick}
              handleCarrotClick={handleCarrotClick}
              credits={TVCredits}
            />
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
