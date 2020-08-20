import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
import {connect} from "react-redux";


function MonumentScreen (props) {

    const [infosMonument, setInfosMonument]=useState({});


    useEffect(()=>{
        async function display(){
            
            var rawResponse = await fetch (`http://10.2.3.51:3000/search-infos-monument?idMonument=${props.searchMonument}`);
            var response = await rawResponse.json();
            // console.log('--------------',response, '--------------MERCI')
            setInfosMonument(response);
        } display()
        
    },[]);
    

    // console.log(infosMonument.guide[0].type,infosMonument.guide[0].urlcouv);
    // console.log(infosMonument.guide[1].type,infosMonument.guide[1].urlcouv);
    // console.log(infosMonument.guide.length);

    var displayType = [];

    if(infosMonument.guide){
      if(infosMonument.guide.length === 1 && infosMonument.guide[0].type === "interieur"){
          displayType.push(
            <TouchableOpacity onPress={() => {props.navigation.navigate("Plan"), props.selectVisit('interieur')}}>
            <ImageBackground source={{uri:infosMonument.guide[0].urlcouv}} style={{resizeMode: "cover", justifyContent: "center", height:558}}>
            <View style={{backgroundColor:'black', height:'100%', opacity:0.4, position:'relative'}}></View>
            <Text style={{color:'#dbdbdb', fontSize:28, textTransform:"uppercase", textAlign:"center", position:'absolute', right:'29%', top:'45%'}}>Intérieur</Text>               </ImageBackground>
            </TouchableOpacity>
          );
      }else if(infosMonument.guide.length === 1 && infosMonument.guide[0].type === "exterieur"){
          displayType.push(
            <TouchableOpacity onPress={() => {props.navigation.navigate("Plan"), props.selectVisit('exterieur')}}>
            <ImageBackground source={{uri:infosMonument.guide[0].urlcouv}} style={{resizeMode: "cover", justifyContent: "center", height:558}}>
            <View style={{backgroundColor:'black', height:'100%', opacity:0.4, position:'relative'}}></View>
            <Text style={{color:'#dbdbdb', fontSize:28, textTransform:"uppercase", textAlign:"center", position:'absolute', right:'29%', top:'45%'}}>Extérieur</Text>   
            </ImageBackground>
            </TouchableOpacity>
          );
      }
      else if(infosMonument.guide.length === 2){
          displayType.push(
            <View style={{height:'100%'}}>
            <TouchableOpacity onPress={() => {props.navigation.navigate("Plan"), props.selectVisit('exterieur')}}>
            <ImageBackground source={{uri:infosMonument.guide[0].urlcouv}} style={{resizeMode: "cover", justifyContent: "center", height:271, marginBottom:15}}>
              <View style={{backgroundColor:'black', height:'100%', opacity:0.4, position:'relative'}}></View>
              <Text style={{color:'#dbdbdb', fontSize:28, textTransform:"uppercase", textAlign:"center", position:'absolute', right:'29%', top:'45%'}}>Extérieur</Text>   
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.navigation.navigate("Plan"), props.selectVisit('interieur')}}>
            <ImageBackground source={{uri:infosMonument.guide[1].urlcouv}} style={{resizeMode: "cover", justifyContent: "center", height:272}}>
            <View style={{backgroundColor:'black', height:'100%', opacity:0.4, position:'relative'}}></View>
            <Text style={{color:'#dbdbdb', fontSize:28, textTransform:"uppercase", textAlign:"center", position:'absolute', right:'29%', top:'45%'}}>Intérieur</Text>   
           
           </ImageBackground>
            </TouchableOpacity>
            </View>
          );
      }
    }


    return(
        <View style={{flex:1}}>
            
            <HeaderApp navigation={props.navigation}/>

            <TouchableOpacity style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:10, marginBottom:5 }} onPress={() => props.navigation.navigate("Map")}>
                <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
                <Text style={{marginLeft:5}}>Accueil</Text>
            </TouchableOpacity>
            
            {displayType}
            
            <FooterApp navigation={props.navigation}/>

        </View>
    
    )
}


function mapDispatchToProps(dispatch){
    return {
      selectVisit: function(type){
        dispatch({type: 'selectType', typeVisit: type})
      }
    }
  }

  function mapStateToProps(state){
    return {
      searchMonument: state.idMonument
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonumentScreen)