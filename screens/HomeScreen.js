console.disableYellowBox = true;
import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {Button, Input} from 'react-native-elements';
import {connect} from 'react-redux';

function HomeScreen(props, token) {

  const [signInusermail, setSignInusermail] = useState('')
  const [signInuserpwd, setSignInuserpwd] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [tokenList, setTokenList] = useState('')

  useEffect(() => {
    AsyncStorage.getItem("saveToken", (err, value) => {   
       
    console.log(value,"TempoToken")
    
    if (value) {      
      setTokenList(value);  
      props.addToken(value);
      props.navigation.navigate("Map")
     }
      console.log(tokenList, "TokenLife")
     
  })
}, []);
console.log(tokenList, "Test Hans")

      var handleSubmitSignin = async () => {
     
        const data = await fetch('http://10.2.3.51:3000/sign-in', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `usermailFromFront=${signInusermail}&userpwdFromFront=${signInuserpwd}`
        })
    
        const body = await data.json();
        
    
        if(body.result == true){
          props.addToken(body.token),
          AsyncStorage.setItem("saveToken", body.token); 
          setTokenList(body.token),
          setUserExists(true)
          props.navigation.navigate("Map")
          
        }  else {
          setErrorsSignin(body.error)
        }
      }
    
      var tabErrorsSignin = listErrorsSignin.map((error,i) => {
        return(<Text style={{marginLeft:"40%", marginBottom:"5%"}}>{error}</Text>)
      })
    
      // var Labas = function(props){
      //   props.navigation.navigate("Map")
      // }; 
      // var signIn; 
      // if(!tokenList){
      //   signIn =
      //   <View>
      //   <Input onChangeText={(e) => setSignInusermail(e)}  placeholder="usermail" />
      //   <Input onChangeText={(e) => setSignInuserpwd(e)} placeholder="userpwd" />
      //   </View>
      // } else {
      //   Labas; 
        // signIn = <Text style={{margin: 25, color:"#FF0000",textAlign: "center", fontSize: 20}}>Welcome back {signInusermail}!</Text>
      // }

    return (
      
        <ImageBackground source={require('../assets/background-home.jpg')} style={{flex:1}}>
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>

          
            
          <KeyboardAvoidingView style={{width: "100%"}} behavior={"position"} enabled>

          <Image source={require('../assets/logo.png')} style={{width:100, height: 120, marginLeft:"37%"}}/>
            

            <Text style={{fontSize: 50, color: '#FFFFFF', marginLeft:"22%"}}> Guidance</Text>
          
            {/* {signIn} */}

            <Input  onChangeText={(e) => setSignInusermail(e)}  placeholder="usermail" />

            <Input onChangeText={(e) => setSignInuserpwd(e)} placeholder="userpwd" />
            
            {tabErrorsSignin}

            <Button type="solid" title= "Connexion" onPress={() => handleSubmitSignin(token)} style={{width:120, marginLeft:"35%", color: "#FFFFFF"}}/>
            <Button title="Go to map" onPress={() => props.navigation.navigate("Map")}/>

            </KeyboardAvoidingView>
          

            
            <View style={{flexDirection : "row", justifyContent: "center", alignItems: "center"}}>

            <Text> Vous n'avez pas de compte ? </Text>
            <Button type="clear" style={{width: "100%"}} title="Inscription" onPress={() => props.navigation.navigate("SignUp")}/>

            </View>

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
        textShadowColor: '#FFFFFF'
        

    }, 
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
  });

  // function mapStateToProps(state){
  //   return {token: state.token}
  // }
  
  // export default connect(
  //   null,
  //   mapStateToProps
  // )(HomeScreen)

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
  )(HomeScreen)