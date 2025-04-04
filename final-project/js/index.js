import { displayGreeting } from "./Greeting.mjs"
import { createScrollableCards } from "./DynamicCardList.mjs";
import { renderFeaturedCard, renderRecipeCard } from "./renderers.mjs";
import { fetchRecipes, fetchPopularRecipes } from "./fetchRecipes.mjs";

displayGreeting();

document.addEventListener("DOMContentLoaded", async () => {
    // For the featured recipes section (e.g., infinite scroll)
    await createScrollableCards({
      selector: '.cards',
      fetcher: fetchRecipes,
      renderCard: renderFeaturedCard,
      infiniteScroll: true,
    });
  
    // For another section with extra features (like a favourite button)
    await createScrollableCards({
      selector: '.recipe-cards',
      fetcher: fetchPopularRecipes, // Or a different fetch function if needed
      renderCard: renderRecipeCard,
      infiniteScroll: false,
    });
  });


  
// Navigation Arrows
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');
const cardsContainer = document.querySelector('.cards');

leftBtn.addEventListener('click', () => {
  cardsContainer.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

rightBtn.addEventListener('click', () => {
  cardsContainer.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
});


// Navigation Bar

let lastScrollY = window.scrollY;
const bottomNav = document.getElementById('bottomNav');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

   // Ignore very small scroll differences (e.g., less than 5px)
   if (Math.abs(currentScrollY - lastScrollY) < 5) {
    return;
  }

  // If scrolling down
  if (currentScrollY > lastScrollY) {
    // Hide the nav
    bottomNav.classList.remove('show');
  } else {
    // Show the nav
    bottomNav.classList.add('show');
  }


  lastScrollY = currentScrollY;
});
