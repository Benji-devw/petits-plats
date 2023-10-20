import { createLiElement } from "./tags_create.js";



export function displayIngredients(recipes) {
    const ingredientsContainer = document.querySelector('.ingredients-container');
    ingredientsContainer.innerHTML = '';

    const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
    uniqueIngredients.forEach(ingredient => {
        const itemElement = createLiElement(ingredient, "ingredient");
        ingredientsContainer.appendChild(itemElement);
    });
}

export function displayAppliances(recipes) {
    const appliancesContainer = document.querySelector('.appliances-container');
    appliancesContainer.innerHTML = '';

    const uniqueAppliances = [...new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))];
    uniqueAppliances.forEach(appliance => {
        const itemElement = createLiElement(appliance);
        appliancesContainer.appendChild(itemElement);
    });
}

export function displayUtensils(recipes) {
    const utensilsContainer = document.querySelector('.utensils-container');
    utensilsContainer.innerHTML = '';

    const uniqueUtensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase())))];
    uniqueUtensils.forEach(utensil => {
        const itemElement = createLiElement(utensil);
        utensilsContainer.appendChild(itemElement);
    });
}