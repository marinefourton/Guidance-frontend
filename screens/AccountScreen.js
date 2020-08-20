import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Header} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';

function AccountScreen (props){ 
    return (
        <View style={{flex:1}}>
        <HeaderApp navigation={props.navigation}/>
        
            <Header
            containerStyle={{
              backgroundColor: 'white',
              height:50
            }}
            placement="center"
            centerComponent={{ text: 'MON COMPTE', style: { color: '#57508C', marginTop:-22 } }}
            rightComponent={<Ionicons 
                              name="ios-close" 
                              size={24} 
                              color="#fff" 
                              onPress={() => props.navigation.navigate("Map")}
                            />}
            />

            <ListItem
            title="Mes paramètres"
            bottomDivider
            chevron
            onPress={() => setIsVisibleCategoryModal(true)}
            />

            <ListItem
            title="Mon historique des visites"
            bottomDivider
            chevron
            onPress={() => props.navigation.navigate("Reserve")}
            />

            <ListItem
            title="Mes favoris"
            bottomDivider
            chevron
            onPress={() => props.navigation.navigate("Favorites")}
            />

            <ListItem
            title="Mes badges"
            bottomDivider
            chevron
            onPress={() => props.navigation.navigate("MyBadges")}
            />

            <ListItem
            title="Classement"
            bottomDivider
            chevron
            onPress={() => setIsVisibleCategoryModal(true)}
            />

            <ListItem
            title="Mes amis"
            bottomDivider
            chevron
            onPress={() => setIsVisibleCategoryModal(true)}
            />

            <ListItem
            title="Parrainer un ami"
            bottomDivider
            chevron
            onPress={() => setIsVisibleCategoryModal(true)}
            />

            <ListItem
            title="Nous contacter"
            bottomDivider
            chevron
            onPress={() => setIsVisibleCategoryModal(true)}
            />

        <FooterApp navigation={props.navigation}/>
    </View>
    )}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }
        // ViewInModal: {
        //   marginTop:"auto",
        //   marginBottom:50,
        //   // justifyContent: 'flex-end',
        //   // margin: 3,
        //   backgroundColor:"white",
        //   borderTopLeftRadius: 20,
        //   borderTopRightRadius: 20,
        //   overflow: 'hidden',
        // }
      });
      
export default AccountScreen