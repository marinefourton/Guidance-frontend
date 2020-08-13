import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, Modal, Switch } from 'react-native';
import { ListItem, Header, CheckBox, Slider } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

export default function Filter(props) {

  // MODAL VISIBLE
  // const [isVisibleFilterModal, setIsVisibleFilterModal] = useState(props.visible)
  const [isVisibleCategeryModal, setIsVisibleCategeryModal] = useState(false)
  // const [isVisibleNotesModal, setIsVisibleNotesModal] = useState(false)
  const [isVisiblePriceModal, setIsVisiblePriceModal] = useState(false)
// console.log(isVisibleFilterModal)
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
              categorySubtitle = categorySubtitle + " " + obj.signification+','
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

  // Reverse Data Flow
  var sendToMap = () => {
    props.userFilterParent({
      categories : tabCheckboxes,
      price: priceMax,
      showClosed: isSwitched
    }, false)
  }

  var closeModal = () => {
    props.userFilterParent({
      categories : [{state: true,
          signification: "Monuments"},
         {state: true,
          signification: "Musées"},
        {state: true,
          signification: "Parcs et Jardins"}
        ],
      price: 50,
      showClosed: false
    }, false)
  }

  return (
    <View style={styles.container}>

      {/* FILTER MODAL */}
      <Modal 
    animationType="slide"
    visible={props.visible}
    transparent={true}
    >
          <View style={styles.ViewInModal}>
          
          <Header
            containerStyle={{
              backgroundColor: '#4D3D84',
              justifyContent: 'space-around',
            }}
            placement="center"
            leftComponent={<Text  
                              style={{ color: '#fff' }}
                              onPress={() => {setIsMonumentChecked(false); setIsMuseumChecked(false); setIsParkChecked(false); setPriceMax(50); setIsSwitched(false)}}
                              >
                            Tout effacer
                          </Text>}
            centerComponent={{ text: 'FILTRES', style: { color: '#fff' } }}
            rightComponent={<Ionicons 
                              name="ios-close" 
                              size={24} 
                              color="#fff" 
                              onPress={() => closeModal()}
                            />}
          />

          {/* <ListItem
            title="Filtres"
            bottomDivider
            rightIcon={<Ionicons name="ios-close" size={24} color="black" /> }
            /> */}

          <ListItem
            title="Catégories"
            subtitle={categorySubtitle}
            bottomDivider
            chevron
            onPress={() => setIsVisibleCategeryModal(true)}
            />

          <ListItem
            title="Notes"
            // subtitle={selectedRating}
            bottomDivider
            chevron
            // onPress={() => this.props.navigation.navigate("ListitemDetail")}
            />

          <ListItem
            title="Prix"
            subtitle={`Prix max : ${priceMax}€ `}
            bottomDivider
            chevron
            onPress={() => setIsVisiblePriceModal(true)}
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
              title="Appliquer"
              color='#4D3D84'
              onPress={() => sendToMap()}
               />
          </View>
  </Modal>

  {/* CATEGEORIE MODAL */}
  <Modal 
    animationType="slide"
    visible={isVisibleCategeryModal}>
          <View style={styles.ViewInModal}>

          <Header
            containerStyle={{
              backgroundColor: '#4D3D84',
              justifyContent: 'space-around',
            }}
            placement="center"
            centerComponent={{ text: 'CATEGORIES', style: { color: '#fff' } }}
            leftComponent={<Text  
              style={{ color: '#fff' }}
              onPress={() => {setIsMonumentChecked(false); setIsMuseumChecked(false); setIsParkChecked(false)}}
              >
            Tout effacer
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
              title="Appliquer"
              onPress={() => setIsVisibleCategeryModal(false)}
              color='#4D3D84'
               />
          </View>
  </Modal>

    {/* PRICE MODAL */}
    <Modal 
    animationType="slide"
    visible={isVisiblePriceModal}>
          <View style={styles.ViewInModal}>

            <Header
            containerStyle={{
              backgroundColor: '#4D3D84',
              justifyContent: 'space-around',
            }}
              placement="center"
              centerComponent={{ text: 'PRIX', style: { color: '#fff' } }}
              leftComponent={<Text  
                style={{ color: '#fff' }}
                onPress={() => setPriceMax(50)}
                >
              Reset
            </Text>}
            />
          
            <Slider
                style={{margin:15}}
                value={priceMax}
                onValueChange={(value) => setPriceMax(value)}
                maximumValue={50}
                minimumValue={0}
                thumbTintColor='#57508C'
                step={1}
            />

            <Text
              style={{margin:20}}
            >
            Gamme de prix sélectionnée
            0 € - {priceMax} €
            </Text>

              <Button 
              title="Appliquer"
              onPress={() => setIsVisiblePriceModal(false)}
              color='#4D3D84'
               />
          </View>
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
    flex: 1,
    justifyContent: 'flex-end',
    margin: 3,
    borderRadius: 20,
    overflow: 'hidden',
  }
});
