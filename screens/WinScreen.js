import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import {connect} from 'react-redux';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';

// import { Ionicons } from '@expo/vector-icons';

function Win(props) {

    const[score, setScore] = useState(0);
    const[userPoints, setUserPoints] = useState(0);
    console.log(userPoints)
    console.log(score)

    var badgesList = [
        { points:0 ,src:"../assets/badge-0-miles.jpg", name:"Beginner"},
        { points:50 ,src:"../assets/badge-50-miles.jpg", name:"Walker"},
        { points:100 ,src:"../assets/badge-100-miles.jpg", name:"Globe Trotter"},
        { points:200 ,src:"../assets/badge-200-miles.jpg", name:"Road Tripper"},
        { points:300 ,src:"../assets/badge-300-miles.jpg", name:"Backpacker"},
        { points:500 ,src:"../assets/badge-500-miles.jpg", name:"Explorer"},
        { points:700 ,src:"../assets/badge-700-miles.jpg", name:"Adventurer"},
        { points:1000 ,src:"../assets/badge-1000-miles.jpg", name:"Master Key"},
        { points:1250 ,src:"../assets/badge-1250-miles.jpg", name:"Magellan"},
        { points:1500 ,src:"../assets/badge-1500-miles.jpg", name:"World Traveller"},
        { points:2000 ,src:"../assets/badge-2000-miles.jpg", name:"Super Guider"}
    ];

    var randomImages = [
        require('../assets/badge-0-miles.jpg'),
        require('../assets/badge-50-miles.jpg'),
        require('../assets/badge-100-miles.jpg'),
        require('../assets/badge-200-miles.jpg'),
        require('../assets/badge-300-miles.jpg'),
        require('../assets/badge-500-miles.jpg'),
        require('../assets/badge-700-miles.jpg'),
        require('../assets/badge-1000-miles.jpg'),
        require('../assets/badge-1250-miles.jpg'),
        require('../assets/badge-1500-miles.jpg'),
        require('../assets/badge-2000-miles.jpg'),
    ];
    
    let palier = "";
    let nextLevel= "";
    let badge = "" ;
    let difference = 0;
    let resultatDuQuizz= ""
    let plusQue= ""

    // A L'INITIALISATION : RECUP LE SCORE DU STORE ET ON LE STOCK DANS L'ETAT SCORE, ON RECUPERE LES NOUVEAUX POINTS DU USER MIS A JOUR
    useEffect(() => {
        setScore(props.recupScore);
        let updatePoints = async () => {
            const response = await fetch(`http://10.2.3.51:3000/update-point/${props.searchToken}/${props.recupScore}`, {
                method: 'PUT'
              });
            const jsonResponse = await response.json()
            // console.log(jsonResponse)
            setUserPoints(jsonResponse.userpoints)
        }
        updatePoints();
        }, [])

        badgesList.forEach((rang, i, tab) => {
            if (userPoints>=2000) {
                palier = "Super Guider";
                nextLevel= "";
                badge = "../assets/badge-2000-miles.jpg";
            } else if (userPoints>=rang.points && userPoints<tab[i+1].points) {
                palier = rang.name;
                nextLevel = tab[i+1].name;
                badge = randomImages[i];
                difference = tab[i+1].points-userPoints
            } 
        })

    if (score>0) {
        resultatDuQuizz=`Bravo ! Vous avez gagné ${score} Miles !`
    } else {
        resultatDuQuizz=`Vous avez perdu ${Math.abs(score)} Miles ... Rattrapez-vous lors d'une prochaine visite !`
    }

    if (difference!=0) {
        plusQue=`Plus que ${difference} Miles pour gagner le prochain badge ${nextLevel} !`
    }

    return(
        <View style={styles.container}>
        <HeaderApp navigation={props.navigation}/>
        

            <Card
            title={resultatDuQuizz}
            wrapperStyle={{alignItems: 'center'}}
            containerStyle={{marginTop:100}}
            >
                <Text style={{marginBottom: 10, textAlign: 'center', justifyContent: 'center'}}>
                {plusQue}
                </Text>
                <Text style={{marginBottom: 10, alignItems: 'center', justifyContent: 'center'}}>
                Votre badge est
                </Text>
                <Image source={badge}/>
                <Text>Niveau : {palier}</Text>
                <Button
                    buttonStyle={{backgroundColor: '#FFFFFF', borderColor: '#000000', marginTop:"3%", marginBottom:"3%", borderWidth: 1}}
                    titleStyle={{color: '#000000'}}
                    onPress={() => props.navigation.navigate("MyBadges")}
                    title="VOIR MES BADGES"
                    type="outline"
                />
            </Card>
            <FooterApp navigation={props.navigation}/>
        </View>
    )

}

function WinParent(storestate){
    return {
        recupScore: storestate.score,
        searchToken: storestate.token
    }
}



export default connect(
    WinParent,
    null
)(Win)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#a2a1e5',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  });