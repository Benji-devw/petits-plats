import recipes from "../data/recipes.js"
import displayRecipes from "./displayRecipes.js";
import { displayListIngredients, displayListAppliances, displayListUtensils } from "./tags/tagsList_Display.js";
import { filterTagsListIngredient, filterTagsListAppliance, filterTagsListUstensils } from "./tags/tagsList_Filter.js";
import { createTag } from "./tags/tags_create.js";



// TODO: change method for compare performance
function filterRecipesBySearch(recipes, termValue) {
    // Filter for callback function
    return recipes.filter(recipe => {
        // console.log(recipe);
        // Check if recipe name or description contains search value
        if (recipe.name.toLowerCase().includes(termValue) ||
            recipe.description.toLowerCase().includes(termValue)) {
            return true;
        } else {
            // Check if ingredient is in recipe
            const findIngredient = recipe.ingredients.find(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(termValue);
            });
            return !!findIngredient;        // !! => convert to boolean
        }
    })
}

function filterRecipesByTags(recipes, tags) {
    return recipes.filter(recipe => {
        return tags.every(tag => {
            const foundIngredient = recipe.ingredients.find(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(tag);
            });
            const foundAppliance = recipe.appliance.toLowerCase().includes(tag);
            const foundUtensil = recipe.ustensils.find(utensil => {
                return utensil.toLowerCase().includes(tag);
            });
            return !!foundIngredient || !!foundAppliance || !!foundUtensil;
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
    const searchIngredients = document.querySelector('.search-ingredients');
    const searchAppliances = document.querySelector('.search-appliances');
    const searchUstensils = document.querySelector('.search-ustensils');
    const listOfIngredients = document.querySelector('.ingredients-container');
    const listOfAppliances = document.querySelector('.appliances-container');
    const listOfUtensils = document.querySelector('.ustensils-container');
    const tagsWrapper = document.querySelector('.tags');

    let newData = [...data];
    let newTag = [];
    let searchValue = '';
    displayRecipes(newData);
    displayListIngredients(newData, newTag);
    displayListAppliances(newData);
    displayListUtensils(newData);

    searchIngredients.addEventListener('input', (event) => {

        // TODO: add querySelector prametre
        filterTagsListIngredient(event, newData);
    });
    searchAppliances.addEventListener('input', (event) => {
        filterTagsListAppliance(event, newData);
    });
    searchUstensils.addEventListener('input', (event) => {
        filterTagsListUstensils(event, newData);
    });


    //** Remove tag and update recipes */
    tagsWrapper.addEventListener('click', (event) => {
        if (event.target.tagName !== 'SPAN') return;            // Check if tag is clicked and not the container
        
        const item = event.target.textContent;                  // Get tag name
        newTag = newTag.filter(tag => tag !== item);            // Remove tag from array
        
        searchValue.length > 2
            ? newData = filterRecipesBySearch(data, searchValue.toLowerCase())       // Filter by saearch value if active
            : newData = filterRecipesByTags(data, newTag);      // Filter by tags if no search value
        
        displayRecipes(newData);
        displayListIngredients(newData, newTag);
        displayListAppliances(newData);
        displayListUtensils(newData);
    });


    //** Event for filter by tags */
    listOfIngredients.addEventListener('click', handleFilterClick);
    listOfAppliances.addEventListener('click', handleFilterClick);
    listOfUtensils.addEventListener('click', handleFilterClick);
    function handleFilterClick(event) {
        const item = event.target.textContent;
        createTag(item);
        
        newTag.push(item);
        
        newData = filterRecipesByTags(newData, newTag);     // Filter by tags

        displayRecipes(newData);
        displayListIngredients(newData, newTag);
        displayListAppliances(newData);
        displayListUtensils(newData);
    }


    //** Filter by search bar */
    searchBar.addEventListener('input', (event) => {
        searchValue = event.target.value.toLowerCase();

        event.target.value.length > 2
            ? newData = filterRecipesBySearch(data, event.target.value.toLowerCase())
            : newData = [...data];
        
        newData = filterRecipesByTags(newData, newTag)

        displayRecipes(newData);
        displayListIngredients(newData, newTag);
        displayListAppliances(newData);
        displayListUtensils(newData);
    });
    
}

App();
