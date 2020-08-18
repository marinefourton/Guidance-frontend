export default function(typeVisit ='', action){
    if(action.type === 'selectType'){
        var newtypeVisit = action.typeVisit
        return newtypeVisit
    
    }else{
        return typeVisit
    };
}