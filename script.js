const API_KEY = "1434d8b3b2dcf996651bde177955a2c7";

const searchInput = document.getElementById("searchMovies");
const searchLogo = document.querySelector(".searchLogo");
const section = document.querySelector("section");
const noResults = document.getElementById("noResults");

// Clear previous results
function clearMovies() {
  section.innerHTML = "";
  noResults.style.display = "none";
  section.style.display = "none";
}

// Create a movie card and append it
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("card");

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  card.innerHTML = `
      <img src="${poster}" alt="${
    movie.title
  }" onerror="this.onerror=null;this.src='assets/fallback.png';">
    <div class="movieInfo">
      <h3 id="movieTitle">${movie.title || "No Title Found"}</h3>
      <p id="movieRating">Rating: ${movie.vote_average || "N/A"}</p>
      <div class="overView">
        <h3 id="movieOverView">Overview</h3>
        <p id="movieDetails">${movie.overview || "No Overview Available"}</p>
      </div>
    </div>
  `;

  section.appendChild(card);
}

// Show the "No Movies Found" message
function showNoMoviesFound() {
  noResults.style.display = "block";
  section.style.display = "none";
}

// Search movies from TMDB
async function searchMovies() {
  const query = searchInput.value.trim();
  clearMovies();

  if (!query) {
    alert("Please enter a movie name!");
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      showNoMoviesFound();
      return;
    }

    section.style.display = "flex";
    data.results.forEach(createMovieCard);
  } catch (error) {
    console.error("Error fetching movies:", error);
    alert("Something went wrong. Please try again.");
  }
}

// Event listeners
searchLogo.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchMovies();
})
