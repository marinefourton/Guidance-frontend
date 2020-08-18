import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
import {connect} from "react-redux"

function BadgesScreen (props) {

    const [myBadges, setMyBadges]=useState([]);


    var badgesList = [
        { points:0 ,src:"../assets/badge-0-miles.jpg", name:"Beginner"},
        { points:50 ,src:"../assets/badge-50-miles.jpg", name:"Walker"},
        { points:100 ,src:"../assets/badge-100-miles.jpg", name:"Globe Trotter"},
        { points:200 ,src:"../assets/badge-200-miles.jpg", name:"Road Tripper"},
        { points:300 ,src:"../assets/badge-300-miles.jpg", name:"Backpacker"},
        { points:500 ,src:"../assets/badge-500-miles.jpg", name:"Explorer"},
        { points:700 ,src:"../assets/badge-700-miles.jpg", name:"Adventurer"},
        { points:1000 ,src:"../assets/badge-1000-miles.jpg", name:"Master Key"},
        { points:1250 ,src:"../assets/badge-1250-miles.jpg", name:"Magellan"},
        { points:1500 ,src:"../assets/badge-1500-miles.jpg", name:"World Traveller"},
        { points:2000 ,src:"../assets/badge-2000-miles.jpg", name:"Super Guider"}
    ];


    useEffect(()=>{
        async function calculPoint(){

            var rawResponse = await fetch (`http://10.2.3.6:3000/points-counter?token=${props.searchToken}`);
            var response = await rawResponse.json();
            var tempBadges = [];
            for (var i=0; i<badgesList.length ; i++) {
                if(response.points>=badgesList[i].points){
                    tempBadges.push(badgesList[i]);
                }else{
                    tempBadges.push({ points:badgesList[i].points ,src:"../assets/empty-badge.jpg", name:badgesList[i].name})
                }
            }
            setMyBadges(tempBadges);
        }calculPoint()
    },[]);


    // console.log('badges', myBadges);

    var displayBadges = [];

    var randomImages = [
        require('../assets/badge-0-miles.jpg'),
        require('../assets/badge-50-miles.jpg'),
        require('../assets/badge-100-miles.jpg'),
        require('../assets/badge-200-miles.jpg'),
        require('../assets/badge-300-miles.jpg'),
        require('../assets/badge-500-miles.jpg'),
        require('../assets/badge-700-miles.jpg'),
        require('../assets/badge-1000-miles.jpg'),
        require('../assets/badge-1250-miles.jpg'),
        require('../assets/badge-1500-miles.jpg'),
        require('../assets/badge-2000-miles.jpg'),
        require('../assets/empty-badge.jpg'),
        
    ];


            for (var i=0; i<myBadges.length; i++) {
                
                if(myBadges[i].src != "../assets/empty-badge.jpg"){
                    displayBadges.push(
                        <View style={{width:"33%", display:"flex", alignItems:"center", padding:5}}>
                            <Image source={randomImages[i]} style={{flex:1, resizeMode:"contain", width:100}}/>
                            <Text style={{marginTop:-20}}>{myBadges[i].name}</Text>
                            <Text style={{fontWeight:"bold"}}>{myBadges[i].points} miles</Text>
                        </View>
                )
                }else{
                    displayBadges.push(
                        <View style={{width:"33%", display:"flex", alignItems:"center", padding:5}}>
                            <Image source={randomImages[11]} style={{flex:1, resizeMode:"contain", width:100}}/>
                            <Text style={{marginTop:-20}}>{myBadges[i].name}</Text>
                            <Text style={{fontWeight:"bold"}}>{myBadges[i].points} miles</Text>
                        </View>
                    )
                }
            }
    
    
    return (

        <View style={{backgroundColor:"white", height:"100%", flex:1}}>

            <HeaderApp navigation={props.navigation}/>

            <TouchableOpacity style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:10 }} onPress={() => props.navigation.navigate("Map")}>
                <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
                <Text style={{marginLeft:5}}>Accueil</Text>
            </TouchableOpacity>

            <ScrollView>
                <View style={{width:"100%", height:"100%", display:'flex', flexDirection:'row', flexWrap: 'wrap', paddingBottom:55}}>
                {/* , justifyContent:"center" */}
                {displayBadges}
                    
                </View>    
            </ScrollView>

            <FooterApp navigation={props.navigation}/>

        </View>        
    )
}

const styles = StyleSheet.create({
    Map:{
        width:"100%",
        height:"100%"
    },
    header:{
        color:"#4D3D84",
        flex: 1,
        alignItems:"center"
    }

})
 


function mapStateToProps(state){
    return {
      searchToken: state.token
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(BadgesScreen)