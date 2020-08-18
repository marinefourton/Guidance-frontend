import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
import {connect} from "react-redux";

function FavoritesScreen (props) {

    const [myFavorites, setMyFavorites] = useState([])

    useEffect(()=>{
        async function display(){

            var rawResponse = await fetch (`http://10.2.3.6:3000/search-favorites?token=${props.searchToken}`);
            var response = await rawResponse.json();
            var tempResponse = response
            setMyFavorites(tempResponse);
        }display()
    },[]);

    // console.log(myFavorites,"respoooooonse2")

    var displayFavorites = [];

    for (var i=0; i<myFavorites.length; i++){


        displayFavorites.push(

            <Card style={{position:"absolute"}} image={{uri:myFavorites[i].picture}}>
            <View style={{display:"flex", flexDirection:"row", position:"relative", bottom:150, left:260}}>
                <Ionicons name="md-share" size={24} color="#FFFFFF" />
                <Ionicons style={{marginLeft:10}} name="md-heart" size={24} color="red" />
            </View>         
            <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                <View style={{width:"50%"}}>
                    <Text style={{fontWeight:"bold", fontSize:18}}>{myFavorites[i].title.substr(0,1).toUpperCase()+myFavorites[i].title.substr(1)}</Text>
                    <Text style={{marginBottom:-3}}>{myFavorites[i].hours}</Text>
                    <Text>{myFavorites[i].simpleprice}€ ∼ {myFavorites[i].duration}</Text>
                </View>
                <View style={{width:"50%",display:"flex", flexDirection:"row", marginTop:5, justifyContent:"flex-end"}}>
                    <View style={{display:"flex",alignItems:"center", margin:2}}>
                        <Ionicons name="md-pin" size={24} color="#57508C" />
                        <Text style={{ fontSize: 13 }}> Itinéraire </Text>
                    </View>    
                    <View style={{display:"flex",alignItems:"center", margin:2}}>
                        <Ionicons name="md-people" size={24} color="#57508C" />
                        <Text style={{ fontSize: 13 }}> Groupes </Text>
                    </View>    
                    <View style={{display:"flex",alignItems:"center", margin:2}}>
                        <Ionicons name="md-play" size={24} color="#57508C" />
                        <Text style={{ fontSize: 13 }}> Visiter </Text>
                    </View> 
                </View>
            </View>            
        </Card>

        )
    }

    var conditionnalDisplay = [];
    
    
    if(displayFavorites.length != 0){
        conditionnalDisplay = displayFavorites
    }else{
        conditionnalDisplay.push(
            <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Text style={{marginTop:100}}>
                    Vous n'avez pas encore enregistré de favoris
                </Text>
            </View>
        )
    }



    return (

        <View style={{paddingTop: 10, paddingBottom:50, flex:1}}>

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

function mapStateToProps(state){
    return {
      searchToken: state.token
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(FavoritesScreen)