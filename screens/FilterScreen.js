import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Switch, Animated } from 'react-native';
import { ListItem, Header, CheckBox, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import Slider from "react-native-slider";

export default function Filter(props) {

  // MODAL VISIBLE
  const [isVisibleCategoryModal, setIsVisibleCategoryModal] = useState(false)
  const [isVisiblePriceModal, setIsVisiblePriceModal] = useState(false)

  // CATEGORIES CHECKBOXES
  const [isMonumentChecked, setIsMonumentChecked] = useState(true)
  const [isMuseumChecked, setIsMuseumChecked] = useState(true)
  const [isParkChecked, setIsParkChecked] = useState(true)
  const tabCheckboxes = [{state: isMonumentChecked,
                          signification: "Monuments"},
                         {state: isMuseumChecked,
                          signification: "Musées"},
                        {state: isParkChecked,
                          signification: "Parcs et Jardins"}
                        ]
  let categorySubtitle = ''                     
  if (isMonumentChecked || isMuseumChecked || isParkChecked){
          tabCheckboxes.forEach(obj => {
            if (obj.state) {
              categorySubtitle = categorySubtitle + "" + obj.signification+', '
            }
          })
  } else {
    categorySubtitle = "Aucune selection"
  }

  //PRICE
  const [priceMax, setPriceMax] = useState(50);

  // SWITCH
  const [isSwitched, setIsSwitched] = useState(false);
  var toggleSwitch = () => setIsSwitched(!isSwitched);

  // Reverse Data Flow si filtres appliqués
  var sendToMap = () => {
    
    props.userFilterParent({
      categories : tabCheckboxes,
      price: priceMax,
      showClosed: isSwitched
    }, false)
  }

    // Reverse Data Flow si modal fermée sans filtres appliqués
  var closeModal = () => {
    props.userFilterParent(null, false)
  }

  return (

  

    <View style={styles.container}>

    
      {/* FILTER MODAL */}
      <Modal 
      key={1}
    animationType="slide"
    visible={props.visible}
    transparent={true}
    >
          <View style={styles.ViewInModal}>
          
          <Header
            containerStyle={{
              marginTop:-20,
              backgroundColor: '#4D3D84',
            }}
            placement="center"
            leftComponent={<Text  
                              style={{ color: '#ffffff', width:100 }}
                              onPress={() => {setIsMonumentChecked(true); setIsMuseumChecked(true); setIsParkChecked(true); setPriceMax(50); setIsSwitched(false)}}
                              >
                            Réinitialiser
                          </Text>}
            centerComponent={{ text: 'FILTRES', style: { color: '#fff' } }}
            rightComponent={<Ionicons 
                              name="ios-close" 
                              size={24} 
                              color="#fff" 
                              onPress={() => closeModal()}
                            />}
          />

          <ListItem
            title="Catégories"
            subtitle={categorySubtitle}
            bottomDivider
            chevron
            onPress={() => {closeModal() ,setIsVisibleCategoryModal(true)}}
            />


          <ListItem
            title="Prix"
            subtitle={`Prix max : ${priceMax}€ `}
            bottomDivider
            chevron
            onPress={() => {closeModal(); setIsVisiblePriceModal(true)}}
            />

          <ListItem
            title="Masquer les lieux fermés"
            bottomDivider
            rightIcon={<Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isSwitched ? "#57508C" : "#f4f3f4"}
              ios_backgroundColor="#262626"
              onValueChange={toggleSwitch}
              value={isSwitched}
            />}
          />

            <Button 
              buttonStyle={{margin:15, backgroundColor:"white", borderColor:"#57508C", borderWidth:1, width:"60%", borderRadius:30, marginRight:"auto", marginLeft:"auto"}}
              titleStyle={{color:"#57508C"}}
              title="Appliquer"
              color='#57508C'
              onPress={() => sendToMap()}
               />
          </View>
  </Modal>

  {/* CATEGORIES MODAL */}
  

<Modal 
animationType="slide"
visible={isVisibleCategoryModal}>
  
          <Header
            containerStyle={{
              marginTop:-20,
              backgroundColor: '#4D3D84',
              justifyContent: 'space-around',
            }}
            placement="center"
            centerComponent={{ text: 'CATEGORIES', style: { color: '#fff' } }}
            leftComponent={<Text  
              style={{ color: '#fff',  width:100  }}
              onPress={() => {setIsMonumentChecked(true); setIsMuseumChecked(true); setIsParkChecked(true)}}
              >
            Réinitialiser
          </Text>}
          />

            <CheckBox
              checkedColor='#4D3D84'
              title='Monuments'
              checked={isMonumentChecked}
              onPress={() => setIsMonumentChecked(!isMonumentChecked)}
            />
            <CheckBox
              checkedColor='#4D3D84'
              title='Musées'
              checked={isMuseumChecked}
              onPress={() => setIsMuseumChecked(!isMuseumChecked)}
            />
            <CheckBox
              checkedColor='#4D3D84'
              title='Parcs et Jardins'
              checked={isParkChecked}
              onPress={() => setIsParkChecked(!isParkChecked)}
            />

            <Button 
              buttonStyle={{margin:15, backgroundColor:"white", borderColor:"#57508C", borderWidth:1, width:"60%", borderRadius:30, marginRight:"auto", marginLeft:"auto"}}
              titleStyle={{color:"#57508C"}}
              title="Appliquer"
              onPress={() =>{ props.displayModal(true); setIsVisibleCategoryModal(false) } }
              color='#4D3D84'
               />
 
  </Modal>


    {/* PRICE MODAL */}
    <Modal 
    animationType="slide"
    visible={isVisiblePriceModal}>

            <Header
            containerStyle={{
              marginTop:-20,
              backgroundColor: '#4D3D84',
              justifyContent: 'space-around',
            }}
              placement="center"
              centerComponent={{ text: 'PRIX', style: { color: '#fff' } }}
              leftComponent={<Text  
                style={{ color: '#fff',  width:100  }}
                onPress={() => setPriceMax(50)}
                >
              Réinitialiser
            </Text>}
            />
          <View>
            <Slider
                style={{width:'80%', alignSelf:'center', margin:15}}
                value={priceMax}
                onValueChange={(value) => setPriceMax(value)}
                maximumValue={50}
                minimumValue={1}
                thumbTintColor='#57508C'
                step={1}
            />


          </View>

            <Text
              style={{margin:20, textAlign:"center"}}
            >
            Gamme de prix sélectionnée
            0 € - {priceMax} €
            </Text>

              <Button 
              buttonStyle={{margin:15, backgroundColor:"white", borderColor:"#57508C", borderWidth:1, width:"60%", borderRadius:30, marginRight:"auto", marginLeft:"auto"}}
              titleStyle={{color:"#57508C"}}
              title="Appliquer"
              onPress={() => {props.displayModal(true); setIsVisiblePriceModal(false)}}
              color='#4D3D84'
               />
    </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  ViewInModal: {
    marginTop:"auto",
    marginBottom:50,
    backgroundColor:"white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  }
});
