import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';

function FavoritesScreen ({navigation}) {
    return (

        <View style={{paddingTop: 10, paddingBottom:50, flex:1}}>

            <HeaderApp navigation={navigation}/>

            <TouchableOpacity style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:10 }} onPress={() => navigation.navigate("Map")}>
                <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
                <Text style={{marginLeft:5}}>Accueil</Text>
            </TouchableOpacity>

            <ScrollView>


                <Card style={{position:"absolute"}} image={require('../assets/background-home.jpg')}>
                    <View style={{display:"flex", flexDirection:"row", position:"relative", bottom:150, left:260}}>
                        <Ionicons name="md-share" size={24} color="#FFFFFF" />
                        <Ionicons style={{marginLeft:10}} name="md-heart" size={24} color="red" />
                    </View>        
                    <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                        <View style={{width:"50%"}}>
                            <Text style={{fontWeight:"bold", fontSize:18}}>Tour Eiffel</Text>
                            <Text style={{marginBottom:-3}}>9h - 19h</Text>
                            <Text>12€ ∼ 30min</Text>
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

                <Card style={{position:"absolute"}} image={require('../assets/background-home.jpg')}>
                    <View style={{display:"flex", flexDirection:"row", position:"relative", bottom:150, left:260}}>
                        <Ionicons name="md-share" size={24} color="#FFFFFF" />
                        <Ionicons style={{marginLeft:10}} name="md-heart" size={24} color="red" />
                    </View>        
                    <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                        <View style={{width:"50%"}}>
                            <Text style={{fontWeight:"bold", fontSize:18}}>Tour Eiffel</Text>
                            <Text style={{marginBottom:-3}}>9h - 19h</Text>
                            <Text>12€ ∼ 30min</Text>
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

                <Card style={{position:"absolute"}} image={require('../assets/background-home.jpg')}>
                    <View style={{display:"flex", flexDirection:"row", position:"relative", bottom:150, left:260}}>
                        <Ionicons name="md-share" size={24} color="#FFFFFF" />
                        <Ionicons style={{marginLeft:10}} name="md-heart" size={24} color="red" />
                    </View>        
                    <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                        <View style={{width:"50%"}}>
                            <Text style={{fontWeight:"bold", fontSize:18}}>Tour Eiffel</Text>
                            <Text style={{marginBottom:-3}}>9h - 19h</Text>
                            <Text>12€ ∼ 30min</Text>
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

            </ScrollView>
            <FooterApp navigation={navigation}/>
        </View>
    )
}

export default FavoritesScreen