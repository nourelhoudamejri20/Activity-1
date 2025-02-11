// Array to store recipes
let recipes = [
  {
      title: "Bruschetta",
      ingredients: ["French baguette", "Tomatoes", "Basil", "Olive oil", "Garlic", "Salt", "Pepper"],
      instructions: "1. Preheat the oven to 350°F (175°C).\n2. Slice the French baguette into 1-inch thick pieces.\n3. Place the bread slices on a baking sheet.\n4. Toast the bread in the oven for about 10 minutes or until golden.\n5. While the bread is toasting, prepare the topping:\n   - Finely chop the tomatoes, basil, and garlic.\n   - Mix them together in a bowl.\n6. Remove the toasted bread from the oven and rub each slice with a peeled garlic clove for extra flavor.\n7. Spoon the tomato-basil mixture onto each slice of bread.\n8. Drizzle with olive oil and season with salt and pepper to taste.",
      image: "bruschetta.jpg" // Path to the image file
  },
  {
      title: "Carbonara",
      ingredients: ["Spaghetti", "Pancetta", "Parmesan cheese", "Eggs", "Garlic", "Black pepper"],
      instructions: "1. Bring a large pot of salted water to a boil and cook the spaghetti according to package instructions.\n2. While the pasta is cooking, heat a pan over medium heat and add the pancetta. Cook until crispy, then add the minced garlic and sauté for another minute.\n3. In a bowl, whisk together the eggs, grated Parmesan cheese, and black pepper until well combined.\n4. Reserve about 1 cup of pasta water and then drain the spaghetti.\n5. Add the cooked spaghetti to the pan with the pancetta and garlic, tossing everything together over low heat.\n6. Remove the pan from the heat and quickly stir in the egg mixture, tossing rapidly to coat the spaghetti evenly. The residual heat from the pasta will cook the eggs gently without scrambling.\n7. If the sauce is too thick, add some of the reserved pasta water a little at a time until you reach your desired consistency.\n8. Serve immediately, garnished with extra Parmesan cheese and freshly ground black pepper.",
      image: "carbonara.jpg" // Path to the image file
  }
];

// Select DOM elements
const form = document.querySelector("#recipeForm");
const recipesContainer = document.getElementById("recipesContainer");

// Function to render recipes
function renderRecipes() {
  recipesContainer.innerHTML = ""; 
  recipes.forEach((recipe, index) => {
      // Create recipe card
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe");

      // Recipe image
      const recipeImage = document.createElement("img");
      recipeImage.src = recipe.image; 
      recipeImage.alt = `${recipe.title} image`;
      recipeImage.classList.add("recipe-img");

      // Recipe title
      const title = document.createElement("h3");
      title.textContent = recipe.title;

      // Ingredients list
      const ingredientsList = document.createElement("ul");
      ingredientsList.classList.add("ingredients-title");
      recipe.ingredients.forEach((ingredient) => {
          const listItem = document.createElement("li");
          listItem.textContent = ingredient;
          ingredientsList.appendChild(listItem);
      });

      // Instructions
      const instructions = document.createElement("p");
      instructions.textContent = recipe.instructions;

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteRecipe(index));

      // Append elements to recipe card
      recipeCard.appendChild(recipeImage);
      recipeCard.appendChild(title);
      recipeCard.appendChild(ingredientsList);
      recipeCard.appendChild(instructions);
      recipeCard.appendChild(deleteButton);

      // Append recipe card to the container
      recipesContainer.appendChild(recipeCard);
  });
}

// Function to add a new recipe
function addRecipe(event) {
  event.preventDefault(); 

  
  const title = form.querySelector("input[name='title']").value.trim();
  const ingredients = form
      .querySelector("textarea[name='ingredients']")
      .value.trim()
      .split(","); 
  const instructions = form
      .querySelector("textarea[name='instructions']")
      .value.trim();
  const imageInput = form.querySelector("input[name='image']");
  const imageFile = imageInput.files[0];

  // Validate form fields
  if (!title || ingredients.length === 0 || !instructions || !imageFile) {
      alert("Please fill out all fields.");
      return;
  }

  // Create recipe object
  const newRecipe = {
      title,
      ingredients: ingredients.map((ingredient) => ingredient.trim()), // Trim whitespace
      instructions,
      image: URL.createObjectURL(imageFile), // Create a URL for the image
  };

  // Add to recipes array
  recipes.push(newRecipe);

  // Clear form
  form.reset();

  // Re-render recipes
  renderRecipes();
}

// Function to delete a recipe
function deleteRecipe(index) {
  // Remove recipe from array
  recipes.splice(index, 1);

  // Re-render recipes
  renderRecipes();
}

// Event listener for form submission
form.addEventListener("submit", addRecipe);

// Initial render
renderRecipes();
