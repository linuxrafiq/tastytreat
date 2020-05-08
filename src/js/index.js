import Search from './models/Search'
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

  const query = searchView.getInput();
  console.log(query);
  if (query){
    // New search object and add to state
    state.search = new Search(query); 
    searchView.clearResults();
    //Prepare UI for results
    searchView.clearInput();
    //Search for recipes 
    renderLoader(element.searchRes);
    await state.search.getResults();

    // render results on UI
    clearLoader();
    console.log(state.search.result );
    searchView.renderResults(state.search.result);
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
  console.log('btnclicke');
  const btn = e.target.closest('.btn-inline');
  console.log('btnclicke1');
  if(btn){
    
    console.log('btnclicke2');
    const goToPage = parseInt(btn.dataset.goto, 10);//base 10
    searchView.clearResults();
    console.log('goToPage'+btn.dataset.goto);
    searchView.renderResults(state.search.result, goToPage);
    console.log('btnclicke4');

  }
});

