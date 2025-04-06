export class RecipeDialog {
    constructor() {
      this.API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
      this.initDialog();
      this.injectStyles();
    }
  
    initDialog() {
      this.dialogOverlay = document.createElement('div');
      this.dialogOverlay.className = 'recipe-dialog-overlay';
  
      this.dialogContent = document.createElement('div');
      this.dialogContent.className = 'recipe-dialog';
      this.dialogContent.innerHTML = `
        <div class="recipe-dialog-header">
          <h2 class="recipe-title"></h2>
          <button class="recipe-close-btn" aria-label="Close">&times;</button>
        </div>
        <img class="recipe-image" src="" alt="Recipe image">
        <div class="recipe-content">
          <div class="recipe-section">
            <h3>Ingredients</h3>
            <ul class="recipe-ingredients"></ul>
          </div>
          <div class="recipe-section">
            <h3>Instructions</h3>
            <p class="recipe-instructions"></p>
          </div>
        </div>
      `;
  
      this.dialogOverlay.appendChild(this.dialogContent);
      document.body.appendChild(this.dialogOverlay);
      this.setupEventListeners();
    }
  
    injectStyles() {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '../styles/RecipeDialog.css';
      document.head.appendChild(link);
    }
  
    setupEventListeners() {
      this.dialogOverlay.addEventListener('click', (e) => {
        if (e.target === this.dialogOverlay || e.target.closest('.recipe-close-btn')) {
          this.hide();
        }
      });
    }
  
    show(recipe) {
      this.populateDialog(recipe);
      this.dialogOverlay.style.display = 'flex';
      setTimeout(() => this.dialogContent.classList.add('active'), 10);
      document.body.style.overflow = 'hidden';
    }
  
    hide() {
      this.dialogContent.classList.remove('active');
      setTimeout(() => {
        this.dialogOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  
    populateDialog(meal) {
      const ingredients = this.extractIngredients(meal);
      
      this.dialogContent.querySelector('.recipe-title').textContent = meal.strMeal;
      this.dialogContent.querySelector('.recipe-image').src = meal.strMealThumb || 'images/fall-back-image.png';
      
      const ingredientsList = this.dialogContent.querySelector('.recipe-ingredients');
      ingredientsList.innerHTML = ingredients.map(ing => `
        <li>
          <span>${ing.ingredient}</span>
          <span class="ingredient-measure">${ing.measure}</span>
        </li>
      `).join('');
      
      this.dialogContent.querySelector('.recipe-instructions').textContent = 
        meal.strInstructions.replace(/(\r\n|\n|\r)/gm, "\n");
    }
  
    extractIngredients(meal) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push({
            ingredient: ingredient.trim(),
            measure: (measure || '').trim()
          });
        }
      }
      return ingredients;
    }
  
    async fetchRandomRecipe() {
      try {
        const response = await fetch(this.API_URL);
        if (!response.ok) throw new Error('Failed to fetch recipe');
        const data = await response.json();
        return data.meals[0];
      } catch (error) {
        console.error('Recipe fetch error:', error);
        throw error;
      }
    }
  }