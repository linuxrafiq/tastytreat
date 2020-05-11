export const element = {
    searchForm:document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchRes:document.querySelector('.results'),
    searchResPages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shoping:document.querySelector('.shopping__list'),
    likeMenu:document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list')

}
/*
.loader {
  margin: 5rem auto;
  text-align: center; }
  .loader svg {
    height: 5.5rem;
    width: 5.5rem;
    fill: #F59A83;
    transform-origin: 44% 50%;
    animation: rotate 1.5s infinite linear; }

    @keyframes rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } }
*/
export const elementString = {
    loader:'loader' // class name that I used in renderLoader function
}
export const renderLoader = parent =>{
    const loader = `
    <div class='${elementString.loader}'>
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader=()=>{
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}