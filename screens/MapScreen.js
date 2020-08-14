console.disableYellowBox = true;
import React, { useEffect , useState }from 'react';
import { Text, View ,StyleSheet ,Image,Modal} from 'react-native';
import MapView , { Marker } from 'react-native-maps';
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';
import { Header ,SearchBar,ButtonGroup, withTheme,Button} from "react-native-elements";
import  { Ionicons } from "react-native-vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 
import Filter from "../screens/FilterScreen";
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';

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

        const response = await fetch('http://10.2.3.25:3000/display-filtered-tours', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `categories=${JSON.stringify(filters.categories)}&price=${filters.price}&showClosed=${filters.showClosed}&title=${inputValue}`
        })
        
        const jsonResponseFilter = await response.json()
        setTourList(jsonResponseFilter.result) 
      }
      getToursWithFilters();
      }, [filters, inputValue])

      // useEffect( () => {
      //   console.log("je passe dans le useEffect de l'input")
      //   let getToursWithInput = async () => {
      //   const response = await fetch('http://10.2.3.47:3000/display-input-tours', {
      //     method: 'POST',
      //     headers: {'Content-Type':'application/x-www-form-urlencoded'},
      //     body: `title=${inputValue}`
      //   })
      //   const jsonResponseInput = await response.json()
      //   setTourList(jsonResponseInput.result) 
      // }
      //   getToursWithInput();
      // }, [inputValue])

  // Boucle marker
  let markerList = tourList.map((tour, i) => {
    let color
    switch (tour.category) {
      case "Monuments" : color="orange"; break;
      case "Musées" : color="blue"; break;
      case "Parcs et Jardins" : color="green"; break;     
      default : color="red"
    }
      return <Marker 
        key={i}
        pinColor={color}
        coordinate={{
        latitude:tour.location.latitude,
        longitude:tour.location.longitude,
        latitudeDelta:latitude,
        longitudeDelta:longitude
                    }}
        title={tour.title}
        />
      })

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
    }

})

