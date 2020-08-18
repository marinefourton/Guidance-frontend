import { Text, View ,StyleSheet ,Image,Modal,TouchableOpacity} from 'react-native';
import MapView , { Marker } from 'react-native-maps';
import  { Ionicons } from "react-native-vector-icons";
import React, { useEffect , useState }from 'react';



export default function MarkerComponent (props){
    const [modalVisible,setModalVisible] = useState(false);

    return (
        <View>
<Marker 
key={props.index}
pinColor={props.color}
coordinate={{
latitude:props.tour.location.latitude,
longitude:props.tour.location.longitude,
latitudeDelta:props.latitude,
longitudeDelta:props.longitude
           }}
title={props.tour.title}
onPress={()=>{props.setModal(props.modalVisible)}} 
/>
</View>
    )
}
