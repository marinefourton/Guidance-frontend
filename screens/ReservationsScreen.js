import React from 'react';
import { Text, View, Button } from 'react-native';

function ReservationsScreen ({navigation}) {
    return (
        <View style={{backgoundColor:"yellow"}}>
            <Text>Reservationsscreen</Text>
            <Button title="Go to badges" onPress={() => navigation.navigate("MyBadges")}/>
            <Button title="Go to visit" onPress={() => navigation.navigate("Visit")}/>
            <Button title="Go to quiz" onPress={() => navigation.navigate("Quiz")}/>
            <Button title="Go to PlanScreen" onPress={() => navigation.navigate("Plan")}/>
            {/* <Button title="Add monument BDD" onPress={() => fetch ("http://10.2.3.92:3000/save-monument")}/> */}
        </View>
    )
}

export default ReservationsScreen