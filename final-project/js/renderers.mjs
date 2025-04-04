// File: js/renderers.mjs
export function renderFeaturedCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h3>${recipe.name}</h3>
    <p><i class="fa-regular fa-clock"></i> ${recipe.time} Min</p>
  `;
  return card;
}

export function renderRecipeCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('recipe-card');
  card.innerHTML = `
    <div class="img-container">
      <img src="../images/fall-back-image.png" alt="${recipe.name} image" width="300px">
    </div>
    <h3><a href="${recipe.link}" class="recipe-link">${recipe.name}</a></h3>
    <div class="recipe-details">
      <p>
        <i class="fa-regular fa-clock"></i> ${recipe.time} Min
      </p>
      <p>
        <i class="fa-solid fa-fire-flame-curved"></i>
        ${recipe.calories} Kcal
      </p>
    </div>
    <button class="favourite-btn" aria-label="Favourite">♥</button>
  `;
  const favBtn = card.querySelector('.favourite-btn');
  favBtn.addEventListener('click', () => {
    favBtn.classList.toggle('active');
  });
  return card;
}
