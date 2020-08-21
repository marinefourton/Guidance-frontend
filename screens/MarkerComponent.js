import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import React, { useState }from 'react';



export default function MarkerComponent (props){
    const [modalVisible,setModalVisible] = useState(false);


    return (
        <View>
<Marker 
key={props.tour.location.latitude+"-"+props.tour.location.longitude}
pinColor={props.color}
coordinate={{
latitude:props.tour.location.latitude,
longitude:props.tour.location.longitude,
latitudeDelta:props.latitude,
longitudeDelta:props.longitude
           }}
title={props.tour.title}
onPress={()=>{props.setModal(props.modalVisible),props.handleClickParent(props.tour.title,props.tour.openingSynthesis,props.tour.simpleprice,props.tour._id,props.tour.duration,props.tour.picture),
props.handleClickParentItineraire(props.tour.location.latitude,props.tour.location.longitude)}}
/>
</View>
    )
}
