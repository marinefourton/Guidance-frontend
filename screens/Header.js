import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Header } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';


export default function HeaderApp({navigation}) {

  const [colorChatIcon, setColorChatIcon] = useState("white");
  const [activeChat, setActiveChat] = useState(false);

  const [colorAccIcon, setColorAccIcon] = useState("white");
  const [activeAcc, setActiveAcc] = useState(false);


  if(navigation.state.routeName == "Account" && activeAcc == false) {
    setColorAccIcon("#32d2db")
    setActiveAcc(true)

  }else if(navigation.state.routeName == "Chat" && activeChat == false){
    setColorChatIcon("#32d2db")
    setActiveChat(true)
  }


  return (
        <Header backgroundColor="#4D3D84"
            leftComponent={<FontAwesome name="user-circle-o" size={24} color={colorAccIcon} onPress={() => navigation.navigate("Account")}/>}
            rightComponent={<Ionicons name="ios-chatboxes" size={24} color={colorChatIcon} onPress={() => navigation.navigate("Chat")}/>}
            centerComponent={<Image   style={{ height:"70%",width:"15%"}}  source={require("../assets/logo.png")}></Image> 
            }
            />
  );
}



