import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';


import { element, renderLoader, clearLoader, elementString } from './views/base';
import Likes from './models/Like';
/** Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};
window.state = state;
const controlSearch = async()=>{
  //Get the query from view
  const query = searchView.getInput();
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
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert(error);
      clearLoader();
    }

  }
}
//event listner to the parent object to delegate the event
element.searchForm.addEventListener('submit', event=>{
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
      recipeView.renderRecipe(state.recipe,
      state.likes.isLiked(id));
    } catch (error) {
      alert(error);
    }
  }
}
const controllList = () =>{
  //create a new list if there is none yet
  if (!state.list) state.list = new List();
  state.recipe.ingredients.forEach(el =>{
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  })
}
//Handle delete and update list item
element.shoping.addEventListener('click', e=>{
  const id = e.target.closest('.shopping__item').dataset.itemid;
  if(e.target.matches('.shopping__delete, .shopping__delete *')){
    state.list.deleteItem(id);
    listView.deleteItem(id);
  }else if (e.target.matches('.shoping__count-value')){
    const val = parseFloat( e.target.value);
    state.list.updateCount(id, val);
  }
});

//temporary for testing state.likes = new Like();
//state.likes = new Like();

const controllLike = () =>{
  if (!state.likes) state.likes = new Like();
  const currentId = state.recipe.id;
  if(!state.likes.isLiked(currentId)){
    const newLike = state.likes.addLike(currentId,
       state.recipe.title, state.recipe.author, state.recipe.img );
       likesView.toggleLikeBtn(true);
       likesView.renderLike(newLike);
       
  }else{
    state.likes.deleteLike(currentId);
    likesView.toggleLikeBtn(false);
    likesView.deleteLike(currentId);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
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
  if(e.target.matches('.btn-decrease, .btn-decrease *')){
    // decrease button clicked
    if(state.recipe.servings>1){
      state.recipe.updateServings('dec');
      recipeView.updateIngradients(state.recipe);
    }
    
  }if(e.target.matches('.btn-increase, .btn-increase *')){
    // increase button clicked
    state.recipe.updateServings('inc');
    recipeView.updateIngradients(state.recipe);

  }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
    controllList();
  }else if(e.target.matches('.recipe__love, .recipe__love *')){
    //Line controller
    controllLike();
  }
});

window.l = new List();