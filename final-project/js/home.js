// home.js

import { initCommon } from "./common.js";
import { displayGreeting } from "./Greeting.mjs";
import { createScrollableCards } from "./DynamicCardList.mjs";
import { renderFeaturedCard, renderRecipeCard } from "./renderers.mjs";
import { fetchRecipes, fetchPopularRecipes } from "./fetchRecipes.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Load header/footer and set up nav
  await initCommon();

  // 2) Now that the header is in the DOM, show the greeting
  displayGreeting();

  // 3) Populate the featured (infinite scroll) section
  await createScrollableCards({
    selector: '.cards',
    fetcher: fetchRecipes,
    renderCard: renderFeaturedCard,
    infiniteScroll: true,
  });

  // 4) Populate the popular recipes section (no infinite scroll)
  await createScrollableCards({
    selector: '.recipe-cards',
    fetcher: fetchPopularRecipes,
    renderCard: renderRecipeCard,
    infiniteScroll: false,
  });

  // 5) Wire up the left/right scroll buttons
  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');
  const cardsContainer = document.querySelector('.cards');

  if (leftBtn && rightBtn && cardsContainer) {
    leftBtn.addEventListener('click', () =>
      cardsContainer.scrollBy({ left: -300, behavior: 'smooth' })
    );
    rightBtn.addEventListener('click', () =>
      cardsContainer.scrollBy({ left: 300, behavior: 'smooth' })
    );
  } else {
    console.debug('Navigation arrows or cards container not found.');
  }
});
