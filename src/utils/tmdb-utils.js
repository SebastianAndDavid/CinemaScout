const API_KEY = "46db8a5c2f862f015781b602a58bdd9d";

// https://api.themoviedb.org/3/discover/movie?page=1&primary_release_year=2001&with_genres=35%2C18%2C28

async function getMovieBySearch(search, page = 1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}&page=${page}`
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

async function getDiscover(year, genres, page = 1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=1&primary_release_year=${year}&with_genres=${genres}&api_key=${API_KEY}&page=${page}`
  );
  // Trace steps to be able to destructure {results}
  const results = await response.json();
  return results;
}

async function getDetailsById(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=46db8a5c2f862f015781b602a58bdd9d`
  );

  const results = await response.json();
  return results;
}

async function getCreditsById(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=46db8a5c2f862f015781b602a58bdd9d`
  );

  const results = await response.json();
  return results;
}

async function getTVShowBySearch(search) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=en-US&page=1&api_key=46db8a5c2f862f015781b602a58bdd9d`
  );
  const { results } = await response.json();
  return results;
}

async function getTVShowDetailsById() {
  const response = await fetch(
    "https://api.themoviedb.org/3/tv/2317?language=en-US&api_key=46db8a5c2f862f015781b602a58bdd9d"
  );
  const results = await response.json();
  return results;
}

export {
  getMovieBySearch,
  getMovieById,
  getDiscover,
  getDetailsById,
  getCreditsById,
  getTVShowBySearch,
  getTVShowDetailsById,
};
