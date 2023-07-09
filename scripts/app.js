import recipes from "../data/recipes.js"
import displayRecipes from "./displayRecipes.js";





/**
 * @param {string} searchValue - Search term
 * @param {array} data - All Data
 * @returns {array} - Data filtered
 **********************************/
function filterRecipes(recipes, thermValue) {
    return recipes.filter(recipe => {
        if (recipe.name.toLowerCase().includes(thermValue) ||
            recipe.description.toLowerCase().includes(thermValue)) {
            return true;
        } else {
            const findIngredient = recipe.ingredients.find(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(thermValue);
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




function createLiElement(item, elem) {
    const tagsContainer = document.querySelector('.tags');
    const liElement = document.createElement('li');
    liElement.textContent = item;

    let addedToTagsContainer = false;

    liElement.addEventListener('click', event => {
        if (!addedToTagsContainer) {
            const liTags = document.createElement('span');
            liTags.textContent = item;
            tagsContainer.appendChild(liTags);
            addedToTagsContainer = true;

            liTags.addEventListener('click', () => {
                tagsContainer.removeChild(liTags);
                addedToTagsContainer = false;
            });
        }
    });

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



// function removeFilterButton(ingredient) {
//     const filterContainer = document.querySelector('.filter-container');
//     const filterButtons = filterContainer.querySelectorAll('li');
//     filterButtons.forEach(button => {
//         if (button.textContent === ingredient) {
//             filterContainer.removeChild(button);
//         }
//     });
// }
// function createFilterButton(ingredient) {
//     const filterContainer = document.querySelector('.filter-container');
//     const filterButton = document.createElement('li');
//     filterButton.textContent = ingredient;
//     filterButton.addEventListener('click', () => {
//         removeFilterButton(ingredient);
//     });
//     filterContainer.appendChild(filterButton);
// }



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







/**
 * @description Main function
 * @returns All Cards for gallery
 **********************************/
function App() {
    let data = recipes
    const galleryElement = document.querySelector('#gallery_section .gallery');
    const searchBar = document.querySelector('.search-bar .search');

    displayRecipes(data)
    filterBarIngredients(data)

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            const filteredData = filterRecipes(data, event.target.value.toLowerCase());
            galleryElement.innerHTML = '';
            displayRecipes(filteredData)
            filterBarIngredients(filteredData)
        } else {
            galleryElement.innerHTML = '';
            displayRecipes(data)
        }
    })
}
App();

