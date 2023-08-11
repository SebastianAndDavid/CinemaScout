const API_KEY = "46db8a5c2f862f015781b602a58bdd9d";

// https://api.themoviedb.org/3/discover/movie?page=1&primary_release_year=2001&with_genres=35%2C18%2C28

async function getMovieBySearch(search) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`
  );
  const { results } = await response.json();
  return results;
}

async function getMovieById() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/9988?api_key=${API_KEY}`
  );

  const results = await response.json();
  return results;
}

async function getDiscover(year, genres) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=1&primary_release_year=${year}&with_genres=${genres}&api_key=${API_KEY}`
  );

  const results = await response.json();
  console.log("results", results);
  return results;
}

export { getMovieBySearch, getMovieById, getDiscover };
