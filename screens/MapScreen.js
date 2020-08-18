console.disableYellowBox = true;
import React, { useEffect , useState }from 'react';
import { Text, View ,StyleSheet ,Image,Modal,TouchableOpacity,Linking} from 'react-native';
import MapView , { Marker } from 'react-native-maps';
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';
import { Header ,SearchBar,ButtonGroup, withTheme,Button,} from "react-native-elements";
import  { Ionicons } from "react-native-vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 
import Filter from "../screens/FilterScreen";
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
import MarkerComponent from "../screens/MarkerComponent"

export default function MapScreen ({navigation}) {

  // ETATS
    const [latitude,setLatitude] = useState(48.866667);
    const [longitude,setLongitude] = useState(2.333333);
    const [inputValue,setInputValue] = useState("")
    const [selectedIndex,setSelectedIndex] = useState(1)
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
    const [visibleModal, setVisibleModal]= useState(false);
    const [tourList, setTourList] = useState([]);
    const [modalVisible,setModalVisible] = useState(false);
    const buttons = ["Carte","Liste"]

// Fonction reverseDataFlow
    var userFilter = (obj, hideModal) => {
        setVisibleModal(hideModal);
        setFilters(obj)
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

        const response = await fetch('http://10.2.3.6:3000/display-filtered-tours', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `categories=${JSON.stringify(filters.categories)}&price=${filters.price}&showClosed=${filters.showClosed}&title=${inputValue}`
        })
        
        const jsonResponseFilter = await response.json()
        setTourList(jsonResponseFilter.result) 
      }
      getToursWithFilters();
      }, [filters, inputValue])



  // Boucle marker 
  
  let markerList = tourList.map((tour, i) => {
    let color
    switch (tour.category) {
      case "Monuments" : color="orange"; break;
      case "Musées" : color="blue"; break;
      case "Parcs et Jardins" : color="green"; break;     
      default : color="red"
    }

      return (
        <MarkerComponent index={i} color={color} tour={tour} latitude={latitude} longitude={longitude} modal = {modalVisible} setModal = {setModalVisible} />
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

    return (

       <View style={{flex:1}}>

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

          { /*  <Header 
             containerStyle={{height:"7%"}}
             leftContainerStyle={{alignItems:"center",height:"150%",marginLeft:-20}}
             rightContainerStyle={{alignItems:"center",marginRight:60, width: "50%"}}
             leftComponent={<Ionicons name="ios-options" size={24} color="white"  />}
             rightComponent={ <SearchBar   placeholder="mysearch" />}
             />
          */}
         <View style={{ position:"absolute", marginTop:"45%",  left:"7%", zIndex: 10}}>
          <ButtonGroup 
                     buttons={buttons}
                     selectedButtonStyle={{backgroundColor:"white",borderWidth:1,borderColor:"#57508C"}}
                     containerStyle={{height:50,width:300,borderRadius:10,backgroundColor:"#57508C"}}
                     selectedIndex={selectedIndex}
                     selectedTextStyle={{color:"#57508C"}}
                     textStyle={{color:"white"}}
                     onPress={()=>{navigation.navigate("List")}}
                     
            >
          </ButtonGroup>
        </View>
      

        <MapView style={styles.Map} mapType="standard" region={{latitude:latitude,longitude:longitude}}>
          {markerList}
          <Marker coordinate={{
            latitude:latitude,
            longitude:longitude,
            latitudeDelta:latitude,
            longitudeDelta:longitude
            }}
             title="tu es la "   description="tu es la"/>
        </MapView>

        <FooterApp navigation={navigation}/>
                <Modal  animationType="slide" visible={modalVisible} transparent={true} style={{position:"relative"}} >
                      <View  style = {styles.modalView}   >
                        <TouchableOpacity   style={{ position:"absolute",right:20,top:10}}>
                                <Ionicons 
                              name="ios-close" 
                              size={36} 
                              color="black" 
                              position="absolute"
                              onPress={() => setModalVisible(false)}
                            />
                        </TouchableOpacity>
                  
                                  <Text style={{fontSize:22, marginBottom:5}}>Tour</Text>
                                  <Text>Hoiraires</Text>
                                  <Text>Tour Eiffel</Text>
                                  <View style={{display:"flex", flexDirection:"row", position:"absolute", left:30, top:20}}>
                                       <Ionicons  name="md-heart" size={24} color="red" />
                                       <Ionicons  style={{marginLeft:10}}  name="md-share" size={24} color="#262626" />
                                  </View> 
                          <View style={{display:"flex", alignItems:"center", flexDirection:"row", marginTop:15, marginBottom:-10, width:"100%", justifyContent:"space-around"}}>
                                <View style={{display:"flex",alignItems:"center"}}>
                                    <Ionicons name="md-pin" size={40} color="#57508C"
                                    onPress={()=>redirectToGoogleMap(longitude,latitude)} />
                                    <Text style={{ fontSize: 15 }}> Itinéraire </Text>
                                </View>    

                                <View style={{display:"flex",alignItems:"center"}}>
                                    <Ionicons name="md-people" size={40} color="#57508C" />
                                    <Text style={{ fontSize: 15}}> Groupes </Text>
                                </View>    

                                <View style={{display:"flex",alignItems:"center"}}>
                                    <Ionicons name="md-play" size={40} color="#57508C" onPress={()=>navigation.navigate("Visit")} />
                                    <Text style={{ fontSize: 15}}> Visiter </Text>
                                </View> 
                            </View>                       
                      </View>
                  </Modal>

        <Filter visible={visibleModal} userFilterParent={userFilter}/>
        
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
      marginBottom:55,
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

