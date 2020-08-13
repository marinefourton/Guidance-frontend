console.disableYellowBox = true;
import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {Button, Input} from 'react-native-elements';
import {connect} from 'react-redux';



function SignUpScreen (props, token, saveToken) {

  const [signUpuserpseudo, setSignUpuserpseudo] = useState('')
  const [signUpusermail, setSignUpusermail] = useState('')
  const [signUpuserpwd, setSignUpuserpwd] = useState('')
  const [tokenList, setTokenList] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignup, setErrorsSignup] = useState([])

//   useEffect(() => {
//     AsyncStorage.getItem("saveToken", (err, value) => {   
       
//     console.log(value,"TempoToken")
    
//     if (value) {      
//       setTokenList(value);  
//      }
//       console.log(tokenList, "TokenLife")
     
//   })
// }, []);
// console.log(tokenList, "Test Hans")


    var handleSubmitSignup = async () => {
        console.log(signUpuserpseudo, "Pseudo")
    
        const data = await fetch('http://10.2.3.51:3000/sign-up', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `userpseudoFromFront=${signUpuserpseudo}&usermailFromFront=${signUpusermail}&userpwdFromFront=${signUpuserpwd}`
        })
    
        const body = await data.json()
        console.log(body, '')
    
        if(body.result == true){
          props.navigation.navigate("BottomNavigator"),
          props.addToken(body.token),
        
          AsyncStorage.setItem("saveToken", body.token); 
          setTokenList(body.token),
          setUserExists(true),
          console.log(body.token, 'BODYTOKEN')
          
        } else {
          setErrorsSignup(body.error)
        }
      }
      console.log(tokenList, "EtatTokenList?")

      
      //   if(userExists == true){
      //   return (<Text> Utilisateur déjà existant </Text>)
       
      // }
     
    
      var tabErrorsSignup = listErrorsSignup.map((error,i) => {
        return(<Text style={{marginLeft:"40%", marginBottom:"5%"}}>{error}</Text>)
      })

    return (
       <ImageBackground source={require('../assets/background-home.jpg')} style={{flex:1}}>
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>

        <KeyboardAvoidingView style={{width: "100%"}} behavior={"position"} enabled>

          <Image source={require('../assets/logo.png')} style={{width:100, height: 120, marginLeft:"37%"}}/>
            

            <Text style={{fontSize: 50, color: '#FFFFFF', marginLeft:"22%"}}> Inscription</Text>
          


            <Input onChangeText={(e)=> setSignUpuserpseudo(e)} placeholder="Pseudo" /> 

            <Input onChangeText={(e) => setSignUpusermail(e)}  placeholder="Mail" />

            <Input onChangeText={(e) => setSignUpuserpwd(e)} placeholder="Password" />
            
            {tabErrorsSignup}
          

            {/* <Button title="Go to map" onPress={() => navigation.navigate("BottomNavigator")}/> */}

            <View style={{flexDirection : "row", justifyContent: "center", alignItems: "center"}}>

            <Button type="solid" title= "Annuler" onPress={() => props.navigation.navigate("Home")} style={{width:120, marginLeft:"15%", marginBottom:"15%"}}/> 
            <Button type="solid" title= "Validation" onPress={() => handleSubmitSignup(token)} style={{width:100, marginLeft:"25%", marginBottom:"15%"}}/>
            </View>
            </KeyboardAvoidingView>

        </View>
        </ImageBackground>


    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF'
      

  }, 
  icon: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

  },
});




function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
     
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen)