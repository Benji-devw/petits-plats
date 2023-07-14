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
    const ingredientsContainer = document.querySelector('.ingredients-container');
    ingredientsContainer.innerHTML = '';

    const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
    uniqueIngredients.forEach(ingredient => {
        const itemElement = createLiElement(ingredient);
        ingredientsContainer.appendChild(itemElement);
    });
}

function displayAppliances(recipes) {
    const appliancesContainer = document.querySelector('.appliances-container');
    appliancesContainer.innerHTML = '';

    const uniqueUtensils = [...new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))];
    uniqueUtensils.forEach(utensil => {
        const itemElement = createLiElement(utensil);
        appliancesContainer.appendChild(itemElement);
    });
}

function displayUtensils(recipes) {
    const utensilsContainer = document.querySelector('.utensils-container');
    utensilsContainer.innerHTML = '';

    const uniqueUtensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase())))];
    uniqueUtensils.forEach(utensil => {
        const itemElement = createLiElement(utensil);
        utensilsContainer.appendChild(itemElement);
    });
}



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
    displayAppliances(data)
    displayUtensils(data)

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            newData = filterRecipesBySearch(data, event.target.value.toLowerCase());
        } else {
            newData = [...data]
        }
        displayRecipes(newData)
        displayIngredients(newData)
        displayAppliances(newData)
        displayUtensils(newData)
    })

    // searchBarIngredients.addEventListener('input', (event) => {})
    // displayIngredients(newData, event.target.value.toLowerCase())
    // tagsContainer.innerHTML = '';
}

App();
