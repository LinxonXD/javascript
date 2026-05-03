"use strict";

// Import functions for loading cart and removing items
import { loadCart, removeAllFromCart } from "./cart.js";

// Select DOM elements
const priceSpan = document.querySelector(".price");
const priceTotal = document.querySelector(".total");
const priceDiscount = document.querySelector(".discount");
const form = document.getElementById("checkout");

// Calculate and display order summary based on cart content. Full price - Discounted
function displaySummary() {
  const cart = loadCart();

  // Redirect user if cart is empty
  if (cart.length === 0) {
    window.location.href = "../../";
  }

  let subtotalPrice = 0;
  let totalPrice = 0;
  let totalDiscount = 0;

  // Loop through cart items and calculate the total
  cart.forEach((movie) => {
    // Add original price to subtotal
    subtotalPrice += movie.price;

    priceSpan.textContent = `${subtotalPrice.toFixed(2)},-`;

    // Calculate total discount if item is on sale
    if (movie.price !== movie.discountedPrice && movie.onSale) {
      totalDiscount += movie.price - movie.discountedPrice;
    }

    priceDiscount.textContent = `${totalDiscount.toFixed(2)},-`;

    // Add discounted or original price to total
    totalPrice += movie.onSale
      ? Number(movie.discountedPrice)
      : Number(movie.price);

    priceTotal.textContent = `${totalPrice.toFixed(2)},-`;
  });
}

// Handle checkout form submission
function submitForm() {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Basic validation that checks if all required fields are filled
    if (
      firstNameInput.value === "" ||
      lastNameInput.value === "" ||
      emailInput.value === ""
    ) {
      alert("Please fill in all required fields..");
      return;
    }

    // Clear cart after successful checkout
    removeAllFromCart();

    // Redirect to confirmation page
    location.href = "../confirmation/";
  });
}

// Init summary and form handling
displaySummary();
submitForm();
