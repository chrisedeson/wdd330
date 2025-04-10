export class RecipeDialog {
  constructor() {
    this.API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
    this.initDialog();
    this.injectStyles();
  }

  initDialog() {
    this.dialogOverlay = document.createElement("div");
    this.dialogOverlay.className = "recipe-dialog-overlay";

    this.dialogContent = document.createElement("div");
    this.dialogContent.className = "recipe-dialog";
    this.dialogContent.innerHTML = `
      <div class="dialog-scroll-container">
        <div class="image-container">
          <div class="image-loader"></div>
          <img class="recipe-image" src="" alt="Recipe image">
          <button class="recipe-close-btn">&times;</button>
        </div>
        <h3 class="recipe-title"></h3>
        <div class="tabs">
          <button class="tab-button active" data-tab="ingredients">Ingredients</button>
          <button class="tab-button" data-tab="instructions">Instructions</button>
        </div>
        <div class="tab-content">
          <div class="recipe-section ingredients active">
            <ul class="recipe-ingredients"></ul>
          </div>
          <div class="recipe-section instructions">
            <div class="instructions-scroll">
              <p class="recipe-instructions"></p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.dialogOverlay.appendChild(this.dialogContent);
    document.body.appendChild(this.dialogOverlay);
    this.setupEventListeners();
  }

  injectStyles() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../styles/RecipeDialog.css";
    document.head.appendChild(link);
  }

  setupEventListeners() {
    this.dialogOverlay.addEventListener("click", (e) => {
      if (
        e.target === this.dialogOverlay ||
        e.target.closest(".recipe-close-btn")
      ) {
        this.hide();
      }
    });

    const tabs = this.dialogContent.querySelectorAll(".tab-button");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabName = tab.dataset.tab;
        this.switchTab(tabName);
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  }

  switchTab(tabName) {
    const contents = this.dialogContent.querySelectorAll(".recipe-section");
    contents.forEach((content) => {
      content.classList.remove("active");
      if (content.classList.contains(tabName)) {
        content.classList.add("active");
        if (tabName === "ingredients") {
          this.resetIngredientsAnimation();
        } else {
          this.resetInstructionsAnimation();
        }
      }
    });
  }

  resetIngredientsAnimation() {
    const items = this.dialogContent.querySelectorAll(".ingredient-item");
    items.forEach((item) => {
      item.style.animation = "none";
      void item.offsetWidth; // Trigger reflow
      item.style.animation = "ingredientAppear 0.3s ease-out forwards";
    });
  }

  resetInstructionsAnimation() {
    const instructions = this.dialogContent.querySelector(
      ".instructions-scroll"
    );
    instructions.style.animation = "none";
    void instructions.offsetWidth;
    instructions.style.animation = "contentFade 0.5s ease-out forwards";
  }

  show(recipe) {
    this.populateDialog(recipe);
    this.dialogOverlay.style.display = "flex";
    setTimeout(() => {
      this.dialogOverlay.classList.add("active");
      this.dialogContent.classList.add("active");
    }, 10);
    document.body.style.overflow = "hidden";
  }

  hide() {
    this.dialogContent.classList.remove("active");
    this.dialogOverlay.classList.remove("active");
    setTimeout(() => {
      this.dialogOverlay.style.display = "none";
      document.body.style.overflow = "";
    }, 400);
  }

  populateDialog(meal) {
    const ingredients = this.extractIngredients(meal);

    this.dialogContent.querySelector(".recipe-title").textContent =
      meal.strMeal;
    const img = this.dialogContent.querySelector(".recipe-image");
    img.src = meal.strMealThumb || "images/fall-back-image.png";

    img.onload = () => {
      img.style.opacity = "1";
      this.dialogContent.querySelector(".image-loader").remove();
    };

    const ingredientsList = this.dialogContent.querySelector(
      ".recipe-ingredients"
    );
    ingredientsList.innerHTML = ingredients
      .map(
        (ing) => `
      <li class="ingredient-item">
        <span>${ing.ingredient}</span>
        <span class="ingredient-measure">${ing.measure}</span>
      </li>
    `
      )
      .join("");

    const instructions = this.dialogContent.querySelector(
      ".recipe-instructions"
    );
    instructions.textContent = meal.strInstructions.replace(
      /(\r\n|\n|\r)/gm,
      "\n"
    );

    setTimeout(() => {
      this.animateIngredients();
      this.animateInstructions();
    }, 300);
  }

  animateIngredients() {
    const items = this.dialogContent.querySelectorAll(".ingredient-item");
    items.forEach((item, index) => {
      item.style.animation = `ingredientAppear 0.3s ease-out ${
        index * 0.05
      }s forwards`;
    });
  }

  animateInstructions() {
    const instructions = this.dialogContent.querySelector(
      ".instructions-scroll"
    );
    instructions.style.animation = "contentFade 0.5s ease-out forwards";
  }

  extractIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: (measure || "").trim(),
        });
      }
    }
    return ingredients;
  }

  async fetchRandomRecipe() {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) throw new Error("Failed to fetch recipe");
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error("Recipe fetch error:", error);
      throw error;
    }
  }
}
