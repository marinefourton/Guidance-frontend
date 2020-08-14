import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
import {connect} from "react-redux";

function MonumentScreen (props) {

    const [infosMonument, setInfosMonument]=useState();


    useEffect(()=>{
        async function display(){
            
            var rawResponse = await fetch ("http://10.2.3.92:3000/search-infos-monument");
            var response = await rawResponse.json();
            setInfosMonument(response);
        } display()
    },[]);



    // if(infosMonument != undefined){
    // if(infosMonument.guide.lenght=1 && infosMonument.guide[0].type === "interieur"){
    //     return(<View><Text>intérieur OK</Text></View>);
    // }else if(infosMonument.guide.lenght=1 && infosMonument.guide[0].type === "exterieur"){
    //     return(<View style={{marginTop:500}} ><Text>extérieur OK</Text></View>);
    // }
    // else if(infosMonument.guide.lenght=2){
    //     return(<View><Text>Hello</Text></View>);
    // }
    // }


    return(
        <View style={{flex:1}}>
            
            <HeaderApp navigation={props.navigation}/>

            <TouchableOpacity style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:10 }} onPress={() => props.navigation.navigate("Map")}>
                <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
                <Text style={{marginLeft:5}}>Accueil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {props.navigation.navigate("Map"), props.selectVisit('exterieur')}}>
            <Card image={{uri:'https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache_gqcint.jpg'}}>       
                <Text style={{fontWeight:"bold", fontSize:18, textTransform:"uppercase", textAlign:"center"}}>Extérieur</Text>   
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {props.navigation.navigate("Map"), props.selectVisit('interieur')}}>
            <Card image={{uri:'https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache-interieur_cludef.jpg'}}>     
                <Text style={{fontWeight:"bold", fontSize:18, textTransform:"uppercase", textAlign:"center"}}>Intérieur</Text>   
            </Card>
            </TouchableOpacity>

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
  
  export default connect(
    null,
    mapDispatchToProps
  )(MonumentScreen)