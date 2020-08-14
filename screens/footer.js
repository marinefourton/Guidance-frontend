import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import HomeScreen from './SignInScreen';

export default function FooterApp({navigation}) {
  return (
    <View style={{zIndex:1, position:"absolute", bottom:"0%", width:"100%",backgroundColor: "#57508C", height: 50, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="md-compass" size={24} color="white" onPress={() => navigation.navigate("Map")} />
        <Text style={{ color: "white", fontSize: 11 }}>Explorer</Text>
      </View>
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="md-heart-empty" size={24} color="white" onPress={() => navigation.navigate("Favorites")} />
        <Text style={{ color: "white", fontSize: 11 }}>Favoris</Text>
      </View>
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="md-calendar" size={24} color="white" onPress={() => navigation.navigate("Reserve")} />
        <Text style={{ color: "white", fontSize: 11 }}>Visite</Text>
      </View>
      </View>
  );
}
