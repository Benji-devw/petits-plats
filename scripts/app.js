import recipes from "../data/recipes.js";
import displayRecipes from "./displayRecipes.js";
import { displayTagsList } from "./tags/tagsList_Display.js";
import { searchTagsList } from "./tags/tagsList_Filter.js";
import { createTag } from "./tags/tagItem.js";

function filterRecipesBySearch(recipes, termValue) {
  // Use the filter method on the recipes array
  return recipes.filter((recipe) => {
    // Check if the recipe name or description contains the search value
    if (
      recipe.name.toLowerCase().includes(termValue) ||
      recipe.description.toLowerCase().includes(termValue)
    ) {
      return true; // If found, include the recipe in the filtered list
    } else {
      // Check if any ingredient matches the search term
      const findIngredient = recipe.ingredients.find((ingredient) => {
        return ingredient.ingredient.toLowerCase().includes(termValue);
      });
      return !!findIngredient; // Convert to boolean (true or false) and include in the filtered list if found
    }
  });
}

function filterRecipesByTags(recipes, tags) {
  return recipes.filter((recipe) => {
    return tags.every((tag) => {
      const foundIngredient = recipe.ingredients.find((ingredient) => {
        return ingredient.ingredient.toLowerCase().includes(tag);
      });
      const foundAppliance = recipe.appliance.toLowerCase().includes(tag);
      const foundUtensil = recipe.ustensils.find((utensil) => {
        return utensil.toLowerCase().includes(tag);
      });
      return !!foundIngredient || !!foundAppliance || !!foundUtensil;
    });
  });
}

/**
 * @description Main function
 * @returns All Cards for gallery
 **********************************/
function App() {
  const data = recipes;
  const searchBar = document.querySelector(".search-bar .search");
  const searchIngredients = document.querySelector(".search-ingredients");
  const searchAppliances = document.querySelector(".search-appliances");
  const searchUstensils = document.querySelector(".search-ustensils");
  const listOfIngredients = document.querySelector(".ingredients-container");
  const listOfAppliances = document.querySelector(".appliances-container");
  const listOfUtensils = document.querySelector(".ustensils-container");
  const tagsWrapper = document.querySelector(".tags");
  const searchIconIng = document.querySelector(".search-icon-ing");
  const searchIconApp = document.querySelector(".search-icon-app");
  const searchIconUst = document.querySelector(".search-icon-ust");

  let newData = [...data];
  let newTag = [];
  let searchValue = "";
  displayRecipes(newData);
  displayTagsList(newData, newTag, "ingredients");
  displayTagsList(newData, newTag, "appliances");
  displayTagsList(newData, newTag, "ustensils");

  searchIngredients.addEventListener("input", (event) => {
    searchTagsList(event, newData, "ingredients");
    event.target.value.length > 0
      ? (searchIconIng.style.display = "none")
      : (searchIconIng.style.display = "block");
  });
  searchAppliances.addEventListener("input", (event) => {
    searchTagsList(event, newData, "appliances");
    event.target.value.length > 0
      ? (searchIconApp.style.display = "none")
      : (searchIconApp.style.display = "block");
  });
  searchUstensils.addEventListener("input", (event) => {
    searchTagsList(event, newData, "ustensils");
    event.target.value.length > 0
      ? (searchIconUst.style.display = "none")
      : (searchIconUst.style.display = "block");
  });

  //** Remove tag and update recipes */
  tagsWrapper.addEventListener("click", (event) => {
    if (event.target.tagName !== "SPAN") return; // Check if tag is clicked and not the container

    const item = event.target.textContent; // Get tag name
    newTag = newTag.filter((tag) => tag !== item); // Remove tag from array

    searchValue.length > 2
      ? (newData = filterRecipesBySearch(data, searchValue.toLowerCase())) // Filter by saearch value if active
      : (newData = filterRecipesByTags(data, newTag)); // Filter by tags if no search value

    displayRecipes(newData);
    displayTagsList(newData, newTag, "ingredients");
    displayTagsList(newData, newTag, "appliances");
    displayTagsList(newData, newTag, "ustensils");
  });

  //** Event for filter by tags */
  listOfIngredients.addEventListener("click", handleFilterClick);
  listOfAppliances.addEventListener("click", handleFilterClick);
  listOfUtensils.addEventListener("click", handleFilterClick);
  function handleFilterClick(event) {
    const item = event.target.textContent;
    createTag(item);

    newTag.push(item);

    newData = filterRecipesByTags(newData, newTag); // Filter by tags

    displayRecipes(newData);
    displayTagsList(newData, newTag, "ingredients");
    displayTagsList(newData, newTag, "appliances");
    displayTagsList(newData, newTag, "ustensils");
  }

  //** Filter by search bar */
  searchBar.addEventListener("input", (event) => {
    searchValue = event.target.value.toLowerCase();

    event.target.value.length > 2
      ? (newData = filterRecipesBySearch(
          data,
          event.target.value.toLowerCase()
        ))
      : (newData = [...data]);

    newData = filterRecipesByTags(newData, newTag);

    displayRecipes(newData);
    displayTagsList(newData, newTag, "ingredients");
    displayTagsList(newData, newTag, "appliances");
    displayTagsList(newData, newTag, "ustensils");
  });
}

App();
