import { element } from "./base";

export const getInput = () => element.searchInput.value;
export const clearResults = () =>{
    element.searchResultList.innerHTML=``;
    element.searchResPages.innerHTML=``;
}
export const highlightSelected = id =>{
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el =>{
        el.classList.remove("results__link--active");
    });
    document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active')
}

export const clearInput = ()=> element.searchInput.value = "";

// 'Pasta with tomato and spinach' if you do not want to cut the word in half
//first itaration:
//acc:0 / acc +cur.length = 5 / newTitle = ['Pasta'];
//second itaration:
//acc:5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with'];
//third itaration:
//acc:9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato'];
//fourth itaration:
//acc:15 / acc + cur.length = 18(limit bound) / newTitle = ['Pasta', 'with', 'tomato'];

export const limitRecipeTitle = (title, limit=17)=>{
    const newTitle = [];
    if(title.length>limit){
        title.split(' ').reduce((acc, cur)=>{
            if(acc+cur.length <= limit){
                newTitle.push(cur);
            }
            return acc+cur.length;
        },0);
    }

    return `${newTitle.join(' ')} ...`
}
const renderRecipe = recipe =>{
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
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

const createButton = (page, type)=>`

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page-1 : page+1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left' : 'right'}}"></use>
    </svg>
    <span>Page ${type === 'prev'? page-1 : page+1}</span>
    </button>
`
const renderButtons = (page, numResults, resultPerPage)=>{
    const pages = Math.ceil(numResults/resultPerPage);
    let button;
    if(page == 1 && pages >1){
        //button to go to next page
        button = createButton(page, 'next');
    }else if(page<pages){
      //both buttons  
      button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}`;
      

    }
    else if (page === pages && pages > 1){
        //Only button to go to prev page
        button = createButton(page, 'prev');
    }

    element.searchResPages.insertAdjacentHTML('afterbegin', button);
}
export const renderResults = (recipes, page=1, resultPerPage=10) =>{
    /*//recipes.foreach(el=>renderRecipe(el))
    //or foreach will automatically call the render recipes
    //recipes.forEach(renderRecipe)*/
    const start = (page-1)*resultPerPage;
    const end = page * resultPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resultPerPage);
}