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
     
        const data = await fetch('http://10.2.3.25:3000/sign-in', {
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
        return(<Text style={{color:"#aaaaaa", marginLeft:"35%", marginBottom:"3%"}}>{error}</Text>)
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

          
            
          <KeyboardAvoidingView style={{width: "80%"}} behavior={"position"} enabled>

          <Image source={require('../assets/logo.png')} style={{width:100, height: 120, marginLeft:"32%"}}/>
            

            <Text style={{fontSize: 50, color: '#FFFFFF', marginLeft:"10%", marginBottom:"8%"}}> Guidance</Text>
          
            {/* {signIn} */}

            <Input  onChangeText={(e) => setSignInusermail(e)}  placeholder="email" />

            <Input onChangeText={(e) => setSignInuserpwd(e)} placeholder="mot de passe" />
            
            {tabErrorsSignin}

            <Button type="solid" title= "Connexion" onPress={() => handleSubmitSignin(token)}/>
            <Button title="Go to map" onPress={() => props.navigation.navigate("Map")}/>

            </KeyboardAvoidingView>
          

            
            <View style={{ marginTop:"10%", flexDirection : "row", justifyContent: "center", alignItems: "center"}}>

            <Text style={{color:"#aaaaaa"}}> Vous n'avez pas de compte ? </Text>
            <Button type="clear" title="Inscription" onPress={() => props.navigation.navigate("SignUp")}/>

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