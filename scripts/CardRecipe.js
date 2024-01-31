/**
 * @description Construct html Card
 * @param {object} data - Card recipe
 **********************************/
export default function CardRecipe(data) {
    return `
        <div class="card position-relative">
            <span class="time position-absolute rounded-5">${data.time}min</span>
            <img src="./assets/images/${data.image}" class="card-img-top" alt="${data.name}">
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