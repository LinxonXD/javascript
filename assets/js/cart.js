"use strict";

// Import function for displaying toast notification
import { toastMessage } from "./product.js";

let cart = [];

// Adds a movie to the cart
export function addToCart(movie) {
  // Ensuring the cart is always updated
  loadCart();

  // Adds new movie to the cart
  cart.push(movie);

  // Save updated cart
  saveCart();

  // Show toast message to user that the movie has been added
  toastMessage(`Successfully added ${movie.title} to your cart.`);
}

// Saves cart to localStorage
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Loads cart from localStorage
export function loadCart() {
  const savedCart = localStorage.getItem("shoppingCart");

  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  return cart;
}

// Removes a movie from cart by index
export function removeFromCart(index) {
  const removedMovie = cart[index];

  // Remove from array
  cart.splice(index, 1);

  // Save updated cart
  saveCart();

  // Show toast message to user that the movie has been removed
  toastMessage(`Successfully removed ${removedMovie.title} from your cart.`);
}

// Clears the entire cart
export function removeAllFromCart() {
  cart = [];
  saveCart();
}
