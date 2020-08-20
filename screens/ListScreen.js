console.disableYellowBox = true;
import React, { useEffect , useState }from 'react';
import { Text, View ,StyleSheet ,Image,ScrollView,TouchableOpacity} from 'react-native';
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
    // const [infos,setInfos] = useState([]);
    const [tourList, setTourList] = useState([]);
    const [idArray,setIdArray] = ([]);
    const [visibleModal, setVisibleModal]= useState(false);
    const [filters, setFilters] = useState({
        categories : [{state: true,
            signification: "Monuments"},
           {state: true,
            signification: "Musées"},
          {state: true,
            signification: "Parcs et Jardins"}
          ],
        price: 50,
        showClosed: false
      });

    // useEffect(()=>{
    //     const info = async ()=>{
    //       await fetch("http://10.2.3.51:3000/info-tour")
    //         .then((res)=>res.json())
    //         .then((infoTour)=>setInfos(infoTour))
    //         .catch((err)=>console.log(err)) 
    //     }
    //     info()
    // },[])
    // useEffect(()=>{
    //     const info = async ()=>{
    //       await fetch("http://10.2.3.51:3000/info-tour")
    //         .then((res)=>res.json())
    //         .then((infoTour)=>setInfos(infoTour))
    //         .catch((err)=>console.log(err)) 
    //     }
    //     info()
    // },[])
    //  console.log(infos, "infossssss")

    var loader = []

    if(tourList.length == 0) {
        loader.push(
            <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Image source={require('../assets/load4.gif')} style={{marginTop:"40%"}}></Image>
            </View> 
        )
    }

    var infoDynamic = tourList.map((el, i)=>{

       return  <ListComponent tour={el} navigation={navigation} nameId = {el._id}/>
    })

    var userFilter = (obj, hideModal) => {
        setVisibleModal(hideModal);
        setFilters(obj)
    }

    useEffect( () => {

        let getToursWithFilters = async () => {

        const response = await fetch('http://10.2.3.51:3000/display-filtered-tours', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `categories=${JSON.stringify(filters.categories)}&price=${filters.price}&showClosed=${filters.showClosed}&title=${inputValue}`
        })
        
        const jsonResponseFilter = await response.json()
        setTourList(jsonResponseFilter.result) 
      }
      getToursWithFilters();
      }, [filters, inputValue])


return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <HeaderApp navigation={navigation}/>
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

        <TouchableOpacity style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:10 }}>
            <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
            <Text style={{marginLeft:5}} onPress={()=>navigation.navigate("Map")}>Accueil</Text>
        </TouchableOpacity>

        <ScrollView>
            {loader}
           {infoDynamic}
        </ScrollView>
        <FooterApp navigation={navigation}/>
        <Filter visible={visibleModal} userFilterParent={userFilter}/>
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



