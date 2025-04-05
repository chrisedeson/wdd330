export async function fetchRecipes() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.meals.map(meal => ({
      name: meal.strMeal,
      // Generate a random stuffs here
      time: Math.floor(Math.random() * 51) + 10,
      link: meal.strSource || '#',
      calories: Math.floor(Math.random() * 401) + 200,
      image: meal.strMealThumb || 'images/fall-back-image.png',
    }));
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
}

export async function fetchPopularRecipes() {
  // Shuffle the array and return the first 5 recipes as popular recipes.
  const recipes = await fetchRecipes();
  for (let i = recipes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [recipes[i], recipes[j]] = [recipes[j], recipes[i]];
  }
  return recipes.slice(0, 5);
}
