import React from 'react';
import { Text, View } from 'react-native';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';

function AccountScreen ({navigation}) {
    return (
        <View style={{flex:1, display:"flex", alignItems:"center"}}>
            <HeaderApp navigation={navigation}/>
            <Text>Mon compte</Text>
            <FooterApp navigation={navigation}/>
        </View>
    )
}

export default AccountScreen