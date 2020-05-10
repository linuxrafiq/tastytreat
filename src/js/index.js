import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'

import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { element, renderLoader, clearLoader } from './views/base';
/** Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};

const controlSearch = async()=>{
  //Get the query from view
  console.log("controll search");

  const query = searchView.getInput();
  //testing

  console.log(query);
  if (query){
    // New search object and add to state
    state.search = new Search(query); 
    searchView.clearResults();
    //Prepare UI for results
    searchView.clearInput();
    //Search for recipes 
    renderLoader(element.searchRes);
    try {
      await state.search.getResults();
      // render results on UI
      clearLoader();
      console.log(state.search.result );
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert(error);
      clearLoader();
    }

  }
}
//event listner to the parent object to delegate the event
element.searchForm.addEventListener('submit', event=>{
  console.log("submit search");
  event.preventDefault();
  controlSearch();
});


element.searchResPages.addEventListener('click', e=>{
  //Starting with the Element itself, the closest() method traverses parents (heading toward the document root) of the Element until it finds a node that matches the provided selectorString. Will return itself or the matching ancestor. If no such element exists, it returns null.
  const btn = e.target.closest('.btn-inline');
  if(btn){
    const goToPage = parseInt(btn.dataset.goto, 10);//base 10
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

const controlRecipe = async ()=>{
  const id = window.location.hash.replace('#','');
  if(id){
    //console.log(id);
    recipeView.clearRecipe();
    renderLoader(element.recipe);
    if(state.search){
      searchView.highlightSelected(id);
    }
    state.recipe = new Recipe(id);
    //testing
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      clearLoader();
      recipeView.renderRecipe(state.recipe);
      console.log(state.recipe);
    } catch (error) {
      alert(error);
    }
  }
}
/**
 * window.addEventListener('hashchange', controlRecipe);
  window.addEventListener('load', controlRecipe);
 can be written as
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

 */

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
//Handling recipe button clicks
element.recipe.addEventListener('click', e=>{
  console.log(e.target);
  console.log(e.target.matches);
  if(e.target.matches('.btn-decrease, .btn-decrease *')){
    // decrease button clicked
    if(state.recipe.servings>1){
      console.log("decrease");
      state.recipe.updateServings('dec');
      recipeView.updateIngradients(state.recipe);
    }
    
  }if(e.target.matches('.btn-increase, .btn-increase *')){
    // increase button clicked
    console.log("increase");

    state.recipe.updateServings('inc');
    recipeView.updateIngradients(state.recipe);

  }else if(e.target.matches('.recipe_btn--add, .recipe_btn--add *')){
    
  }
  console.log(state.recipe);
});

window.l = new List();