console.disableYellowBox = true;
import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, AsyncStorage } from 'react-native';
import {Button, Input} from 'react-native-elements';
import {connect} from 'react-redux';

function SignInScreen(props, token) {

  const [signInusermail, setSignInusermail] = useState('')
  const [signInuserpwd, setSignInuserpwd] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [tokenList, setTokenList] = useState('')//tableau de token 

  useEffect(() => {
    AsyncStorage.getItem("saveToken", (err, value) => {   
       
    
    if (value) {      
      setTokenList(value);  //enferme le token ds un tableau de token pour pouviiur avoir accesa e lensemble des tokens 
      props.addToken(value);//renvopi du token vers le store 
      props.navigation.navigate("Map")
     }
     
  })
}, []);

      var handleSubmitSignin = async () => {
     
        const data = await fetch('http://10.2.3.92:3000/sign-in', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `usermailFromFront=${signInusermail}&userpwdFromFront=${signInuserpwd}`
        } )
    
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
    

      return (
      
        <ImageBackground source={require('../assets/background-home.jpg')} style={{flex:1}}>
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>

          
            
          <View style={{width: "80%"}} behavior={"position"} enabled>

          <Image source={require('../assets/logo.png')} style={{width:100, height: 120, marginLeft:"32%"}}/>
            

            <Text style={{fontSize: 50, color: '#FFFFFF', marginLeft:"10%", marginBottom:"8%"}}> Guidance</Text>
          

            <Input inputStyle={{color:"white"}} onChangeText={(e) => setSignInusermail(e)}  placeholder="email" />

            <Input inputStyle={{color:"white"}} secureTextEntry={true} onChangeText={(e) => setSignInuserpwd(e)} placeholder="mot de passe" />
            
            {tabErrorsSignin}

            <Button buttonStyle={{ borderRadius: 20, backgroundColor: '#ffffff', width:"60%", marginTop:"8%", marginLeft:"auto", marginRight:"auto"}}type="solid" title="Connexion" titleStyle={{color:"#57508C"}} onPress={() => handleSubmitSignin(token)}/>

            </View>
          

            
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
  )(SignInScreen)