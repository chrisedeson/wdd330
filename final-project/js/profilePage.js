// File: js/profilePage.mjs

import { initCommon } from "./common.js";
import { getFavorites } from "./utils.mjs";
import { renderRecipeCard } from "./renderers.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize any common features (like nav, header, etc.)
  await initCommon();

  // Display user info
  displayUserProfile();

  // Display the user's favorites
  const favoritesContainer = document.getElementById("favorites-container");
  renderFavorites(favoritesContainer);
});

function displayUserProfile() {
  const userAvatar = document.getElementById("user-avatar");
  const userName = document.getElementById("user-name");
  const userRole = document.getElementById("user-role");

  // In a real app, you might fetch user info from an API or localStorage
  // For now, we’ll just set some placeholder data
  userAvatar.innerHTML = `<i class="fa-solid fa-circle-user"></i>`;
  userName.textContent = "Alena Sabyan";
  userRole.textContent = "Recipe Developer";
}

function renderFavorites(container) {
  container.innerHTML = ""; // Clear out any existing content
  const favorites = getFavorites();
  if (favorites.length === 0) {
    container.innerHTML = `<p>No favorites yet. Start adding some!</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  
  favorites.forEach(recipe => {
    const card = renderRecipeCard({
      ...recipe,
      // Ensure required properties exist
      image: recipe.image || 'images/fall-back-image.png',
      time: recipe.time || 'N/A',
      calories: recipe.calories || 'N/A'
    });
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}
