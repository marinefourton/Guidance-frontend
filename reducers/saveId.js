export default function(current ='', action){
    if(action.type == 'savedLike'){
        var currentI = action.idLiked;
        return currentI
    
    }else{
        return current
    }
}
