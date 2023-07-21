import { useState } from "react";
import { getMovieBySearch } from "./utlils/tmdb-utils";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
          return <MovieCard movieObject={movie} key={movie.id + i} />;
        })}
      </div>
    </>
  );
}

export default App;
