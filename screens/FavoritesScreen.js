import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
import {connect} from "react-redux";

function FavoritesScreen (props) {

    const [myFavorites, setMyFavorites] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [id,setId] = useState("");
    const [colored, setColored] = useState('red')


    useEffect(()=>{
        async function display(){

            var rawResponse = await fetch (`http://10.2.3.51:3000/search-favorites?token=${props.searchToken}`);
            var response = await rawResponse.json();
            var tempResponse = response
            setMyFavorites(tempResponse);
            setLoaded(true);
        }display()
    },[]);

    // console.log(myFavorites,"respoooooonse2")

    var redirectToGoogleMap = (lng, lat) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
          ios: `${scheme}${label}@${latLng}`,
          android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url); 
      }


      



    var displayFavorites = [];

  
    for (let i=0; i<myFavorites.length; i++){

        const handlePresse = async  () =>{
            await  fetch(`http://10.2.3.92:3000/send-favorites?token=${props.searchToken}&id=${myFavorites[i]._id}`)
             .then(resultat=>resultat.json())
             .then(res=>res)
             .catch(err=>console.log(err));
         } 
        // console.log(myFavorites[0].location);

        displayFavorites.push(

            <Card style={{position:"absolute"}} image={{uri:myFavorites[i].picture}}>
            <View style={{display:"flex", flexDirection:"row", position:"relative", bottom:150, left:260}}>
                <Ionicons name="md-share" size={24} color="#FFFFFF" />
                <Ionicons style={{marginLeft:10}} name="md-heart" size={24} color={colored} onPress={()=>{setColored('white'),handlePresse(),props.saveIdLiked(id)}}/>
            </View>         
            <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                <View style={{width:"50%"}}>
                    <Text style={{fontWeight:"bold", fontSize:18}}>{myFavorites[i].title.substr(0,1).toUpperCase()+myFavorites[i].title.substr(1)}</Text>
                    <Text style={{marginBottom:-3}}>{myFavorites[i].openingSynthesis}</Text>
                    <Text>{myFavorites[i].simpleprice}€ ∼ {myFavorites[i].duration}</Text>
                </View>
                <View style={{width:"50%",display:"flex", flexDirection:"row", marginTop:5, justifyContent:"flex-end"}}>
                    <View style={{display:"flex",alignItems:"center", margin:2}}>
                        <Ionicons name="md-pin" size={24} color="#57508C" 
                        onPress={() => redirectToGoogleMap(myFavorites[i].location.longitude, myFavorites[i].location.latitude)}
                        />
                        <Text style={{ fontSize: 13 }}> Itinéraire </Text>
                    </View>    
                    <View style={{display:"flex",alignItems:"center", margin:2}}>
                        <Ionicons name="md-people" size={24} color="#57508C" />
                        <Text style={{ fontSize: 13 }}> Groupes </Text>
                    </View>    
                    <View style={{display:"flex",alignItems:"center", margin:2}}>
                        <Ionicons name="md-play" size={24} color="#57508C" onPress={()=>{props.navigation.navigate("Visit"), props.searchIdMonument(myFavorites[i]._id)}} />
                        <Text style={{ fontSize: 13 }}> Visiter </Text>
                    </View> 
                </View>
            </View>            
        </Card>

        )
    }
    

    var conditionnalDisplay = [];
    
    if(isLoaded == false) {
        conditionnalDisplay.push (
            <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Image source={require('../assets/load4.gif')} style={{marginTop:"40%"}}></Image>
            </View> )
    } else if(displayFavorites.length > 0){
        conditionnalDisplay = displayFavorites
    }else if(displayFavorites.length == 0){

        conditionnalDisplay.push(
            <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Text style={{marginTop:100}}>
                    Vous n'avez pas encore enregistré de favoris
                </Text>
            </View>
        )
    }


    return (

        <View style={{paddingTop: 10, paddingBottom:50, flex:1, backgroundColor:"white"}}>

            <HeaderApp navigation={props.navigation}/>

            <TouchableOpacity style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:10 }} onPress={() => props.navigation.navigate("Map")}>
                <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
                <Text style={{marginLeft:5}}>Accueil</Text>
            </TouchableOpacity>

            <ScrollView>

            {conditionnalDisplay}
                

            </ScrollView>
            <FooterApp navigation={props.navigation}/>
        </View>
    )
}


function MapDispatchToProps(dispatch){
    return {
      searchIdMonument: function(argument){
        dispatch({type: 'selectVisit', idMonument: argument})
      },
      saveIdLiked: function(id){
        dispatch({type: "savedLike", idLiked:id})
    }

      }
  
  }


function mapStateToProps(state){
    return {
      searchToken: state.token
    }
  }
  
  export default connect(
    mapStateToProps,
    MapDispatchToProps
  )(FavoritesScreen)