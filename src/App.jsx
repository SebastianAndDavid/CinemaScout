import { useState } from "react";
import { getMovieBySearch } from "./utlils/tmdb-utils";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [isHover, setIsHover] = useState(false);
  const [movieId, setMovieId] = useState(null);

  console.log("searchResult", searchResult);

  console.log("id", movieId);
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
  }
  return (
    <>
      <h1>Hello from TMDB-Search-Display</h1>
      <input
        placeholder="Search"
        value={search}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" onClick={() => handleSubmit()}>
        Submit
      </button>
      <div className="movie-list-container">
        {searchResult.map((movie, i) => {
          if (isHover & (movie.id === movieId)) {
            return (
              <>
                <div className="movie-card-container">
                  <h4>{movie.title}</h4>
                  <MovieCard
                    movieObject={movie}
                    key={movie.id + i}
                    handleMouseEnter={handleMouseEnter}
                    // handleMouseLeave={handleMouseLeave}
                    isHover={isHover}
                  />
                </div>
              </>
            );
          } else {
            return (
              <>
                <MovieCard
                  movieObject={movie}
                  key={movie.id + i + 1}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  isHover={isHover}
                />
              </>
            );
          }
        })}
      </div>
    </>
  );
}

export default App;
