import { useState } from "react";
import { getMovieBySearch } from "./utlils/tmdb-utils";

function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState({});

  async function handleSubmit() {
    const result = await getMovieBySearch(search);
    setSearchResult(result);
    console.log("searchResult", searchResult);
  }
  return (
    <>
      <h1>Hello from TMDB-Search-Display</h1>
      <input
        placeholder="Search"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" onClick={() => handleSubmit()}>
        Submit
      </button>
    </>
  );
}

export default App;
