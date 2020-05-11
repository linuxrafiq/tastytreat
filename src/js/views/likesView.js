import {element} from './base'

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
    console.log(iconString);
   document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
} 