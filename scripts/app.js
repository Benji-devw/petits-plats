import recipes from "../data/recipes.js"
import displayRecipes from "./utils/displayRecipes.js";


/**
 * @param {string} termValue
 * @param {array} recipes
 * @returns {array} - Recipes filtered
 **********************************/
function filterRecipesBySearch(recipes, termValue) {
    return recipes.filter(recipe => {
        if (recipe.name.toLowerCase().includes(termValue) ||
            recipe.description.toLowerCase().includes(termValue)) {
            return true;
        } else {
            const findIngredient = recipe.ingredients.find(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(termValue);
            });
            return !!findIngredient;
        }
    })
}

function createLiElement(item) {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    return liElement
}

function displayIngredients(recipes) {
    const ingredientsFilter = document.querySelector('.ingredients-filter');
    ingredientsFilter.innerHTML = '';
    recipes.forEach(recipe => {
        const ingredientLower = recipe.ingredients.map(arr => arr.ingredient.toLowerCase());
        const itemElement = createLiElement(ingredientLower)
        ingredientsFilter.appendChild(itemElement)
    })
}

// Create displayUtensils
// Create displayAppliances
// Create displayTag
// Create AddEvent

/**
 * @description Main function
 * @returns All Cards for gallery
 **********************************/
function App() {
    const data = recipes
    const searchBar = document.querySelector('.search-bar .search');
    // const tagsContainer = document.querySelector('.tags');

    let newData= [...data]

    displayRecipes(data)
    displayIngredients(data)
    // displayUtensils(data)
    // displayAppliances(data)

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            newData = filterRecipesBySearch(data, event.target.value.toLowerCase());
        } else {
            newData= [...data]
        }
        displayRecipes(newData)
        displayIngredients(newData)
        // displayUtensils(newData)
        // displayAppliances(newData)
    })

    // searchBarIngredients.addEventListener('input', (event) => {})
    // displayIngredients(newData, event.target.value.toLowerCase())
    // tagsContainer.innerHTML = '';
}

App();
