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

function createTag(item) {
    const tagsWrapper = document.querySelector('.tags');
    const existingTag = tagsWrapper.querySelector(`span.tag-element[data-tag="${item}"]`);
    // let arr = []
    if (!existingTag) {
        const tag = document.createElement('span');
        tag.classList.add('tag-element', 'px-4', 'py-2', 'm-2');
        tag.textContent = item;
        tag.setAttribute('data-tag', item);
        // tag.addEventListener('click', () => {
        //     // arr.push(tag.textContent)
        //     console.log(tag.textContent);
        // });
        tagsWrapper.appendChild(tag);
    }
}


function createLiElement(item, type) {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    liElement.classList.add('item')
    liElement.addEventListener('click', () => {
        createTag(item, type)
    })
    return liElement
}

function displayIngredients(recipes) {
    const ingredientsContainer = document.querySelector('.ingredients-container');
    ingredientsContainer.innerHTML = '';

    const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
    uniqueIngredients.forEach(ingredient => {
        const itemElement = createLiElement(ingredient, "ingredient");
        ingredientsContainer.appendChild(itemElement);
    });
}

function displayAppliances(recipes) {
    const appliancesContainer = document.querySelector('.appliances-container');
    appliancesContainer.innerHTML = '';

    const uniqueAppliances = [...new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))];
    uniqueAppliances.forEach(appliance => {
        const itemElement = createLiElement(appliance);
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


function ingredientFiltered(recipes, searchTerm) {
    const ingredientsContainer = document.querySelector('.ingredients-container');
    ingredientsContainer.innerHTML = '';
    let ingredientsArray = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (!ingredientsArray.includes(ingredient.ingredient.toLowerCase())) {
                ingredientsArray.push(ingredient.ingredient.toLowerCase());
            }
        });
    });
    return ingredientsArray.forEach(item => {
        if (item.toLowerCase().includes(searchTerm)) {
            return ingredientsContainer.appendChild(createLiElement(item))
        }
    });
}


function filterRecipesByTags(recipes, termValue) {
    return recipes.filter(recipe => {
         const findIngredient = recipe.ingredients.find(ingredient => {
             return ingredient.ingredient.toLowerCase().includes(termValue);
         });
         console.log(!!findIngredient)
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
    // const tagsWrapper = document.querySelector('.tags');
    // const tagsElement = document.querySelectorAll('.tag-element')


    let newData= [...data]
    let newTag= []

    displayRecipes(data)
    displayIngredients(data)
    displayAppliances(data)
    displayUtensils(data)

    const ingredientLiElement = document.querySelectorAll('.ingredients-container li')
    ingredientLiElement.forEach(element => {
        element.addEventListener('click', () => {
            // test(recipes, element.textContent)
            newTag.push(element.textContent)
            console.log(newTag)
            newData = filterRecipesByTags(newData, newTag)
            displayRecipes(newData)
            displayIngredients(newData)
            displayAppliances(newData)
            displayUtensils(newData)
        })
    })

    searchBar.addEventListener('input', (event) => {
        if (event.target.value.length > 2) newData = filterRecipesBySearch(data, event.target.value.toLowerCase());
        else newData = [...data]

        displayRecipes(newData)
        displayIngredients(newData)
        displayAppliances(newData)
        displayUtensils(newData)
        filterRecipesByTags(newData)

    })

    searchBarIngredients.addEventListener('input', (event) => {
        ingredientFiltered(newData, event.target.value.toLowerCase())
        filterRecipesByTags(newData)

    });


}
App();