import { getMovieById, getMovieBySearch } from "./utlils/tmdb-utils";

function App() {
  async function displayStuff() {
    const data = await getMovieBySearch();
    const dataById = await getMovieById();
    console.log("dataById", dataById);
    console.log("data from app", data);
    return data, dataById;
  }
  displayStuff();
  return (
    <>
      <h1>Hello from TMDB-Search-Display</h1>
    </>
  );
}

export default App;
