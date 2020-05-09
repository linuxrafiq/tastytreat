import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
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

  //const query = searchView.getInput();
  //testing
  const query = 'pizza';

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

//testing
window.addEventListener('load', event=>{
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
    state.recipe = new Recipe(id);
    //testing
    window.r = state.recipe;
    try {
      await state.recipe.getRecipe();
      state.recipe.calcTime();
      state.recipe.calcServings();
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
