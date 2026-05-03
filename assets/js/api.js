"use strict";

// API endpoint for fetching movies
const endpoint = "https://v2.api.noroff.dev/square-eyes";

// Fetching all movies from the API
export async function fetchMovies() {
  try {
    const response = await fetch(endpoint);

    // Handle unsuccessful HTTP Responses
    if (!response.ok) {
      throw new Error(`Failed to load movies... Status: ${response.status}`);
    }

    // Parse JSON response
    const result = await response.json();

    // Return data
    return result.data;
  } catch (error) {
    // Log errors to the console for debugging
    console.error("Failed to fetch movies:", error);
    throw error;
  }
}
