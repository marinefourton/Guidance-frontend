import React from 'react';
import { Text, View, Button } from 'react-native';

function ReservationsScreen ({navigation}) {
    return (
        <View style={{backgoundColor:"yellow"}}>
            <Text>Reservationsscreen</Text>
            <Button title="Go to badges" onPress={() => navigation.navigate("MyBadges")}/>
            <Button title="Go to visit" onPress={() => navigation.navigate("Visit")}/>
            <Button title="Go to quizz" onPress={() => navigation.navigate("Quizz")}/>
            <Button title="Go to PlanScreen" onPress={() => navigation.navigate("Plan")}/>
            {/* <Button title="Add monument BDD" onPress={() => fetch ("http://192.168.1.14:3000/save-monument")}/> */}
        </View>
    )
}

export default ReservationsScreen