const API_KEY = "46db8a5c2f862f015781b602a58bdd9d";

async function getMovieBySearch(search) {
  console.log("search", search);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`
  );
  const results = await response.json();
  console.log("results", results);
  return results;
}

async function getMovieById() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/9988?api_key=${API_KEY}`
  );

  const results = await response.json();
  return results;
}

export { getMovieBySearch, getMovieById };
