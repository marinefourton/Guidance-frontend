import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Switch } from 'react-native';
import { Button, Card } from 'react-native-elements'
import {connect} from 'react-redux';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
// import { Ionicons } from '@expo/vector-icons';

function Quizz(props) {

    const[isDisabled, setIsDisabled] = useState(false);
    const[indexQuestion, setIndexQuestion] = useState(0);

    // AU CHARGEMENT DU SCREEN : REINITIALISATION DU SCORE A 0 DANS LE STORE, RECUP DE L'ID DU TOUR, INTE OU EXTE
    useEffect(() => {
        props.resetScore();
        }, [])


    const[selectedTour, setSelectedTour] = useState(
        {
            _id: "5f32b8c404f5c716406d11e2",
            quizz: [
                {question: "De quoi est mort Oscar Wilde ?",
                 reponses: ["D'une meningite" , "De la tuberculose", "Il n'est pas mort", "D'amour"],
                 win: "D'une meningite"},
                 {question: "c'est la question B",
                 reponses: ["reponse A" , "reponse B", "reponse C", "reponse D"],
                 win: "reponse B"},
                 {question: "c'est la question C",
                 reponses: ["reponse A" , "reponse B", "reponse C", "reponse D"],
                 win: "reponse C"},
                 {question: "c'est la question D",
                 reponses: ["reponse A" , "reponse B", "reponse C", "reponse D"],
                 win: "reponse D"}
            ]
        }
    );

    const[score, setScore] = useState(0);


    useEffect(() => {
        setIsDisabled(false);
    }, [indexQuestion])

    var saveScoreAndNavigate = () => {
        props.navigation.navigate("Win");
        props.saveScore(score)
    }


    var displayAnswer = (reponse) => {
        setIsDisabled(true);
        if(reponse==selectedTour.quizz[indexQuestion].win){
            setScore(score+2)
        }else{
            setScore(score-1)
        }
    }

    let QCM = selectedTour.quizz[indexQuestion].reponses.map((reponse, i) => {
        let disabledCouleur = ""
        if (reponse==selectedTour.quizz[indexQuestion].win){
            disabledCouleur="#B8E982";
        }else{
            disabledCouleur="#EE8079";
        }

        return <Button
            key={i}
            buttonStyle={{backgroundColor: '#FFFFFF', borderColor: '#000000', marginTop:"3%", marginBottom:"3%", borderWidth: 1}}
            titleStyle={{color: '#000000'}}
            onPress={()=>displayAnswer(reponse)}
            disabled={isDisabled}
            title={reponse}
            type="outline"
            disabledStyle={{borderColor: disabledCouleur, borderWidth: 2}}
            disabledTitleStyle={{color: '#000000'}}
        />

    })

    let nombreDeQuestions=selectedTour.quizz.length;
    let bouton;
    if((indexQuestion+1)!=nombreDeQuestions){
        bouton = <Button
                onPress={() => setIndexQuestion(indexQuestion+1)}
                buttonStyle={{backgroundColor: '#57508C', borderColor: '#000000', marginTop:"8%"}}
                disabled={!isDisabled}
                disabledTitleStyle={{color: '#FFFFFF'}}
                title="SUIVANT"    
                /> 
    } else {
        bouton = <Button
        onPress={() => saveScoreAndNavigate()}
        disabled={!isDisabled}
        buttonStyle={{backgroundColor: '#57508C', borderColor: '#000000', marginTop:"8%"}}
        disabledTitleStyle={{color: '#FFFFFF'}}
        title="ACCEDEZ AU RESULTAT"    
                /> 
    }

    let numero = indexQuestion+1;

    return(
        <View style={styles.container}>
        <HeaderApp navigation={props.navigation}/>
            <Text
                style={{marginBottom:"5%", marginTop:"10%", fontSize: 20, fontWeight:"bold"}}
            > Question n°{numero} / {nombreDeQuestions}</Text>

            <Card
                title={selectedTour.quizz[indexQuestion].question}
                dividerStyle={{backgroundColor: '#a2a1e5'}}
                containerStyle={{borderRadius: 20, borderColor: '#000000', paddingBottom: 0}}
                titleStyle={{fontSize: 15}}
            > 

            {QCM}
            {bouton}

            </Card>
            <FooterApp navigation={props.navigation}/>
        </View> 
)}

function QuizzParent(dispatch) {
    return {
        resetScore : function(newScore) {
            dispatch({type: "reset",
                      score: 0})},
        saveScore : function(newScore) {
            dispatch({type: "saveNewScore",
                      score: newScore+20})
                    }
    }
}
export default connect(
    null,
    QuizzParent
)(Quizz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a2a1e5',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

//<Text style={{marginBottom:"5%", marginTop:"10%", fontSize: 15}}>{selectedTour.quizz[indexQuestion].question}</Text>
