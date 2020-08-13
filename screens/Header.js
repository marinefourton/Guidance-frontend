import React from "react";
import { Text, View, Image } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Header } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';


export default function HeaderApp({navigation}) {
  return (
        <Header backgroundColor="#4D3D84"
            leftComponent={<FontAwesome name="user-circle-o" size={24} color="white" onPress={() => navigation.navigate("Account")}/>}
            rightComponent={<Ionicons name="ios-chatboxes" size={24} color="white" />}
            centerComponent={<Image   style={{ height:"70%",width:"15%"}}  source={require("../assets/logo.png")}></Image> 
            }
            />
  );
}



