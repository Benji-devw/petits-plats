
export function displayListIngredients(recipes, newTag) {
    const ingredientsContainer = document.querySelector('.ingredients-container');
    
    ingredientsContainer.innerHTML = '';

    //TODO: add comments
    const uniqueIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];

    uniqueIngredients.forEach(ingredient => {
        const foundTag = newTag.find(tag => tag === ingredient);
        if (!foundTag) {
            const liElement = document.createElement('li');
            liElement.textContent = ingredient;
            liElement.classList.add('item')
            ingredientsContainer.appendChild(liElement);
        }
    });
}

export function displayListAppliances(recipes) {
    const appliancesContainer = document.querySelector('.appliances-container');
    appliancesContainer.innerHTML = '';

    const uniqueAppliances = [...new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))];
    uniqueAppliances.forEach(appliance => {
        const liElement = document.createElement('li');
        liElement.textContent = appliance;
        liElement.classList.add('item')
        appliancesContainer.appendChild(liElement);
    });
}

export function displayListUtensils(recipes) {
    const utensilsContainer = document.querySelector('.ustensils-container');
    utensilsContainer.innerHTML = '';

    const uniqueUtensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase())))];
    uniqueUtensils.forEach(utensil => {
        const liElement = document.createElement('li');
        liElement.textContent = utensil;
        liElement.classList.add('item')
        utensilsContainer.appendChild(liElement);
    });
}