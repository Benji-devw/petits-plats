import recipes from "../data/recipes.js"
import CardRecipe from "./CardRecipe.js";





/**
 * @param {string} searchValue - Search term
 * @param {array} data - All Data
 * @returns {array} - Data filtered
 **********************************/
function filterRecipes(searchValue, data, selectedIngredients) {
    return data.filter(recipe => {
        if (recipe.name.toLowerCase().includes(searchValue) ||
            recipe.description.toLowerCase().includes(searchValue)) {
            return true;
        } else {
            const findIngredient = recipe.ingredients.find(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(searchValue);
            });
            return !!findIngredient;
        }
    })
    //     .filter(recipe => {
    //     return selectedIngredients.every(ingredient => {
    //         return recipe.ingredients.some(item => {
    //             return item.ingredient.toLowerCase().includes(ingredient.toLowerCase());
    //         });
    //     });
    // });
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



function removeFilterButton(ingredient) {
    const filterContainer = document.querySelector('.filter-container');
    const filterButtons = filterContainer.querySelectorAll('li');
    filterButtons.forEach(button => {
        if (button.textContent === ingredient) {
            filterContainer.removeChild(button);
        }
    });
}
function createFilterButton(ingredient) {
    const filterContainer = document.querySelector('.filter-container');
    const filterButton = document.createElement('li');
    filterButton.textContent = ingredient;
    filterButton.addEventListener('click', () => {
        removeFilterButton(ingredient);
    });
    filterContainer.appendChild(filterButton);
}



/**
 * @description Filter for Ingredients advanced filter
 * @param {array} recipes - Data result search bar
 * @param {string} val - Name of advanced filter
 // * @returns {element} li - Html element
 **********************************/
function filterBarIngredients(recipes) {
    const ingredientsFilter = document.querySelector('.ingredients-filter');
    const searchBarIngredients = document.querySelector('.search-ingredients')

    ingredientsFilter.innerHTML = '';
    let ingredientsArray = [];

    recipes.forEach(recipe => {
        const ingredientLower = recipe.ingredients.map(arr => arr.ingredient.toLowerCase());
        ingredientsArray = ingredientsArray.concat(ingredientLower);
        ingredientsArray = ingredientsArray.filter((item, index) => {
            return ingredientsArray.indexOf(item) === index;
        });
    })
    searchBarIngredients.addEventListener('input', (event) => {
        ingredientsFilter.innerHTML = '';
        advancedFilterBar(event.target.value.toLowerCase(), ingredientsArray, ingredientsFilter)
    })

    ingredientsArray.forEach(item => {
        createLiElement(item, ingredientsFilter)
    });

}



function renderRecipes(recipes) {
    document.querySelector('.filters-count-result span').innerHTML = `${recipes.length}`;
        const galleryElement = document.querySelector('#gallery_section .gallery');

    // const test = filterBarIngredients(recipes)

    recipes.forEach(recipe => {
        const cardHTML = CardRecipe(recipe);
        // filterBarIngredients(recipes)
        const cardElement = document.createElement('article');
        cardElement.classList.add('card-container');
        cardElement.innerHTML = cardHTML;
        galleryElement.appendChild(cardElement);
    });
}




/**
 * @description Main function
 * @returns All Cards for gallery
 **********************************/
function App() {
    let data = recipes
    const galleryElement = document.querySelector('#gallery_section .gallery');
    const searchBar = document.querySelector('.search-bar .search');
    let newData = []
    renderRecipes(data)
    // filterBarIngredients(newData.length <= 0 ? data : newData)

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            const filteredData = filterRecipes(event.target.value.toLowerCase(), data, []);
            galleryElement.innerHTML = '';
            renderRecipes(filteredData)
        } else {
            galleryElement.innerHTML = '';
            renderRecipes(data)
        }
    })

    // const ingredientsItems = document.querySelectorAll('.ingredients-filter li');
    // const filterContainer = document.querySelectorAll('.filter-container li');
    // const arr = []
    // ingredientsItems.forEach(item => {
    //     item.addEventListener('click', (event) => {
    //         console.log(newData)
    //
    //         const clickedIngredient = event.target.textContent;
    //         if (!arr.includes(clickedIngredient)) {
    //             arr.push(clickedIngredient);
    //             console.log(arr);
    //             createFilterButton(clickedIngredient);
    //         }
    //         galleryElement.innerHTML = '';
    //         const filteredData = filterRecipes(val, recipes, arr);
    //         // console.log(filteredData)
    //         renderRecipes(filteredData);
    //     });
    // });
    // filterContainer.forEach(itemTest => {
    //     itemTest.addEventListener('click', (event) => {
    //         const clickedIngredient = event.target.textContent;
    //         arr.splice(arr.indexOf(clickedIngredient), 1);
    //         removeFilterButton(clickedIngredient);
    //
    //         galleryElement.innerHTML = '';
    //         const filteredData = filterRecipes(val, recipes, arr);
    //         renderRecipes(filteredData);
    //         console.log(arr);
    //     });
    // })

}
App();

