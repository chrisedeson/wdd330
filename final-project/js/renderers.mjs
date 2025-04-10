import { addFavorite, removeFavorite, isFavorite } from "./utils.mjs";

export function renderFeaturedCard(recipe) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Use recipe.image or fallback image if missing
  const imageUrl = recipe.image || "images/fall-back-image.png";
  card.style.backgroundImage = `url(${imageUrl})`;

  card.innerHTML = `
    <h3>${recipe.name}</h3>
    <p><i class="fa-regular fa-clock"></i> ${recipe.time} Min</p>
  `;

  return card;
}

export function renderRecipeCard(recipe) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");
  card.innerHTML = `
    <div class="img-container">
      <img src="${recipe.image}" alt="${recipe.name} image" width="300px">
    </div>
    <h3><a href="${recipe.link}" class="recipe-link" target="_blank" rel="noopener noreferrer">${recipe.name}</a></h3>
    <div class="recipe-details">
      <p>
        <i class="fa-regular fa-clock"></i> ${recipe.time} Min
      </p>
      <p>
        <i class="fa-solid fa-fire-flame-curved"></i> ${recipe.calories} Kcal
      </p>
      
    </div>
    <button class="favourite-btn" aria-label="Favourite">♥</button>
  `;
  const favBtn = card.querySelector(".favourite-btn");
  // Set initial state
  if (isFavorite(recipe.name)) {
    favBtn.classList.add("active");
  }

  // Add click handler
  favBtn.addEventListener("click", () => {
    favBtn.classList.toggle("active");

    if (favBtn.classList.contains("active")) {
      addFavorite(recipe);
    } else {
      removeFavorite(recipe.name);
    }
  });

  return card;
}
