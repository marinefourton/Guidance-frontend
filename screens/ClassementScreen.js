import React from 'react';
import { Text, View, Button } from 'react-native';

function ClassementScreen ({navigation}) {
    return (
        <View style={{backgoundColor:"yellow"}}>
            <Text>Classement Screen</Text>
            <Button title="Go to badges" onPress={() => navigation.navigate("MyBadges")}/>
            <Button title="Go to ?" onPress={() => navigation.navigate("")}/>

        </View>
    )
}

export default ClassementScreen;