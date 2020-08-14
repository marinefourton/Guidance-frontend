export default function(typeVisit ='', action){
    if(action.type === 'selectType'){
        var newtypeVisit = action.typeVisit
        console.log(newtypeVisit, "type de visite")
        return newtypeVisit
    
    }else{
        return typeVisit
    };
}