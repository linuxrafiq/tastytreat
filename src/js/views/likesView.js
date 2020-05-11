import {element} from './base'
import {limitRecipeTitle} from './searchView'
export const toggleLikeBtn = isLiked =>{
    /**
     * <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button> 
     */
    const iconString = isLiked ? 'icon-heart':'icon-heart-outlined';
    //selecting recipe__love first then pikeing the child use element
   document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
} 

export const toggleLikeMenu = numLikes =>{
    console.log(element.likeMenu);
    element.likeMenu.style.visibility = numLikes >0 ? 'visible':'hidden';
}

export const renderLike = like =>{
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = markup;
    element.likesList.insertAdjacentElement('beforeend', htmlObject);
}

export const deleteLike = id =>{
    const el = document.querySelector(`.likes__link[href*="#${id}"`).parentElement;
    if(el){
        el.parentElement.removeChild(el);
    }
    
}