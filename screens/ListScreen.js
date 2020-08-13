console.disableYellowBox = true;
import React, { useEffect , useState }from 'react';
import { Text, View ,StyleSheet ,Image,ScrollView} from 'react-native';
import MapView , { Marker } from 'react-native-maps';
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';
import { Header ,SearchBar,ButtonGroup, withTheme,Button,Card} from "react-native-elements";
import  { Ionicons } from "react-native-vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 
import Filter from "../screens/FilterScreen";
import FooterApp from '../screens/footer';
import HeaderApp from "../screens/Header";


export default function List ({navigation}){
    const [inputValue,setInputValue] = useState("")
    const [color,setColor] = useState(false);
    const [info,setInfo] = useState([])

    useEffect(()=>{
        const info = async ()=>{
            await fetch("http://10.2.3.25:3000/info-tour",{method:"POST"})
            .then((res)=>res.json())
            .then((yes)=>setInfo(yes))
            
        }
        info()
    },[])
 
    console.log(info)


    return(
        <View style={{flex:1}}>
            <HeaderApp/>
        <View style={{margin:0,backgroundColor:"#636363",
        height:60, dispay:"flex", 
        justifyContent:"space-between", 
        alignItems:"center", 
        flexDirection:"row"}}>
        <View style={{display:"flex",
         flexDirection:"row",
         justifyContent:"space-between",
         widtht:"30%"}}>
             <Ionicons name="ios-options" size={24} color="white" style={{marginLeft:8}} onPress={()=>setVisibleModal(true)}/>
                <Text style={{color:"white",fontSize:20,marginLeft:8}}>Filtres</Text>
        </View>
                          <SearchBar  containerStyle= {{
                                                          height:38,width:"60%",marginRight:"-1%",backgroundColor:"transparent",borderBottomColor:"transparent",borderTopColor:"transparent"}} 
                                                          inputContainerStyle= {{ borderRadius:15,height:"100%",backgroundColor:"white",marginTop:"-3%"}}
                                                          inputStyle={{height:100}}
                                placeholder="Ville,monument ..." 
                                onChangeText={(value)=>setInputValue(value)} value={inputValue}>
                           </SearchBar>  
       </View>

        <View style={{paddingTop: 10, paddingBottom:50, flex:1}}>

        <View style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:25 }}>
            <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
            <Text style={{marginLeft:5}}>Accueil</Text>
        </View>

        <ScrollView>
            <Card style={{position:"absolute"}} image={{uri:"https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/louvre_pird42.jpg"}}>
                <View style={{display:"flex", flexDirection:"row", position:"relative", bottom:150, left:260}}>
                    <Ionicons name="md-share" size={24} color="#FFFFFF" />
                    <Ionicons style={{marginLeft:10}} name="md-heart" size={24} color="white" />
                </View>        
                <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                    <View style={{width:"50%"}}>
                        <Text style={{fontWeight:"bold", fontSize:18}}>.title</Text>
                        <Text style={{marginBottom:-3}}>.hours</Text>
                        <Text>.price</Text>
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