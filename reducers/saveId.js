export default function(current ='', action){
    if(action.type == 'savedLike'){
        var currentI = action.idLiked;
        // console.log(currentI ,"waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        return currentI
    
    }else{
        return current
    }
}
