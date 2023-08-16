import { useEffect, useState } from "react";
import { getDetailsById, getMovieBySearch } from "./utils/tmdb-utils";
import MovieCard from "./components/MovieCard";
import "./App.css";
import Inputs from "./components/Inputs";
import DetailCard from "./components/DetailCard";

function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [didClickMovieCard, setDidClickMovieCard] = useState(false);

  console.log("searchResult", searchResult);

  const [isHover, setIsHover] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [didClickDiscover, setDidClickDiscover] = useState(false);

  async function handleMovieCardClick(id) {
    const result = await getDetailsById(id);
    setMovieDetails(result);
    setDidClickMovieCard(true);
    console.log("result", result);
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
    setSearch("");
    setDidClickMovieCard(false);
  }

  useEffect(() => {
    setIsChecked(false);
  }, [searchResult]);

  return (
    <>
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
      {didClickMovieCard ? (
        <div className="detail-container">
          <DetailCard
            movieDetails={movieDetails}
            setDidClickMovieCard={setDidClickMovieCard}
          />
        </div>
      ) : (
        <div className="movie-list-container">
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
      )}
    </>
  );
}

export default App;
