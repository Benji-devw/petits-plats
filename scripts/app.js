import recipes from "../data/recipes.js"
import displayRecipes from "./utils/displayRecipes.js";
import { displayIngredients, displayAppliances, displayUtensils } from "./utils/tags_Display.js";
import { createLiElement } from "./utils/tags_create.js";




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





/**
 * @description Filter ingredients by search term
 * @param {array} recipes - Recipes
 * @param {string} searchTerm - Search term
 * @returns Filtered ingredients
 */
function filterIngredientsBySearch(recipes, searchTerm) {
    const ingredientsContainer = document.querySelector('.ingredients-container');
    // clear ingredients container
    ingredientsContainer.innerHTML = '';

    // get all ingredients from recipes and display unique ingredients
    const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
    // filter ingredients by search term
    const filteredIngredients = uniqueIngredients.filter(ingredient => ingredient.includes(searchTerm));
    // display list of ingredients
    filteredIngredients.forEach(ingredient => {
        const itemElement = createLiElement(ingredient, "ingredient");
        ingredientsContainer.appendChild(itemElement);
    });
}


function filterRecipesByTags(recipes, termValue) {
    return recipes.filter(recipe => {
         const findIngredient = recipe.ingredients.find(ingredient => {
             return ingredient.ingredient.toLowerCase().includes(termValue);
         });
         return !!findIngredient;
    });
}


/**
 * @description Main function
 * @returns All Cards for gallery
 **********************************/
function App() {
    const data = recipes
    const searchBar = document.querySelector('.search-bar .search');

    const searchBarIngredients = document.querySelector('.search-ingredients')
    const ingredientLiElement = document.querySelectorAll('.ingredients-container li')

    const tagsWrapper = document.querySelector('.tags');
    // const tagsElement = document.querySelectorAll('.tag-element')

    let newData = [...data]
    let newTag = []

    displayRecipes(data)
    displayIngredients(data)
    displayAppliances(data)
    displayUtensils(data)

    ingredientLiElement.forEach(element => {
        element.addEventListener('click', () => {
            // test(recipes, element.textContent)
            newTag.push(element.textContent)
            newData = filterRecipesByTags(newData, newTag)
            displayRecipes(newData)
            displayIngredients(newData)
            displayAppliances(newData)
            displayUtensils(newData)
            console.log(newTag);
        })
    })

    searchBarIngredients.addEventListener('input', (event) => {
        filterIngredientsBySearch(newData, event.target.value.toLowerCase())
        // if click on tag
        newData = filterRecipesByTags(newData, event.target.value.toLowerCase());

        // filterRecipesByTags(newData)

    });

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) newData = filterRecipesBySearch(data, event.target.value.toLowerCase());
        else newData = [...data]

        displayRecipes(newData)
        displayIngredients(newData)
        displayAppliances(newData)
        displayUtensils(newData)
        filterRecipesByTags(newData)
    })


}
App();