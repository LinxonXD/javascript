"use strict";

// Import functions for fetching movies and adding product to cart
import { fetchMovies } from "./api.js";
import { addToCart } from "./cart.js";

// Extract movie ID from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// Select DOM elements
const productInformation = document.querySelector(".product__information");
const productTexts = document.querySelector(".product__texts");
const toastContainer = document.getElementById("toast__container");

// Fetch all movies and find the one matching the ID
async function getMovieById() {
  try {
    const movies = await fetchMovies();
    const movie = movies.find((m) => m.id == movieId);

    // Update page if movie is not found
    if (!movie) {
      productInformation.innerHTML = `
      <div class="loading">
        <p class="status">Movie not found</p>
      </div>
      `;
      return;
    }

    // Display movie details
    displayMovie(movie);
  } catch (error) {
    // Handle API or network errors
    productInformation.classList.remove("grid");
    productInformation.innerHTML = `
    <div class="loading">
      <p class="status">Failed to load movie...</p>
    </div>
    `;
    console.error(error);
  }
}

// Create and display movie data into the DOM
function displayMovie(movie) {
  productInformation.innerHTML = "";
  productInformation.classList.add("grid");

  // Create image element
  const productImage = document.createElement("img");
  productImage.src = movie.image.url;

  // Create additional info sections
  const productAdditional = document.createElement("div");
  productAdditional.classList.add("product__additional");
  productAdditional.innerHTML = `
  <div class="additional__box"><span>${movie.genre}</span></div>
  <div class="additional__box"><span>Rating: ${movie.rating}</span></div>
  <div class="additional__box"><span>${movie.released}</span></div>
  `;

  // Title element
  const productTitle = document.createElement("h1");
  productTitle.classList.add("product__title");
  productTitle.textContent = `${movie.title}`;

  // Description element
  const productDescription = document.createElement("p");
  productDescription.classList.add("product__description");
  productDescription.textContent = `${movie.description}`;

  // Price element
  const productPrice = document.createElement("p");
  productPrice.classList.add("product__price");
  productPrice.textContent = `${movie.price},-`;

  // Add to cart CTA
  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add__btn");
  addToCartBtn.textContent = "Add to cart";

  // Keywords / Tags element
  const productKeywords = document.createElement("span");
  productKeywords.classList.add("product__keywords");
  productKeywords.textContent = `Keywords: ${movie.tags.join(", ")}`;

  // Append elements to the DOM
  productInformation.append(productImage, productTexts);
  productTexts.append(
    productTitle,
    productAdditional,
    productDescription,
    productPrice,
    addToCartBtn,
    productKeywords,
  );

  // Add event listener for adding movie to cart
  addToCartBtn.addEventListener("click", () => {
    addToCart(movie);
  });
}

// Display a temporary toast notification
export function toastMessage(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  toastContainer.append(toast);

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hidden");

    // Remove from DOM after animation
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }, 3000);
}

// Render product page
getMovieById();
