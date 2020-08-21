export default function(score =0, action){
    if(action.type == 'reset'){
        return action.score
    } else if (action.type =="saveNewScore"){
        return score+action.score
    } else {
        return score
    }
}