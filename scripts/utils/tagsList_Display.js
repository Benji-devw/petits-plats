import { createTag } from "./tags_create.js";



export function displayListIngredients(recipes) {
    const ingredientsContainer = document.querySelector('.ingredients-container');
    ingredientsContainer.innerHTML = '';

    const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
    uniqueIngredients.forEach(ingredient => {

        // const itemElement = createTag(ingredient, "ingredient");
        const liElement = document.createElement('li');
        liElement.textContent = ingredient;
        liElement.classList.add('item')
        
        // if (itemElement.textContent === ingredient) {
            ingredientsContainer.appendChild(liElement);
        // }
    });
}

export function displayAppliances(recipes) {
    const appliancesContainer = document.querySelector('.appliances-container');
    appliancesContainer.innerHTML = '';

    const uniqueAppliances = [...new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))];
    uniqueAppliances.forEach(appliance => {
        const itemElement = createTag(appliance);
        appliancesContainer.appendChild(itemElement);
    });
}

export function displayUtensils(recipes) {
    const utensilsContainer = document.querySelector('.utensils-container');
    utensilsContainer.innerHTML = '';

    const uniqueUtensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase())))];
    uniqueUtensils.forEach(utensil => {
        const itemElement = createTag(utensil);
        utensilsContainer.appendChild(itemElement);
    });
}