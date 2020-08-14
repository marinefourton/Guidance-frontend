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
import  ListComponent from "../screens/listComponent";
import {connect} from "react-redux"


export default function List ({navigation}){
    const [inputValue,setInputValue] = useState("")
    const [color,setColor] = useState(false);
    const [infos,setInfos] = useState([]);
    const [idArray,setIdArray] = ([]);

    useEffect(()=>{
        const info = async ()=>{
          await fetch("http://10.2.3.25:3000/info-tour")
            .then((res)=>res.json())
            .then((infoTour)=>setInfos(infoTour))
            .catch((err)=>console.log(err)) 
        }
        info()
    },[])
    //  console.log(infos)
    var infoDynamic = infos.map((el, i)=>{
        var id = el._id
       return  <ListComponent nameId = {id}/>
    })



return (
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
           {infoDynamic}
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



