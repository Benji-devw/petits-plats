import recipes from "../data/recipes.js"
import CardRecipe from "./CardRecipe.js";





/**
 * @description Filter header bar
 * @param {string} searchValue - Search term
 * @param {array} data - All Data
 * @returns {array} - Data filtered
 **********************************/
function filterBarRecipes(searchValue, data) {
    // Convert the search value to lowercase for matching
    const searchTerm = searchValue.toLowerCase();

    // Filter the data based on the search term
    return data.filter(recipe => {
        const recipeDescription = recipe.description.toLowerCase();
        const recipeName = recipe.name.toLowerCase();
        const recipeAppliance = recipe.appliance.toLowerCase()

        return (
            recipeName.includes(searchTerm) ||
            recipeDescription.includes(searchTerm) ||
            recipeAppliance.includes(searchTerm)
        );
    });
}


function renderIngredients(recipes) {
    const ingredientsFilter = document.querySelector('.ingredients-filter');
    ingredientsFilter.innerHTML = '';
    let ingredientsArray = [];

    recipes.forEach(recipe => {
        const ingredientLower = recipe.ingredients.map(e => e.ingredient.toLowerCase());

        ingredientsArray = ingredientsArray.concat(ingredientLower);
        ingredientsArray = ingredientsArray.filter((item, index) => {
            return ingredientsArray.indexOf(item) === index;
        });
    })

    ingredientsArray.forEach(ingredient => {
        const liElement = document.createElement('li');
        liElement.textContent = ingredient;
        ingredientsFilter.appendChild(liElement);
    });
    console.log(ingredientsArray)
}




/**
 * @description Main function
 * @returns All Cards into gallery
 **********************************/
function App() {
    let data = recipes

    const galleryElement = document.querySelector('#gallery_section .gallery');
    const searchInput = document.querySelector('.search-bar .search');
    // const searchSubmit = document.querySelector('.search-bar button')


    function renderRecipes(recipes) {
        document.querySelector('.filters-count-result span').innerHTML = recipes.length

        recipes.forEach(recipe => {
            const cardHTML = CardRecipe(recipe);
            const cardElement = document.createElement('article');
            cardElement.classList.add('card-container');
            cardElement.innerHTML = cardHTML;

            galleryElement.appendChild(cardElement);
        // renderIngredients(recipe)
        });
        renderIngredients(recipes)

    }
    renderRecipes(data)

    searchInput.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            const filteredData = filterBarRecipes(event.target.value, data);
            galleryElement.innerHTML = '';
            renderRecipes(filteredData)
        } else renderRecipes(data)
    })

}
App();

