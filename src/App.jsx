import { useState } from "react";
import { getMovieBySearch } from "./utlils/tmdb-utils";

function App() {
  const [search, setSearch] = useState("");
  const [staticSearch, setStaticSearch] = useState("");
  const [searchResult, setSearchResult] = useState({});

  async function handleSubmit() {
    setStaticSearch(search);
    const result = await getMovieBySearch(staticSearch);
    setSearchResult(result);
    console.log("searchResult", searchResult);
  }
  return (
    <>
      <h1>Hello from TMDB-Search-Display</h1>
      <form onSubmit={() => handleSubmit()}>
        <input
          placeholder="Search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{searchResult.results}</p>
    </>
  );
}

export default App;
