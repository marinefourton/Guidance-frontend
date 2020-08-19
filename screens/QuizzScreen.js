import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Switch, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-elements'
import {connect} from 'react-redux';
import FooterApp from '../screens/footer';
import HeaderApp from '../screens/Header';
import { Ionicons } from '@expo/vector-icons';

function Quizz(props) {

    const[isDisabled, setIsDisabled] = useState(false);
    const[indexQuestion, setIndexQuestion] = useState(0);
    const[quizz, setQuizz] = useState([])
    const[score, setScore] = useState(0);

    let nombreDeQuestions=quizz.length;
    let bouton;
    let QCM;
    let question;

    // A DECOMMENTER : AU CHARGEMENT DU SCREEN : REINITIALISATION DU SCORE A 0 DANS LE STORE, RECUP DE L'ID DU TOUR ET DONC LE QUIZZ, AJOUTER LA VISITE A L'HISTORIQUE
    // useEffect(() => {
    //     console.log("je passe dans le useEffect")
    //     props.resetScore();
    //     let updateVisitHistory = async () => {
    //         const response = await fetch(`http://10.2.3.47:3000/update-visit-history/${props.searchToken}/${props.tourID}`, {
    //             method: 'PUT'
    //           });
    //     }
    //     updateVisitHistory();
    //     let getQuizz = async () => {
    //         const response = await fetch('http://10.2.3.47:3000/get-quizz', {
    //             method: 'POST',
    //             headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //             body: `tourID=${props.tourID}`
    //         })
    //         const jsonResponse = await response.json()
    //         console.log("reponse du back", jsonResponse)
    //         setQuizz(jsonResponse.quizz)
    //     }
    //     getQuizz();
    //     }, [])

    // Au chargement, on recupére le quizz et on enregistre le tour dans l'historique
    useEffect (() => {
        async function loadData() {

            var updateHistory = await fetch(`http://10.2.3.47:3000/update-visit-history`, {
                method: 'PUT',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `tourID=${props.tourID}&token=${props.searchToken}`
            });
            
            const response = await fetch('http://10.2.3.47:3000/get-quizz', {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `tourID=${props.tourID}`
            })
            const jsonResponse = await response.json()
            setQuizz(jsonResponse)
        }
        loadData()

    }, [])


    // const[quizz, setQuizz] = useState([
    //             {question: "De quoi est mort Oscar Wilde ?",
    //              reponses: ["D'une meningite" , "De la tuberculose", "Il n'est pas mort", "D'amour"],
    //              win: "D'une meningite"},
    //              {question: "c'est la question B",
    //              reponses: ["reponse A" , "reponse B", "reponse C", "reponse D"],
    //              win: "reponse B"},
    //              {question: "c'est la question C",
    //              reponses: ["reponse A" , "reponse B", "reponse C", "reponse D"],
    //              win: "reponse C"},
    //              {question: "c'est la question D",
    //              reponses: ["reponse A" , "reponse B", "reponse C", "reponse D"],
    //              win: "reponse D"}
    //         ]
    // );



// Au changement de nouvelle question, les boutons des reponses sont de nouveau clickables
    useEffect(() => {
        setIsDisabled(false);
    }, [indexQuestion])

// Au click sur ACCEDEZ AUX RESULTATS, on save le score dans le store et on renvoit vers la page WIN
    var saveScoreAndNavigate = () => {
        props.navigation.navigate("Win");
        props.saveScore(score)
    }

// Affichage des reponses (et donc des couleurs des boutons)
    var displayAnswer = (reponse) => {
        setIsDisabled(true);
        if(reponse==quizz[indexQuestion].win){
            setScore(score+2)
        }else{
            setScore(score-1)
        }
    }


// ON boucle sur les questions du questionnaire. Si c'est la bonne reponse, sa couleur finale sera verte, sinon rouge
if (quizz && quizz[indexQuestion]){

    question = quizz[indexQuestion].question

    QCM = quizz[indexQuestion].reponses.map((reponse, i) => {
        var disabledCouleur = ""
       if (reponse==quizz[indexQuestion].win){
           disabledCouleur="#B8E982";
       }else{
           disabledCouleur="#EE8079";
       }
 
       return <Button
            key={i}
            buttonStyle={{backgroundColor: '#FFFFFF', borderColor: 'grey', marginTop:"3%", marginBottom:"3%", borderWidth: 1.3}}
            titleStyle={{color: '#000000'}}
            onPress={()=>displayAnswer(reponse)}
            disabled={isDisabled}
            title={reponse}
            type="outline"
            disabledStyle={{borderColor: disabledCouleur, borderWidth: 1.3}}
            disabledTitleStyle={{color: '#000000'}}
        />

    })
}


// Bouton final
    if((indexQuestion+1)!=nombreDeQuestions){
        bouton = <Button
                onPress={() => setIndexQuestion(indexQuestion+1)}
                buttonStyle={{ borderRadius: 20, backgroundColor: '#57508C', borderColor: '#000000', width:"60%", marginTop:"8%", marginLeft:"auto", marginRight:"auto"}}
                disabled={!isDisabled}
                disabledTitleStyle={{color: '#FFFFFF'}}
                title="SUIVANT"    
                /> 
    } else {
        bouton = <Button
        onPress={() => saveScoreAndNavigate()}
        disabled={!isDisabled}
        buttonStyle={{borderRadius: 20, backgroundColor: '#57508C', borderColor: '#000000', width:"80%", marginTop:"8%", marginLeft:"auto", marginRight:"auto"}}
        disabledTitleStyle={{color: '#FFFFFF'}}
        title="ACCEDEZ AU RESULTAT"    
                /> 
    }

    let numero = indexQuestion+1;


    return(
        <View style={styles.container}>
        <HeaderApp navigation={props.navigation}/>
    
            <TouchableOpacity style={{display:"flex", flexDirection:"row", marginLeft:10, paddingTop:10 }} onPress={() => props.navigation.navigate("Map")}>
                <Ionicons name="ios-arrow-back" size={24} color="#57508C"/>
                <Text style={{marginLeft:5}}>Accueil</Text>
            </TouchableOpacity>
        
            <View style={{ width:"80%", marginTop:"auto", marginBottom:"25%", marginRight:"auto", marginLeft:"auto"}}> 
    
            <Text style={{marginBottom:"5%", marginTop:"10%", fontSize: 20}}> Question {numero} / {nombreDeQuestions}</Text>
    
            <Text style={{textAlign:"center", margin:10, marginBottom:20}}>{question}</Text>
    
            {QCM}
            {bouton}
    
            </View>
            <FooterApp navigation={props.navigation}/>
    
        </View>);

}

function QuizzParentEcriture(dispatch) {
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

function QuizzParentLecture(storestate){
    return {
        tourID: storestate.idMonument,
        searchToken: storestate.token,
    }
}
export default connect(
    QuizzParentLecture,
    QuizzParentEcriture
)(Quizz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});

//<Text style={{marginBottom:"5%", marginTop:"10%", fontSize: 15}}>{selectedTour.quizz[indexQuestion].question}</Text>