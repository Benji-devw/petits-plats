export function displayTagsList(recipes, newTag, typeElement) {
    const container = document.querySelector(`.${typeElement}-container`);
    
    container.innerHTML = '';
    let uniqueItems = [];

    // get unique items from recipes by typeElement
    if (typeElement === 'ingredients') {
        uniqueItems = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
    } else if (typeElement === 'appliances') {
        uniqueItems = [...new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))];
    } else if (typeElement === 'ustensils') {
        uniqueItems = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase())))];
    }

    // display list of items
    uniqueItems.forEach(item => {
        const foundTag = newTag.find(tag => tag === item);
        if (!foundTag) {
            const liElement = document.createElement('li');
            liElement.textContent = item;
            liElement.classList.add('item')
            container.appendChild(liElement);
        }
    });
}
