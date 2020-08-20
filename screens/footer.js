import React, { useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function FooterApp({navigation}) {

  const [colorMapIcon, setColorMapIcon] = useState("white");
  const [colorMapText, setColorMapText] = useState({ color: "white", fontSize: 11 });
  const [activeMap, setActiveMap] = useState(false);

  const [colorFavIcon, setColorFavIcon] = useState("white");
  const [colorFavText, setColorFavText] = useState({ color: "white", fontSize: 11 });
  const [activeFav, setActiveFav] = useState(false);

  const [colorResIcon, setColorResIcon] = useState("white");
  const [colorResText, setColorResText] = useState({ color: "white", fontSize: 11 });
  const [activeRes, setActiveRes] = useState(false);


  if(navigation.state.routeName == "Map" && activeMap == false) {
    setColorMapText({ color: "#D9C8F7", fontSize: 11 })
    setColorMapIcon("#D9C8F7")
    setActiveMap(true)

  }else if(navigation.state.routeName == "Favorites" && activeFav == false){
    setColorFavText({ color: "#D9C8F7", fontSize: 11 })
    setColorFavIcon("#D9C8F7")
    setActiveFav(true)

  }else if(navigation.state.routeName == "Reserve" && activeRes == false){
    setColorResText({ color: "#D9C8F7", fontSize: 11 })
    setColorResIcon("#D9C8F7")
    setActiveRes(true)
  }

  return (
    <View style={{zIndex:1, position:"absolute", bottom:"0%", width:"100%",backgroundColor: "#57508C", height: 50, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
      <TouchableOpacity style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:5}} onPress={() => navigation.navigate("Map")}>
        <Ionicons name="md-compass" size={24} color={colorMapIcon} />
        <Text style={colorMapText}>Explorer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:5 }} onPress={() => navigation.navigate("Favorites")}>
        <Ionicons name="md-heart-empty" size={24} color={colorFavIcon}  />
        <Text style={colorFavText}>Favoris</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:5 }} onPress={() => navigation.navigate("Reserve")}>
        <Ionicons name="md-calendar" size={24} color={colorResIcon} />
        <Text style={colorResText}>Visites</Text>
      </TouchableOpacity>
      </View>
  );
}

