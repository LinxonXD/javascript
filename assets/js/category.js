"use strict";

// Import function for fetching and displaying movies
import { fetchMovies } from "./api.js";
import { displayMovies } from "./index.js";

// Extract selected genre from URL
const params = new URLSearchParams(window.location.search);
const activeGenre = params.get("genre");

// Fetch movies, filter and display them
async function getMovies() {
  const movies = await fetchMovies();

  // Filter movies by active genre
  const filteredMovies = activeGenre
    ? movies.filter((m) => m.genre === activeGenre)
    : movies;

  let genres = [];

  movies.forEach((movie) => {
    if (!genres.includes(movie.genre)) {
      genres.push(movie.genre);
    }
  });

  // Render and display category buttons and list of movies
  displayButtons(genres);
  displayMovies(filteredMovies);
}

// Display genre buttons
function displayButtons(genres) {
  const buttonsContainer = document.getElementById("buttons__container");
  buttonsContainer.innerHTML = "";

  // Create "All" button element
  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.classList.add("additional__box", "category__btn");

  // Highlight if no genre is selected
  allBtn.classList.toggle("active", !activeGenre);

  allBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // Reset URL to show all movies
    window.location.search = "";
  });
  buttonsContainer.appendChild(allBtn);

  // Create button elements for each genre
  genres.forEach((genre) => {
    const genreBtn = document.createElement("button");
    genreBtn.textContent = genre;
    genreBtn.classList.add("additional__box", "category__btn");
    genreBtn.classList.toggle("active", genre === activeGenre);

    genreBtn.addEventListener("click", (event) => {
      event.preventDefault();

      // Update URL with selected genre
      window.location.search = `?genre=${genre}`;
    });
    buttonsContainer.appendChild(genreBtn);
  });
}

// Render movies
getMovies();
