"use strict";

// Import function for fetching movies
import { fetchMovies } from "./api.js";

// Create an empty array to store movies
let movies = [];

// Select DOM elements
const search = document.getElementById("search");
const moviesContainer = document.getElementById("movies__container");
const loadingMessage = document.querySelector(".status");

// Render movies to the DOM
export function displayMovies(movieList) {
  moviesContainer.classList.add("grid");
  moviesContainer.innerHTML = "";

  movieList.forEach((movie) => {
    // Create clickable movie cards linking to product page
    const movieCard = document.createElement("a");
    movieCard.classList.add("movie");
    movieCard.href = `../product/?id=${movie.id}`;

    // Create image element
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie__thumbnail");
    movieImg.src = movie.image.url;
    movieImg.alt = movie.image.alt;

    // Text container element
    const movieTexts = document.createElement("div");
    movieTexts.classList.add("movie__card__texts");

    // Title element
    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.title;

    // Genre and release year element
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("additional__texts");
    movieInfo.textContent = `${movie.genre} - ${movie.released}`;

    // Regular price element
    const moviePrice = document.createElement("span");
    moviePrice.textContent = `${movie.price},-`;

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price__container");

    // Handle discounted price and sale icon
    if (movie.price !== movie.discountedPrice && movie.onSale) {
      const discountedPrice = document.createElement("div");
      discountedPrice.textContent = `${movie.discountedPrice},-`;

      const discountedPriceTag = document.createElement("div");
      discountedPriceTag.classList.add("product__discount");
      discountedPriceTag.textContent = "SALE";

      // Style original price with line-through
      moviePrice.classList.add("old__price");

      // Append elements to the DOM
      movieCard.append(discountedPriceTag);
      priceContainer.append(discountedPrice);
    }

    // Append elements to the DOM
    movieCard.append(movieImg, movieTexts);
    movieTexts.append(movieTitle, movieInfo, priceContainer);
    moviesContainer.appendChild(movieCard);
    priceContainer.append(moviePrice);
  });
}

// Fetch all movies from the API and display them
async function getMovies() {
  try {
    movies = await fetchMovies();
    displayMovies(movies);
  } catch (error) {
    // Handle API or network errors
    moviesContainer.classList.remove("grid");
    moviesContainer.innerHTML = `
    <div class="loading">
      <p class="status">Failed to load movies...</p>
    </div>`;
    console.error(error);
  }
}

// Filter movies based on search input (title or genre only)
function filterMovies(searchTerm) {
  const term = searchTerm.toLowerCase().trim();

  // Return all movies if search is empty
  if (!term) {
    return movies;
  }

  // Match movies against title or genre
  return movies.filter((movie) => {
    const nameMatch = movie.title.toLowerCase().includes(term);
    const genreMatch = movie.genre.toLowerCase().includes(term);

    return nameMatch || genreMatch;
  });
}

// Add event listener for user input and update displayed movies
search.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  const filteredMovies = filterMovies(searchTerm);

  if (filteredMovies.length === 0) {
    moviesContainer.classList.remove("grid");
    moviesContainer.innerHTML = `
    <div class="loading">
      <p class="status">No results found for your search.</p>
    </div>`;
  } else {
    displayMovies(filteredMovies);
  }
});

// Render movies
getMovies();
