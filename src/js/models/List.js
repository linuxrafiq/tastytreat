import uniqid from 'uniquid'
export default class List{
    constructor(){
       this.items = []; 
    }

    addItem(count, unit, ingredient){
        const item = {
            id:uniqid(),
            count,
            unit,
            ingredient
        }
    }

    deleteItem(id){
        const index = this.items.findIndex(el=>el.id === id);
        //splice[startPos,totalElement]  
        //[2,4,8] splice[1,1]// it will start from position 1 and remove only one element starting from  position 1
        //return 4 onrignal array will become [2,8]
        return this.items.splice(index, 1)
    }

    updateCount(id, newCount){
        this.items.find(el=>el.id===id).count = newCount;
    }
}