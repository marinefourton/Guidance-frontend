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
            const response = await fetch(`http://10.2.3.92:3000/update-point/${props.searchToken}/${props.recupScore}`, {
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
        

            <View style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Text style={{display:"flex", alignItems:"center", marginTop:105, marginBottom:20, textTransform:"uppercase", fontSize:16, fontWeight:'bold'}}> {resultatDuQuizz} </Text>
                <Text style={{marginBottom: 30, width:250,textAlign: 'center'}}> {plusQue} </Text>
                <Text style={{marginBottom: 10, textAlign: 'center'}}> Vous êtes actuellement </Text>
                <Image source={badge}/>
                <Text style={{textAlign:"center"}}>{palier}</Text>
                <Button onPress={() => props.navigation.navigate("MyBadges")}
                    buttonStyle={{margin:15, marginTop:50, backgroundColor:"white", borderColor:"#57508C", borderWidth:1, width:"50%", borderRadius:30, marginRight:"auto", marginLeft:"auto"}}
                    titleStyle={{color:"#57508C", marginRight:"auto", marginLeft:"auto"}}
                    title="VOIR MES BADGES"
                    color='#57508C'              
                />
            </View>
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
      backgroundColor: '#ffffff',
    }
  });