export default function(current ='', action){
    if(action.type == 'savedLike'){
        var current = action.idLiked;
        console.log(current ,"waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        return current
    
    }else{
        return current
    }
}
