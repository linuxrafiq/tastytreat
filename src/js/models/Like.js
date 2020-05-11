export default class Likes{
    constructor(){
        this.likes=[];
    }

    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like);
        //persist the data in local stroge
        this.persistData();
        return like;
    }
    deleteLike(id){
        const index = this.likes.findIndex(el=>el.id===id);
        this.likes.splice(index, 1);
        //persist the data in local stroge
        this.persistData();

    }
    
    isLiked(id){
        return (this.likes.findIndex(el=>el.id===id)) !== -1
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStroge(){
        const stroge = JSON.parse(localStorage.getItem('likes'));
        if(stroge){
            this.likes = stroge;
        }
    }
}