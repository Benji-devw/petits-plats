import recipes from "../data/recipes.js"
import CardRecipe from "./CardRecipe.js";





/**
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

/**
 * @description Create li element
 * @param {item} - Item of advanced filter
 * @param {element} - Html element for inner
 **********************************/
function createLiElement(item, elem) {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    elem.appendChild(liElement);
}


/**
 * @description Filter array
 * @param {item} - Item of advanced filter array
 * @param {element} - Html element for inner
 **********************************/
function searchBarAdvancedFilter(event, arr, elem) {
    const termVal = event.target.value.toLowerCase()
    const filtered = arr.filter(item => {
        return item.toLowerCase().includes(termVal)
    })
    filtered.forEach(item => {
        createLiElement(item, elem)
    });
}


/**
 * @description Filter for Ingredients advanced filter
 * @param {array} recipes - Data result search bar
 * @returns {element} - li Element
 **********************************/
function renderAdvancedFilters(recipes, val) {
    const ingredientsFilter = document.querySelector('.ingredients-filter');
    const searchBarIngredients = document.querySelector('.search-ingredients')

    ingredientsFilter.innerHTML = '';
    let ingredientsArray = [];

    recipes.forEach(recipe => {
        const ingredientLower = recipe.ingredients.map(arr => arr.ingredient.toLowerCase());
        if (val === 'ingredients') {
            ingredientsArray = ingredientsArray.concat(ingredientLower);
            ingredientsArray = ingredientsArray.filter((item, index) => {
                console.log(recipe)
                return ingredientsArray.indexOf(item) === index;
            });
        }
        else if (val === 'appareils') {

        }
    })

    ingredientsArray.forEach(item => {
        createLiElement(item, ingredientsFilter)
    });

    searchBarIngredients.addEventListener('input', (event) => {
        ingredientsFilter.innerHTML = '';
        searchBarAdvancedFilter(event, ingredientsArray, ingredientsFilter)
    })

    // console.log(ingredientsArray)
}




function renderRecipes(recipes) {
    const galleryElement = document.querySelector('#gallery_section .gallery');
    document.querySelector('.filters-count-result span').innerHTML = recipes.length

    recipes.forEach(recipe => {
        const cardHTML = CardRecipe(recipe);
        const cardElement = document.createElement('article');
        cardElement.classList.add('card-container');
        cardElement.innerHTML = cardHTML;

        galleryElement.appendChild(cardElement);
    });
    renderAdvancedFilters(recipes, 'ingredients')
}


/**
 * @description Main function
 * @returns All Cards for gallery
 **********************************/
function App() {
    let data = recipes

    const galleryElement = document.querySelector('#gallery_section .gallery');
    const searchBar = document.querySelector('.search-bar .search');
    // const searchSubmit = document.querySelector('.search-bar button')

    renderRecipes(data)

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            const filteredData = filterBarRecipes(event.target.value, data);
            galleryElement.innerHTML = '';
            renderRecipes(filteredData)
        } else renderRecipes(data)
    })


}
App();

