import { loadHeaderFooter } from "./HeaderFooter.mjs";
import { displayGreeting } from "./Greeting.mjs";
import { createScrollableCards } from "./DynamicCardList.mjs";
import { renderFeaturedCard, renderRecipeCard } from "./renderers.mjs";
import { fetchRecipes, fetchPopularRecipes } from "./fetchRecipes.mjs";
import { updateActiveNav } from "./utils.mjs"; // Assuming this is your function

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", async () => {
  await createScrollableCards({
    selector: '.cards',
    fetcher: fetchRecipes,
    renderCard: renderFeaturedCard,
    infiniteScroll: true,
  });

  await createScrollableCards({
    selector: '.recipe-cards',
    fetcher: fetchPopularRecipes,
    renderCard: renderRecipeCard,
    infiniteScroll: false,
  });

  displayGreeting();

  // ✅ Add this here, after header/footer is loaded
  updateActiveNav();

  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');
  const cardsContainer = document.querySelector('.cards');

  if (leftBtn && rightBtn && cardsContainer) {
    leftBtn.addEventListener('click', () => {
      cardsContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      cardsContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
  } else {
    console.debug('Navigation arrows or cards container not found.');
  }
});
