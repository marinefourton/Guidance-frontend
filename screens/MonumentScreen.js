import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';

function MonumentScreen ({navigation}) {

    const [infosMonument, setInfosMonument]=useState();


    useEffect(()=>{
        async function display(){
            
            var rawResponse = await fetch ("http://10.2.3.92:3000/search-infos-monument");
            var response = await rawResponse.json();
            // console.log("response-----------------",response);
            setInfosMonument(response);
        } display()
    },[]);

    console.log("response-----------------",infosMonument)

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
            
            <HeaderApp navigation={navigation}/>

            <View style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:10 }}>
                <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
                <Text style={{marginLeft:5}}>Accueil</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <Card image={{uri:'https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache_gqcint.jpg'}}>       
                <Text style={{fontWeight:"bold", fontSize:18, textTransform:"uppercase", textAlign:"center"}}>Extérieur</Text>   
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <Card image={{uri:'https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache-interieur_cludef.jpg'}}>     
                <Text style={{fontWeight:"bold", fontSize:18, textTransform:"uppercase", textAlign:"center"}}>Intérieur</Text>   
            </Card>
            </TouchableOpacity>

            <FooterApp navigation={navigation}/>

        </View>
    
    )
}

export default MonumentScreen