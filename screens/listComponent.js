console.disableYellowBox = true;
import React, { useEffect , useState }from 'react';
import { Text, View ,StyleSheet ,Image,ScrollView} from 'react-native';
import {connect} from "react-redux";
import { Header ,SearchBar,ButtonGroup, withTheme,Button,Card} from "react-native-elements";
import  { Ionicons } from "react-native-vector-icons";




 function ListComponent (props){
    const [inputValue,setInputValue] = useState("")
    const [color,setColor] = useState(false);
    const [infos,setInfos] = useState([])
    const [idArray,setIdArray] = ([]);

  // console.log(props.nameId,"voilaaaaaa")

    var saveIdMonument = props.nameId;

    var colored ;
    !color? colored ="white": colored ="red";     

  const handlePress = async  () =>{
        await  fetch(`http://10.2.3.92:3000/send-favorites?token=${props.searchToken}&id=${props.nameId}`)
         .then(resultat=>resultat.json())
         .then(res=>res)
         .catch(err=>console.log(err))
    } 
  
  var redirectToGoogleMap = () => {

  }

return (
    <Card   style={{position:"absolute"}} image={{uri:"https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/louvre_pird42.jpg"}}>
    <View style={{display:"flex", flexDirection:"row", position:"relative", bottom:150, left:260}}>
        <Ionicons name="md-share" size={24} color="#FFFFFF" />
        <Ionicons style={{marginLeft:10}} name="md-heart" size={24} color={colored}   onPress={()=>{setColor(!color),handlePress()}}/>
    </View>        
    <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
        <View style={{width:"50%"}}>
            <Text style={{fontWeight:"bold", fontSize:18}}></Text>
            <Text style={{marginBottom:-3}}></Text>
            <Text></Text>
        </View>
        <View style={{width:"50%",display:"flex", flexDirection:"row", marginTop:5, justifyContent:"flex-end"}}>
            <View style={{display:"flex",alignItems:"center", margin:2}}>
                <Ionicons name="md-pin" size={24} color="#57508C" onPress={() => redirectToGoogleMap()} />
                <Text style={{ fontSize: 13 }}> Itinéraire </Text>
            </View>    
            <View style={{display:"flex",alignItems:"center", margin:2}}>
                <Ionicons name="md-people" size={24} color="#57508C" />
                <Text style={{ fontSize: 13 }}> Groupes </Text>
            </View>    
            <View style={{display:"flex",alignItems:"center", margin:2}}>
                <Ionicons name="md-play" size={24} color="#57508C" onPress={() => {props.searchIdMonument(saveIdMonument), props.navigation.navigate("Visit") }} />
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
      searchToken: state.token
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListComponent)