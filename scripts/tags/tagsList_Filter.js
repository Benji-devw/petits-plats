// FIXME: In data "recipes.js" appliance and ustensils are the same object ?

export function filterTagsListIngredient(event, newData) { 
  const listOfIngredients = document.querySelector('.ingredients-container');

  const searchTerm = event.target.value.toLowerCase();
  // clear container
  listOfIngredients.innerHTML = '';

  // get all items from recipes and remove duplicates
  const uniqueIngredients = [...new Set(newData.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];

  // filter items by search term
  const filteredIngredients = uniqueIngredients.filter(ingredient => ingredient.includes(searchTerm));

  // display list of ingredients
  filteredIngredients.forEach(ingredient => {
      const liElement = document.createElement('li');
      liElement.textContent = ingredient;
      liElement.classList.add('item')
      listOfIngredients.appendChild(liElement);
  });


}

export function filterTagsListAppliance(event, newData) { 
  const listOfAppliances = document.querySelector('.appliances-container');

  const searchTerm = event.target.value.toLowerCase();
  listOfAppliances.innerHTML = '';
  
  const uniqueAppliances = [...new Set(newData.flatMap(recipe => recipe.appliance.toLowerCase()))];
  const filteredAppliances = uniqueAppliances.filter(appliance => appliance.includes(searchTerm));

  filteredAppliances.forEach(appliance => {
      const liElement = document.createElement('li');
      liElement.textContent = appliance;
      liElement.classList.add('item')
      listOfAppliances.appendChild(liElement);
  });
}

export function filterTagsListUstensils(event, newData) { 
  const listOfUstensils = document.querySelector('.ustensils-container');

  const searchTerm = event.target.value.toLowerCase();
  listOfUstensils.innerHTML = '';
  
  const uniqueUstensils = [...new Set(newData.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase())))];
  const filteredUstensils = uniqueUstensils.filter(ustensil => ustensil.includes(searchTerm));

  filteredUstensils.forEach(ustensil => {
      const liElement = document.createElement('li');
      liElement.textContent = ustensil;
      liElement.classList.add('item')
      listOfUstensils.appendChild(liElement);
  });
}