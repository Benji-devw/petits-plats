import CardRecipe from "./CardRecipe.js";

export default function displayRecipes(recipes) {
    document.querySelector('.filters-count-result span').innerHTML = `${recipes.length}`;
    const galleryElement = document.querySelector('#gallery_section .gallery');

    recipes.forEach(recipe => {
        const cardHTML = CardRecipe(recipe);
        const cardElement = document.createElement('article');
        cardElement.classList.add('card-container');
        cardElement.innerHTML = cardHTML;
        galleryElement.appendChild(cardElement);
    });
}
