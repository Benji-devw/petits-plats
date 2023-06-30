import recipes from "/data/recipes.js"


/**
 * @description Construct card html
 * @param {object} data - Card recipe
 **********************************/
function CardRecipe(data) {
    return `
        <div class="card position-relative">
            <span class="time position-absolute rounded-5">${data.time}min</span>
            <img src="../assets/images/${data.image}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h3 class="card-title fw-bold my-4">${data.name}</h3>
                <h4>RECETTE</h4>
                <p class="card-text">${data.description}</p>
            </div>
            
            <div class="card-body">
                <h4>INGREDIENS</h4>
                <ul class="row row-cols-2 p-0">
                  ${data.ingredients.map(item => `
                    <li class="col my-2"> 
                      ${item.ingredient} 
                      <p>${item.quantity ? item.quantity : '-'} ${item.unit ? item.unit : ''}</p>
                    </li>
                  `).join('')}
                </ul>
            </div>
        </div>
    `
}


function filterRecipes(searchValue, data) {
    // Convert the search value to lowercase for case-insensitive matching
    const searchTerm = searchValue.toLowerCase();

    // Filter the data based on the search term
    const filteredData = data.filter(recipe => {
        // Perform the matching on the recipe property
        const recipeDescription = recipe.description.toLowerCase();
        const recipeName = recipe.name.toLowerCase();
        const recipeAppliance = recipe.appliance.toLowerCase()

        return (
            recipeName.includes(searchTerm) ||
            recipeDescription.includes(searchTerm) ||
            recipeAppliance.includes(searchTerm)
        );
    });
    return filteredData;
}


/**
 * @description Main function
 * @returns All Cards into gallery
 **********************************/
function App() {
    let data = recipes

    const galleryElement = document.querySelector('#gallery_section .gallery');
    const searchInput = document.querySelector('.search-bar .search')
    const searchSubmit = document.querySelector('.search-bar button')


    function renderRecipes(recipes) {
        document.querySelector('.filters-count-result span').innerHTML = recipes.length
        console.log(recipes)
        recipes.forEach(recipe => {
            const cardHTML = CardRecipe(recipe);
            const cardElement = document.createElement('article');
            cardElement.classList.add('card-container');
            cardElement.innerHTML = cardHTML;

            galleryElement.appendChild(cardElement);
        });
    }
    renderRecipes(data)

    searchInput.addEventListener('input', (event) => {
        if (event.target.value.length > 2) {
            const filteredData = filterRecipes(event.target.value, data);
            galleryElement.innerHTML = '';
            renderRecipes(filteredData)
        } else renderRecipes(data)
    })

}
App();

