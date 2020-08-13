export default function(score =0, action){
    console.log("je passe dans le reducer")
    if(action.type == 'reset'){
        console.log("je passe dans le reset")
        return action.score
    } else if (action.type =="saveNewScore"){
        console.log("je passe dans le update")
        return score+action.score
    } else {
        return score
    }
}