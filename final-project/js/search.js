import { initCommon } from "../js/common.js";
import { renderRecipeCard } from "./renderers.mjs";

// Helper function to map TheMealDB meal object to your recipe object.
function mapMealToRecipe(meal) {
  if (!meal) return null;
  return {
    name: meal.strMeal,
    time: Math.floor(Math.random() * 51) + 10, // Placeholder cooking time
    link: meal.strSource || '#',
    calories: Math.floor(Math.random() * 401) + 200, // Placeholder calories
    image: meal.strMealThumb || 'images/fall-back-image.png',
  };
}

async function fetchRecipes(query = '') {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const meals = data.meals || [];
    // Map and filter out any nulls
    return meals.map(mapMealToRecipe).filter(recipe => recipe !== null);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
}

function renderRecipes(recipes, container) {
  container.innerHTML = '';
  if (recipes.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
    return;
  }
  recipes.forEach(recipe => {
    const card = renderRecipeCard(recipe);
    container.appendChild(card);
  });
}

// Debounce utility function to limit rapid calls.
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

document.addEventListener('DOMContentLoaded', async () => {
  await initCommon();

  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');

  // Create a simple loading indicator.
  const loadingIndicator = document.createElement('p');
  loadingIndicator.textContent = 'Loading...';
  loadingIndicator.classList.add('loading');

  async function loadDefaultRecipes() {
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(loadingIndicator);
    const defaultRecipes = await fetchRecipes('');
    renderRecipes(defaultRecipes, resultsContainer);
  }

  async function handleSearch() {
    const query = searchInput.value.trim();
    resultsContainer.innerHTML = '';
    if (!query) {
      loadDefaultRecipes();
      return;
    }
    resultsContainer.appendChild(loadingIndicator);
    const recipes = await fetchRecipes(query);
    renderRecipes(recipes, resultsContainer);
  }

  // Load default recipes on initial page load.
  loadDefaultRecipes();

  // Attach the debounced search handler to the input event.
  const debouncedSearch = debounce(handleSearch, 300);
  searchInput.addEventListener('input', debouncedSearch);
});

// Create a styled loading indicator with a spinner
function createLoadingIndicator() {
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loading-indicator');
  
    // Create spinner element
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
  
    loadingContainer.appendChild(spinner);
    return loadingContainer;
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    await initCommon();
  
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    
    // Create our loading indicator element once.
    const loadingIndicator = createLoadingIndicator();
  
    async function loadDefaultRecipes() {
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(loadingIndicator);
      const defaultRecipes = await fetchRecipes('');
      renderRecipes(defaultRecipes, resultsContainer);
    }
  
    async function handleSearch() {
      const query = searchInput.value.trim();
      resultsContainer.innerHTML = '';
      if (!query) {
        loadDefaultRecipes();
        return;
      }
      resultsContainer.appendChild(loadingIndicator);
      const recipes = await fetchRecipes(query);
      renderRecipes(recipes, resultsContainer);
    }
  
    loadDefaultRecipes();
  
    const debouncedSearch = debounce(handleSearch, 300);
    searchInput.addEventListener('input', debouncedSearch);
  });
  