import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FooterApp from '../screens/footer';


function PlanScreen ({navigation}) {

    var cloudinary = "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache-plan_qaaqxd.png"; 
    

    return (

        

            <View style={{flexDirection: "column", flex:1, justifyContent: "center", alignItems: "center"}}>
                <ScrollView>
                    <View>
                        <Text style={{marginLeft:"17%", marginTop:"30%", marginBottom:"2%", fontSize:20}}>Eglise de Saint-Eustache</Text>
                        <Text style={{marginLeft:"2%", marginBottom:"10%", fontSize:15, textAlign:"center"}}>Visite Guidée interieur</Text>
                        <Image source={{uri:'https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache-plan_qaaqxd.png'}} style={{height:500, width:350, marginLeft: 1}}/>
                        <Ionicons size={25} style={{zIndex: 1, position:"absolute", bottom:200, left: 280}} name="ios-radio-button-off" md="md-radio-button-off" color="#a2a1e5"/>
                        <Ionicons size={25} style={{zIndex: 1, position:"absolute", bottom:200, left: 180}} name="ios-radio-button-on" md="md-radio-button-on" color="#a2a1e5"/>
                        <Button type="solid" title= "Accédez au Quizz" onPress={() => navigation.navigate("Quizz")} style={{width:200, marginLeft:"21%", marginTop:"5%", color: "#FFFFFF"}}/>

                     </View>
                
                </ScrollView>     

      
                <FooterApp navigation={navigation}/>
            </View>
            
            
    )
}

export default PlanScreen;