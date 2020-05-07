import Search from './models/Search'
/** Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};
const controlSearch =()=>{
  //Get the query from view
  const query = 'pizza';
  if (query){
    // New search object and add to state
    state.search = new Search(query); 
  }
}
//event listner to the parent object to delegate the event
document.querySelector('.search').addEventListener('submit', event=>{
  event.preventDefault();
  controlSearch();
});
const search = new Search('pizza');
console.log(search);
console.log(search.getResults()); 