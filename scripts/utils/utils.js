// // Sélectionnez l'élément collapse
// const collapseElement = document.querySelector('.collapse');
// const accordionElement = document.querySelector('.accordion-collapse');
// const buttonElement = document.querySelector('.accordion-button');

// // Ajoutez un gestionnaire d'événements au document pour détecter les clics en dehors de l'élément collapse
// buttonElement.addEventListener('click', (event) => {
    
//     console.log(collapseElement);

//     const backdropElement = document.createElement('div');
//     backdropElement.classList.add('backdrop');
//     document.body.appendChild(backdropElement);
    
//     backdropElement.addEventListener('click', () => {
//       accordionElement.classList.remove('show');
//         backdropElement.remove();
//     });

//     // // Vérifiez si l'élément collapse est visible
//     // if (collapseElement.classList.contains('show')) {
//     //     // Si oui, masquez-le
//     //     collapseElement.classList.remove('show');
//     // } else { 
//     //     // Sinon, affichez-le
//     //     collapseElement.classList.add('show');
//     // }
// });
