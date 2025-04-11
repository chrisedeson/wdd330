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
    link.href = "/styles/recipe-dialog.css";
    document.head.appendChild(link);
  }

  setupEventListeners() {
    // Close on overlay click or close‑button click
    this.dialogOverlay.addEventListener("click", (e) => {
      if (
        e.target === this.dialogOverlay ||
        e.target.closest(".recipe-close-btn")
      ) {
        this.hide();
      }
    });

    // Tab switching
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
    const sections = this.dialogContent.querySelectorAll(".recipe-section");
    sections.forEach((sec) => {
      sec.classList.toggle("active", sec.classList.contains(tabName));
      if (sec.classList.contains(tabName)) {
        if (tabName === "ingredients") this.resetIngredientsAnimation();
        else this.resetInstructionsAnimation();
      }
    });
  }

  resetIngredientsAnimation() {
    const items = this.dialogContent.querySelectorAll(".ingredient-item");
    items.forEach((item) => {
      item.style.animation = "none";
      void item.offsetWidth;
      item.style.animation = "ingredientAppear 0.3s ease-out forwards";
    });
  }

  resetInstructionsAnimation() {
    const inst = this.dialogContent.querySelector(".instructions-scroll");
    if (inst) {
      inst.style.animation = "none";
      void inst.offsetWidth;
      inst.style.animation = "contentFade 0.5s ease-out forwards";
    }
  }

  show(recipe) {
    this.populateDialog(recipe);
    this.dialogOverlay.style.display = "flex";
    // allow CSS transitions to kick in
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

    // Title
    this.dialogContent.querySelector(".recipe-title").textContent =
      meal.strMeal;

    // Image + loader
    const img = this.dialogContent.querySelector(".recipe-image");
    img.style.opacity = "0";
    img.src = meal.strMealThumb || "images/fall-back-image.png";
    img.onload = () => {
      img.style.opacity = "1";
      const loader = this.dialogContent.querySelector(".image-loader");
      if (loader) loader.remove();
    };

    // Ingredients list
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

    // Instructions
    const instructionsElem = this.dialogContent.querySelector(
      ".recipe-instructions"
    );
    instructionsElem.textContent = meal.strInstructions.replace(
      /(\r\n|\n|\r)/gm,
      "\n"
    );

    // Animate both sections after a short delay
    setTimeout(() => {
      this.animateIngredients();
      this.animateInstructions();
    }, 300);
  }

  animateIngredients() {
    const items = this.dialogContent.querySelectorAll(".ingredient-item");
    items.forEach((item, idx) => {
      item.style.animation = `ingredientAppear 0.3s ease-out ${
        idx * 0.05
      }s forwards`;
    });
  }

  animateInstructions() {
    const inst = this.dialogContent.querySelector(".instructions-scroll");
    if (inst) {
      inst.style.animation = "contentFade 0.5s ease-out forwards";
    }
  }

  extractIngredients(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        list.push({
          ingredient: ingredient.trim(),
          measure: (measure || "").trim(),
        });
      }
    }
    return list;
  }

  async fetchRandomRecipe() {
    const res = await fetch(this.API_URL);
    if (!res.ok) throw new Error("Failed to fetch recipe");
    const data = await res.json();
    return data.meals[0];
  }
}
