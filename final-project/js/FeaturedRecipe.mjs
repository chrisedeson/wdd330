document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.querySelector(".cards");

    const recipes = await fetchRecipes();

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><i class="fa-regular fa-clock"></i> ${recipe.time} Min</p>
        `;
        cardsContainer.appendChild(card);
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let clone = card.cloneNode(true);
        cardsContainer.appendChild(clone);
    });

    // Detect when user scrolls to the end and reset to the start
    cardsContainer.addEventListener("scroll", () => {
        if (cardsContainer.scrollLeft >= cardsContainer.scrollWidth / 2) {
            cardsContainer.scrollLeft = 0; // Reset for smooth infinite scroll
        }
    });
});

