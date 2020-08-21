console.disableYellowBox = true;
import React, { useEffect , useState }from 'react';
import { Text, View ,StyleSheet ,Image,ScrollView, Linking} from 'react-native';
import {connect} from "react-redux";
import { Header ,SearchBar,ButtonGroup, withTheme,Button,Card} from "react-native-elements";
import  { Ionicons } from "react-native-vector-icons";

 function ListComponent (props){
    const [inputValue,setInputValue] = useState("")
    const [color,setColor] = useState(false);
    const [infos,setInfos] = useState([])
    const [idArray,setIdArray] = ([]);


    // console.log(props)

  var saveIdMonument = props.nameId;

  // console.log(props.nameId,"voilaaaaaa")

    var saveIdMonument = props.tour


    console.log(props.arrayId,"prop")
    var colored = "black";
    var nom="md-heart-empty"

    //!color? colored = <Ionicons  name="md-heart-empty" size={24} color="black"  onPress={()=>{setColor(!color),handlePresse(),props.saveIdLiked(id)}}/>: colored = <Ionicons  name="md-heart" size={24} color="red" onPress={()=>{setColor(!color),handlePresse()}}/>;     

var colored = "white";
var nom="md-heart-empty"

if(props.vrai){
  colored = "red" 
  nom = "md-heart"
} 




  const handlePress = async  () =>{
        await  fetch(`http://10.2.3.92:3000/send-favorites?token=${props.searchToken}&id=${props.nameId}`)
         .then(resultat=>resultat.json())
         .then(res=>res)
         .catch(err=>console.log(err));
   
    } 
  
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




    //!color? colored = <Ionicons  name="md-heart-empty" size={24} color="black"  onPress={()=>{setColor(!color),handlePresse(),props.saveIdLiked(id)}}/>: colored = <Ionicons  name="md-heart" size={24} color="red" onPress={()=>{setColor(!color),handlePresse()}}/>;     



return (
    <Card   style={{position:"absolute"}} image={{uri:props.tour.picture}}>
    <View style={{display:"flex", flexDirection:"row", position:"relative", bottom:150, left:260}}>
        <Ionicons name="md-share" size={24} color="#FFFFFF" />
        <Ionicons style={{marginLeft:10}} name={nom} size={24} color={colored} onPress={()=>{handlePress()}}/>

   </View>        
    <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
        <View style={{width:"50%"}}>
            <Text style={{fontWeight:"bold", fontSize:18}}>{props.tour.title.substr(0,1).toUpperCase()+props.tour.title.substr(1)}</Text>
<Text style={{marginBottom:-3}}>{props.tour.openingSynthesis}</Text>
<Text>{props.tour.duration}</Text>
        </View>
        <View style={{width:"50%",display:"flex", flexDirection:"row", marginTop:5, justifyContent:"flex-end"}}>
            <View style={{display:"flex",alignItems:"center", margin:2}}>
                <Ionicons name="md-pin" size={24} color="#57508C" onPress={() => redirectToGoogleMap(props.tour.location.longitude, props.tour.location.latitude)} />
                <Text style={{ fontSize: 13 }}> Itinéraire </Text>
            </View>    
            <View style={{display:"flex",alignItems:"center", margin:2}}>
                <Ionicons name="md-people" size={24} color="#57508C" />
                <Text style={{ fontSize: 13 }}> Groupes </Text>
            </View>    
            <View style={{display:"flex",alignItems:"center", margin:2}}>
                <Ionicons name="md-play" size={24} color="#57508C" onPress={() => { props.navigation.navigate("Visit") , props.searchIdMonument(props.nameId)}} />
                <Text style={{ fontSize: 13 }}> Visiter </Text>
            </View> 
        </View>
    </View>            
    </Card>
    
)
}

function mapDispatchToProps(dispatch){
    return {
      searchIdMonument: function(argument){
        dispatch({type: 'selectVisit', idMonument: argument})
      }
    }
  }


function mapStateToProps(state){
    return {
      searchToken: state.token,
      searchId:state.current
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListComponent)