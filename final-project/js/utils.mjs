// File: js/localStorageUtils.mjs

const FAVORITES_KEY = "myFavorites";

/**
 * Retrieves the favorites array from localStorage.
 * @returns {Array} Array of recipe objects
 */
export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch (error) {
    console.error("Error reading favorites:", error);
    return [];
  }
}
/**
 * Checks if a recipe is already favorited (by name, or ID if you prefer).
 * @param {string} recipeName - Unique identifier (or recipe.id if you have it)
 * @returns {boolean} True if favorited, false otherwise
 */
export function isFavorite(recipeName) {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.name === recipeName);
}

/**
 * Adds a recipe object to the favorites list in localStorage.
 * @param {Object} recipe - The recipe object to add
 */
// Update addFavorite to handle full recipe objects
export function addFavorite(recipe) {
  if (!recipe?.name) {
    console.error("Invalid recipe object:", recipe);
    return;
  }

  const favorites = getFavorites();
  if (!favorites.some((fav) => fav.name === recipe.name)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, recipe]));
  }
}
/**
 * Removes a recipe from the favorites list in localStorage.
 * @param {string} recipeName - Unique identifier (or recipe.id)
 */
export function removeFavorite(recipeName) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => fav.name !== recipeName);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function updateActiveNav() {
  // Get current path and normalize
  const currentPath = window.location.pathname
    .replace(/\/$/, "") // Remove trailing slash
    .replace(/\.html$/, ""); // Remove .html extension

  document.querySelectorAll("#bottomNav li").forEach((item) => {
    const link = item.querySelector("a");
    const href = link.pathname
      .replace(/\/$/, "") // Remove trailing slash
      .replace(/\.html$/, ""); // Remove .html extension

    // Special case for home page
    const isHome =
      currentPath === "/index" || currentPath === "" || currentPath === "/";
    const isHomeLink = href === "/index" || href === "" || href === "/";

    if ((isHome && isHomeLink) || (!isHome && href === currentPath)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
