document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.querySelector(".cards");

    // Simulating an API call to fetch recipes
    const recipes = await fetchRecipes();

    // Populate the cards dynamically
    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><i class="fa-regular fa-clock"></i> ${recipe.time} Min</p>
        `;
        cardsContainer.appendChild(card);
    });

    // Clone first few cards for seamless scrolling
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

