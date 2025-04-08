// File: js/profilePage.js (update the whole file)
import { initCommon } from "./common.js";
import { getFavorites } from "./utils.mjs";
import { renderRecipeCard } from "./renderers.mjs";
import { getUser, logout } from "./auth.mjs"; // Add auth imports

document.addEventListener("DOMContentLoaded", async () => {
  await initCommon();
  displayUserProfile();
  renderFavorites(document.getElementById("favorites-container"));
  
  // Add logout handler
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
      window.location.href = "/pages/login.html";
    });
  }
});

function displayUserProfile() {
  const userAvatar = document.getElementById("user-avatar");
  const userName = document.getElementById("user-name");
  const userRole = document.getElementById("user-role");

  userAvatar.innerHTML = `<i class="fa-solid fa-circle-user"></i>`;
  userName.textContent = getUser(); // Use actual username from auth
  userRole.textContent = "Premium Member"; // Update role text
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
