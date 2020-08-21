console.disableYellowBox = true;
import React, { useEffect , useState }from 'react';
import { Text, View ,StyleSheet ,Image,Modal,TouchableOpacity,Linking, ScrollView} from 'react-native';
import MapView , { Marker } from 'react-native-maps';
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';
import { Header ,SearchBar,ButtonGroup, withTheme,Button,Card} from "react-native-elements";
import  { Ionicons } from "react-native-vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 
import Filter from "../screens/FilterScreen";
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
import  ListComponent from "../screens/listComponent";
import MarkerComponent from "../screens/MarkerComponent";
import { connect } from "react-redux";
import SwitchButton from 'switch-button-react-native';

function MapScreen (props) {

  // ETATS
    const [latitude,setLatitude] = useState(48.866667);
    const [longitude,setLongitude] = useState(2.333333);
    const [inputValue,setInputValue] = useState("")

    const [selectedIndex,setSelectedIndex] = useState(1);
    const defaultFilterVal  = {
      categories : [{state: true,
          signification: "Monuments"},
         {state: true,
          signification: "Musées"},
        {state: true,
          signification: "Parcs et Jardins"}
        ],
      price: 50,
      showClosed: false
    }
    const [filters, setFilters] = useState(defaultFilterVal);
    const [visibleModal, setVisibleModal]= useState(false);
    const [tourList, setTourList] = useState([]);
    const [modalVisible,setModalVisible] = useState(false);
    const [name,setName] = useState("");
    const [hours,setHours] = useState(0);
    const [monument,setMonument] =  useState(0);
    const [id,setId] = useState("");
    const [duration,setDuration] = useState(0)
    const [color,setColor] = useState(false);
    const [latitudeItineraire,setLatitudeItineraire] = useState(0)
    const [longitudeItineraire,setlongitudeItineraire] = useState(0)
    const [picture, setPicture] = useState("");
    const [idArray,setIdArray] = ([]);
    const buttons = ["Carte","Liste"]
    const [listIdFavorites,setListIdFavorites] = useState([]);

// Fonction reverseDataFlow
    var userFilter = (obj, hideModal) => {
        setVisibleModal(hideModal);
        obj = !obj ? {...defaultFilterVal} : {...obj}
        setFilters(obj)
    }

    
    var displayModal = (val) => {
      setVisibleModal(val);
  }
// USEEFFECT PERMISSION LOCALISATION
    useEffect(() => {
        const ask = async ()=>{
             let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if(status === "granted"){
             var location = await  Location.getCurrentPositionAsync({})
             setLatitude(location.coords.latitude)
             setLongitude(location.coords.longitude)
            }
        }
     ask()
        }, [])

// USEEFFECT DES FILTRES
    useEffect( () => {

        let getToursWithFilters = async () => {

        const response = await fetch('http://10.2.3.92:3000/display-filtered-tours', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `categories=${JSON.stringify(filters.categories)}&price=${filters.price}&showClosed=${filters.showClosed}&title=${inputValue}`
        })
        
        const jsonResponseFilter = await response.json()
        setTourList(jsonResponseFilter.result) 
      }
      getToursWithFilters();
      }, [filters, inputValue])


var loader = []

if(tourList.length == 0) {
    loader.push(
        <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Image source={require('../assets/load4.gif')} style={{marginTop:"40%"}}></Image>
        </View> 
    )
}


const handlePresse = async  () =>{
  await  fetch(`http://10.2.3.92:3000/send-favorites?token=${props.searchToken}&id=${id}`)
   .then(resultat=>resultat.json())
   .then(res=>setListIdFavorites(res.listFavId))
   .catch(err=>console.log(err));
} 


var infoDynamic = tourList.map((el, i)=>{
  var exist = false 
  if(listIdFavorites.find(e => e ==  el._id)){
    var exist = true
  } 
   return  <ListComponent tour={el} navigation={props.navigation} nameId = {el._id} arrayId = {listIdFavorites} leId = {id} vrai={exist} />
})

var userFilter = (obj, hideModal) => {
    setVisibleModal(hideModal);
    setFilters(obj)
}

  // Boucle marker 
  
  let markerList = tourList.map((tour, i) => {
    let color
    switch (tour.category) {
      case "Monuments" : color="orange"; break;
      case "Musées" : color="blue"; break;
      case "Parcs et Jardins" : color="green"; break;     
      default : color="red"
    }

    const handleClick = (title,hours,price,id,duration,picture)=>{
        setName(title.substr(0,1).toUpperCase()+title.substr(1))
        setHours(hours)
        setDuration(duration)
        setMonument(`${price}€ ∼${duration} `) 
        setId(id)
        setPicture(picture)
       }

       //console.log(picture);


   var handleItineraire = (latitude,longitude) =>{
    setLatitudeItineraire(latitude)
    setlongitudeItineraire(longitude)

  }

      return (
        <MarkerComponent index={i} color={color} tour={tour} tourid ={tour._id} latitude={latitude} longitude={longitude} modal = {modalVisible} setModal = {setModalVisible}
        handleClickParent = {handleClick}
        handleClickParentItineraire={handleItineraire}
         />
      )})

      var redirectToGoogleMap = (lng, lat) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
          ios: `${scheme}${label}@${latLng}`,
          android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url); 
      }

    var colored = "black"
    var nom = "md-heart-empty"



       if(!color){
       colored = "red"
       nom = "md-heart"
      }





    // switch button
  
  if(selectedIndex == 2){
    var displayMapList = (

      <View style={{paddingTop: 55, paddingBottom:200}}>
  <ScrollView>
      {loader}
     {infoDynamic}
  </ScrollView>
    </View>


    )
  }else if(selectedIndex == 1){
    var displayMapList = (

       <MapView index={20} style={styles.Map} mapType="standard" region={{latitude:latitude,longitude:longitude, latitudeDelta:0.1, longitudeDelta:0.1}}>
         {markerList}
         <Marker coordinate={{
           latitude:latitude,
           longitude:longitude,
           latitudeDelta:latitude,
           longitudeDelta:longitude
           }}
           image={require("../assets/man.png")}
           title="Vous êtes ici"/>
       </MapView>   
   )
  }


    return (

       <View style={{flex:1}}>

        <HeaderApp navigation={props.navigation}/>
                       
        <View style={{marginTop:-1,backgroundColor:"#636363",
            height:60, dispay:"flex", 
            justifyContent:"space-between", 
            alignItems:"center", 
            flexDirection:"row"}}>
            <View style={{display:"flex",
             flexDirection:"row",
             justifyContent:"space-between",
             widtht:"30%",
             }}>
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

          
         <View style={{ position:"absolute", marginTop:"45%",  left:"7%", zIndex: 10}}>
          
          <View style={{marginLeft:7}}>
        <SwitchButton
            onValueChange={(val) => setSelectedIndex(val)}      
            text1 = 'Carte'                 
            text2 = 'Liste'                    
            switchWidth = {300}                
            switchHeight = {40}                 
            switchdirection = 'ltr'             
            switchBorderRadius = {100}          
            switchSpeedChange = {200}
            switchBackgroundColor = '#fff'           
            btnBorderColor = "#57508C"
            btnBackgroundColor = "#57508C"          
            fontColor = '#b1b1b1'               
            activeFontColor = '#fff' 
            marginTop={30}
        />
      </View>
        </View>
      
          {displayMapList}
       

        <FooterApp navigation={props.navigation}/>
                <Modal  animationType="slide" visible={modalVisible} transparent={true} style={{position:"relative"}} >
                      <View style = {styles.modalView}>
                        <TouchableOpacity   style={{ position:"absolute",right:20,top:10}}>
                                <Ionicons 
                              name="ios-close" 
                              size={36} 
                              color="black" 
                              position="absolute"
                              onPress={() => setModalVisible(false)}
                            />
                        </TouchableOpacity>
                          <View style={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop:10, marginBottom:10}}>
                            <Image source={{uri:picture}} style={{height:70, marginTop:"auto", width:70, borderRadius:50, marginLeft:"2%"}}></Image>
                            <View style={{display:"flex", justifyContent:"center", marginTop:25, paddingLeft:10}}>
                              <Text style={{fontSize:21, marginBottom:5}}>{name}</Text>
                              <Text>{hours}</Text>
                              <Text>{monument}</Text>
                            </View>
                          </View>

                                  <View style={{display:"flex", flexDirection:"row", position:"absolute", left:30, top:20}}>
                                       <Ionicons  name={nom} size={24} color={colored} onPress={()=>{setColor(!color),handlePresse()}}/>
                                       <Ionicons  style={{marginLeft:10}}  name="md-share" size={24} color="#262626" />
                                  </View> 
                          <View style={{display:"flex", alignItems:"center", flexDirection:"row", marginTop:15, marginBottom:-10, width:"100%", justifyContent:"space-around"}}>
                                <View style={{display:"flex",alignItems:"center"}}>
                                    <Ionicons name="md-pin" size={40} color="#57508C"
                                    onPress={()=>{redirectToGoogleMap(longitudeItineraire,latitudeItineraire)}} />
                                    <Text style={{ fontSize: 15 }}> Itinéraire </Text>
                                </View>    

                                <View style={{display:"flex",alignItems:"center"}}>
                                    <Ionicons name="md-people" size={40} color="#57508C" />
                                    <Text style={{ fontSize: 15}}> Groupes </Text>
                                </View>    

                                <View style={{display:"flex",alignItems:"center"}}>
                                    <Ionicons name="md-play" size={40} color="#57508C" onPress={()=>{props.navigation.navigate("Visit"),props.searchIdMonument(id),setModalVisible(false)}}/>
                                    <Text style={{ fontSize: 15}}> Visiter </Text>
                                </View> 
                            </View>                       
                      </View>
                  </Modal>

        <Filter visible={visibleModal} userFilterParent={userFilter} displayModal={displayModal}/>
        
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
    },
    modalView: {
      marginTop: "auto",
      marginBottom:50,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      backgroundColor: "white",
      padding: 35,
      display:"flex", 
     // flexDirection:"row",
      // justifyContent:"space-around",
      alignItems:"center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
      shadowOffset: {
        width: 0,
        height:1
      },
    }})



    function MapDispatchToProps(dispatch){
      return {
        searchIdMonument: function(argument){
          dispatch({type: 'selectVisit', idMonument: argument})
        },
        saveIdLiked: function(id){
          dispatch({type: "savedLike", idLiked:id})
      }

        }
    
    }

    function MapStateToProps(state){
      return { 
        searchToken:state.token
      }
    }
  

export default connect(
MapStateToProps,
MapDispatchToProps
)(MapScreen)