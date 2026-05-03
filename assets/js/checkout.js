"use strict";

// Import functions for loading cart, removing items and showing toast notification
import { loadCart, removeFromCart } from "./cart.js";
import { toastMessage } from "./product.js";

// Select DOM elements
const cartOverview = document.getElementById("cart__container");
const cartPrice = document.getElementById("cart__price");
const totalCartPrice = document.getElementById("total__cart");
const cartBottom = document.querySelector(".cart__bottom");
const totalCartText = document.getElementById("total__text");

// Render all items in the cart
function displayCart() {
  const cart = loadCart();

  // Clear price section if cart is empty to avoid bugs
  if (cart.length === 0) {
    cartPrice.innerHTML = "";
  }

  // Reset cart display
  cartOverview.innerHTML = "";

  let totalPrice = 0;

  // Loop through cart items and create box for each of them
  cart.forEach((movie, index) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie__card");

    const movieInformation = document.createElement("div");
    movieInformation.classList.add("movie__information");

    const movieTexts = document.createElement("div");
    movieTexts.classList.add("movie__texts");

    // Create image element
    const movieImage = document.createElement("img");
    movieImage.classList.add("cart__image");
    movieImage.src = `${movie.image.url}`;
    movieImage.alt = `${movie.image.alt}`;

    // Title element
    const movieTitle = document.createElement("h1");
    movieTitle.textContent = `${movie.title}`;

    // Price element
    const moviePrices = document.createElement("div");
    moviePrices.classList.add("price__container");

    // Original price element
    const moviePrice = document.createElement("div");
    moviePrice.textContent = `${movie.price},-`;

    // Remove from cart CTA
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove__btn");
    removeButton.textContent = "Remove movie";

    movieTexts.append(movieTitle);

    // Handle discount price display
    if (movie.price !== movie.discountedPrice && movie.onSale) {
      const discountedPrice = document.createElement("div");
      discountedPrice.textContent = `${movie.discountedPrice},-`;

      // Style original price with line-through
      moviePrice.classList.add("old__price");

      moviePrices.append(discountedPrice);
    }

    // Append elements to the DOM
    cartOverview.append(movieCard);
    movieInformation.append(movieImage, movieTexts);
    movieTexts.append(movieTitle, moviePrices);
    moviePrices.append(moviePrice);
    movieCard.append(movieInformation, removeButton);

    // Display total movies in cart
    const totalItems = cart.length;
    totalCartText.textContent = `Total (${totalItems} products):`;

    // Update total cart price (uses discounted price if on sale)
    totalPrice += movie.onSale
      ? Number(movie.discountedPrice)
      : Number(movie.price);
    totalCartPrice.textContent = `${totalPrice.toFixed(2)},-`;

    // Add event listener for removing items from cart
    removeButton.addEventListener("click", () => {
      removeFromCart(index);
      displayCart();
    });
  });

  // Show error if shopping cart is empty
  if (cart.length === 0) {
    cartOverview.innerHTML = `
    <div class="loading">
      <p class="status">Your shopping cart is empty.</p>
    </div>
    `;

    cartPrice.innerHTML = "";
    cartBottom.classList.add("hidden");

    totalPrice = 0;
    totalCartPrice.textContent = `${totalPrice},-`;
  } else {
    const checkoutBtn = document.createElement("button");
    checkoutBtn.classList.add("checkout__btn");
  }
}

// Display cart items
displayCart();
