import Search from './models/Search'
/** Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};
const controlSearch = async()=>{
  //Get the query from view
  const query = 'pizza';
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
document.querySelector('.search').addEventListener('submit', event=>{
  event.preventDefault();
  controlSearch();
});
