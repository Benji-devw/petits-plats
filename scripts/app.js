import recipes from "../data/recipes.js"
import displayRecipes from "./utils/displayRecipes.js";


/**
 * @param {string} searchValue - Search term
 * @param {array} data - All Data
 * @returns {array} - Data filtered
 **********************************/
function filterRecipes(recipes, termValue, selectedIngredients) {
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
        .filter(recipe => {
            return selectedIngredients.every(ingredient => {
                return recipe.ingredients.some(item => {
                    return item.ingredient.toLowerCase().includes(ingredient.toLowerCase());
                });
            });
        });
}


function createLiElement(item, elem) {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    elem.appendChild(liElement);
}





function advancedFilterBar(event, arr, elem) {
    const filtered = arr.filter(item => {
        return item.toLowerCase().includes(event)
    })
    filtered.forEach(item => {
        createLiElement(item, elem)
    });
}






function filterBarIngredients(recipes, termValue) {
    const ingredientsFilter = document.querySelector('.ingredients-filter');
    const searchBarIngredients = document.querySelector('.search-ingredients')
    const galleryElement = document.querySelector('#gallery_section .gallery');
    const tagsContainer = document.querySelector('.tags');

    ingredientsFilter.innerHTML = '';
    let ingredientsArray = [];
    let arr = []



    recipes.forEach(recipe => {
        const ingredientLower = recipe.ingredients.map(arr => arr.ingredient.toLowerCase());
        ingredientsArray = ingredientsArray.concat(ingredientLower);
        ingredientsArray = ingredientsArray.filter((item, index) => {
            return ingredientsArray.indexOf(item) === index;
        });
    })


    function UpdateRecipes() {
        console.log(arr)
        const filteredData = filterRecipes(recipes, termValue, arr);
        galleryElement.innerHTML = '';
        displayRecipes(filteredData)
    }

    searchBarIngredients.addEventListener('input', (event) => {
        ingredientsFilter.innerHTML = '';
        const filtered = ingredientsArray.filter(item => {
            return item.toLowerCase().includes(event.target.value.toLowerCase())
        })
        filtered.forEach(item => {
            createLiElement(item, ingredientsFilter)
        });
        // UpdateRecipes()
    })

    ingredientsArray.forEach(item => {
        const liElement = document.createElement('li');
        liElement.textContent = item;
        ingredientsFilter.appendChild(liElement);

        // let addedToTagsContainer = false;
        // liElement.addEventListener('click', event => {
        //     // console.log('click')
        //     if (!addedToTagsContainer) {
        //         const liTags = document.createElement('span');
        //         liTags.textContent = item;
        //         tagsContainer.appendChild(liTags);
        //         arr.push(item)
        //         UpdateRecipes()
        //
        //         liTags.addEventListener('click', () => {
        //             tagsContainer.removeChild(liTags);
        //             if (arr.indexOf(item) > -1)  arr.splice(arr.indexOf(item), 1);
        //             addedToTagsContainer = false;
        //             UpdateRecipes();
        //         });
        //     }
        // });
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
    const tagsContainer = document.querySelector('.tags');

    displayRecipes(data)
    filterBarIngredients(data, '')

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            const filteredData = filterRecipes(data, event.target.value.toLowerCase(), []);
            galleryElement.innerHTML = '';
            tagsContainer.innerHTML = '';
            displayRecipes(filteredData)
            filterBarIngredients(filteredData, event.target.value.toLowerCase())
        } else {
            galleryElement.innerHTML = '';
            displayRecipes(data)
        }
    })

}

App();

