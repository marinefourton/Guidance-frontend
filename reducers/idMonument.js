export default function(idMonument ='', action){
    if(action.type == 'selectVisit'){
        var newIdMonument = action.idMonument;
        return newIdMonument
    
    }else{
        return idMonument
    }
}
