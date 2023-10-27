export function searchTagsList(event, newData, typeElement) {
  const container = document.querySelector(`.${typeElement}-container`);
  const searchTerm = event.target.value.toLowerCase();
  container.innerHTML = '';

  let uniqueItems = [];

  // get all items from recipes and remove duplicates
  if (typeElement === 'ingredients') {
    uniqueItems = [...new Set(newData.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
  } else if (typeElement === 'appliances') {
    uniqueItems = [...new Set(newData.flatMap(recipe => recipe.appliance.toLowerCase()))];
  } else if (typeElement === 'ustensils') {
    uniqueItems = [...new Set(newData.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase())))];
  }

  // filter items by search term
  const filteredItems = uniqueItems.filter(item => item.includes(searchTerm));

  // display list of ingredients
  filteredItems.forEach(item => {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    liElement.classList.add('item');
    container.appendChild(liElement);
  });
}