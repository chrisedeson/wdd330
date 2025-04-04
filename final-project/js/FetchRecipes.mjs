// File: js/FetchRecipe.mjs
export async function fetchRecipes() {
    return [
        { name: "Asian white noodle with extra seafood", time: 25, link: "recipes/asian-noodle.html", calories: 10 },
        { name: "Chicken Alfredo", time: 30, link: "recipes/chicken-alfredo.html", calories: 20 },
        { name: "Beef Stir Fry", time: 20, link: "recipes/beef-stirfry.html", calories: 15 },
        { name: "Vegan Tacos", time: 15, link: "recipes/vegan-tacos.html", calories: 12 },
        { name: "Sushi Rolls", time: 40, link: "recipes/sushi-rolls.html", calories: 25 },
        { name: "Pancakes", time: 10, link: "recipes/pancakes.html", calories: 20 },
        { name: "Tomato Basil Pasta", time: 18, link: "recipes/tomato-pasta.html", calories: 18 },
        { name: "Grilled Cheese Sandwich", time: 8, link: "recipes/grilled-cheese.html", calories: 15 },
        { name: "Caesar Salad", time: 12, link: "recipes/caesar-salad.html", calories: 10 },
        { name: "Chocolate Cake", time: 50, link: "recipes/chocolate-cake.html", calories: 35 }      
    ];
  }
  
  export async function fetchPopularRecipes() {
    const recipes = await fetchRecipes();
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = recipes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [recipes[i], recipes[j]] = [recipes[j], recipes[i]];
    }
    // Return exactly 4 popular recipes
    return recipes.slice(0, 5);
  }
  