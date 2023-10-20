import recipes from "../data/recipes.js"
import displayRecipes from "./utils/displayRecipes.js";
import { displayListIngredients, displayAppliances, displayUtensils } from "./utils/tagsList_Display.js";
import { createTag } from "./utils/tags_create.js";




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

function filterRecipesByTags(recipes, tags) {
    return recipes.filter(recipe => {
        return tags.every(tag => {
            const foundIngredient = recipe.ingredients.find(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(tag);
            });
            return !!foundIngredient;
        });
    });
}





/**
 * @description Main function
 * @returns All Cards for gallery
 **********************************/
function App() {
    const data = recipes;
    const searchBar = document.querySelector('.search-bar .search');
    const listOfIngredients = document.querySelector('.ingredients-container');
    const tagsWrapper = document.querySelector('.tags');

    let newData = [...data];
    let newTag = [];
    let searchValue = '';

    displayRecipes(newData);
    displayListIngredients(newData);


    //** Filter by tag and update data */
    tagsWrapper.addEventListener('click', (event) => {
        console.log(event.target);
        if (event.target.tagName !== 'SPAN') return;        // Check if tag is clicked and not the container
        
        const item = event.target.textContent;              // Get tag name
        newTag = newTag.filter(tag => tag !== item);        // Remove tag from array
        
        if (searchValue.length > 2) {
            newData = filterRecipesBySearch(data, searchValue.toLowerCase());        // Filter by saearch value if active
        } else {
            newData = filterRecipesByTags(data, newTag);     // Filter by tags if no search value
        }

        displayRecipes(newData);
        displayListIngredients(newData);
    });


    //** Display list of ingredients */
    listOfIngredients.addEventListener('click', (event) => {
        const item = event.target.textContent;
        createTag(item, "ingredient");

        newTag.push(item);      // Add tag to array
        newData = filterRecipesByTags(newData, newTag);     // Filter by tags

        displayRecipes(newData);
        displayListIngredients(newData);
    });


    //** Filter by search bar */
    searchBar.addEventListener('input', (event) => {
        searchValue = event.target.value.toLowerCase();

        if (event.target.value.length > 2) {
            newData = filterRecipesBySearch(data, event.target.value.toLowerCase());
        } 
        // else if (newTag.length > 0) {
        //     newData = filterRecipesBySearch(filterRecipesByTags(data, newTag), event.target.value.toLowerCase());
        // } 
        else {
            newData = [...data];
        }

        
        newData = filterRecipesByTags(newData, newTag)

        displayRecipes(newData);
        displayListIngredients(newData);
    });
    
}

App();
