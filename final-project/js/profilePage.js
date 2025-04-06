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
  container.innerHTML = "";
  const favorites = getFavorites();
  
  if (favorites.length === 0) {
    container.innerHTML = `
      <div class="empty-state-container">
        <div class="empty-state-message">
          <h3 class="empty-state-title">Your Recipe Collection is Empty</h3>
  
          <a href="../index.html" class="cta-button">
            <i class="fa-solid fa-utensils"></i>
            Discover Recipes
          </a>
        </div>
      </div>
    `;
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
