import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar"

export default function(token ='', action){
    if(action.type == 'addToken'){
        // console.log(action.token, "TOKENREDUCER")
        return action.token
    
    }else{
        return token
    }
}