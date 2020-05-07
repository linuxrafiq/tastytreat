import Search from './models/Search'
import * as searchView from './views/searchView'
import { element } from './views/base';
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

    //Prepare UI for results

    //Search for recipes 
    await state.search.getResults();

    // render results on UI
    console.log(state.search.result );
  }
}
//event listner to the parent object to delegate the event
element.searchForm.addEventListener('submit', event=>{
  console.log("submit search");
  event.preventDefault();
  controlSearch();
});

