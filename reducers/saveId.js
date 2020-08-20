export default function(current ='', action){
    if(action.type == 'savedLike'){
<<<<<<< HEAD
        var current = action.idLiked;
        console.log(current ,"waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        return current
=======
        var currentI = action.idLiked;
        // console.log(currentI ,"waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        return currentI
>>>>>>> 628b007b4aeb4f3aab6f832b6ce1ba08ee628bf4
    
    }else{
        return current
    }
}
