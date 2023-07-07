import recipes from "../data/recipes.js"
import CardRecipe from "./CardRecipe.js";





/**
 * @param {string} searchValue - Search term
 * @param {array} data - All Data
 * @returns {array} - Data filtered
 **********************************/
function filterBarRecipes(searchValue, data) {
    // Filter the data based on the search term
    return data.filter(recipe => {
        const recipeDescription = recipe.description.toLowerCase();
        const recipeName = recipe.name.toLowerCase();

        if (recipeName.includes(searchValue) ||
            recipeDescription.includes(searchValue)) {
            return true
        } else {
            const findIngredient = recipe.ingredients.find(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(searchValue)
            })
            return !!findIngredient
        }

    });
}

/**
 * @description Create li element
 * @param {string} item - Item of advanced filter
 * @param {Element} elem - Html element for inner
 **********************************/
function createLiElement(item, elem) {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    elem.appendChild(liElement);
}


/**
 * @description Filter array
 * @param {string} event - Term search advanced filter
 * @param {array} arr - Advanced filter items
 * @param {Element} elem - Html element for inner
 **********************************/
function advancedFilterBar(event, arr, elem) {
    const filtered = arr.filter(item => {
        return item.toLowerCase().includes(event)
    })
    filtered.forEach(item => {
        createLiElement(item, elem)
    });
}


/**
 * @description Filter for Ingredients advanced filter
 * @param {array} recipes - Data result search bar
 * @param {string} val - Name of advanced filter
 // * @returns {element} li - Html element
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
                return ingredientsArray.indexOf(item) === index;
            });
        }
        else if (val === 'appareils') {}
    })

    ingredientsArray.forEach(item => {
        createLiElement(item, ingredientsFilter)
    });

    searchBarIngredients.addEventListener('input', (event) => {
        ingredientsFilter.innerHTML = '';
        advancedFilterBar(event.target.value.toLowerCase(), ingredientsArray, ingredientsFilter)
    })

    const items = document.querySelectorAll('.ingredients-filter li')
        items.forEach(item => {
            item.addEventListener('click', () => {
            console.log(item.textContent)
        })
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

    renderRecipes(data)

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            const filteredData = filterBarRecipes(event.target.value.toLowerCase(), data);
            galleryElement.innerHTML = '';
            renderRecipes(filteredData)
        } else {
            galleryElement.innerHTML = '';
            renderRecipes(data)
        }
    })
}
App();

