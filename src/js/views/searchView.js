import { element } from "./base";

export const getInput = () => element.searchInput.value;
export const clearResults = () =>element.searchResultList.innerHTML=`<div></div>`
export const clearInput = ()=> element.searchInput.value = "";
const renderRecipe = recipe =>{
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = markup;
    element.searchResultList.insertAdjacentElement('beforeend',htmlObject);
}
export const renderResults = recipes =>{
    //recipes.foreach(el=>renderRecipe(el))
    //or foreach will automatically call the render recipes
    recipes.forEach(renderRecipe)
}