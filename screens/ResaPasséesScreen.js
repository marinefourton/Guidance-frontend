console.disableYellowBox = true;
import React, { useEffect , useState }from 'react';
import { Text, View, ScrollView, StyleSheet} from 'react-native';
import { ButtonGroup, Button, Card, TouchableOpacity} from "react-native-elements";
import SwitchButton from 'switch-button-react-native';
import {connect} from 'react-redux';
import FooterApp from './footer';
import HeaderApp from './Header';

function ResaPasséesScreen(props) {

    const [selectedIndex, setSelectedIndex] = useState(1)
    const buttons = ["Passées","A venir"]
    const [pasDeVisite, setPasDeVisite] = useState("")
    const [cardList, setCardList] = useState([])

// Fonction qui met la date au bon format
      var getDate = (date) => {
        var newDate = new Date(Number(date));
        var format = newDate.getDate()+'/'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
        return format;
      }

      useEffect(() => {
        if (selectedIndex==1) {
          // RECUP VISITES PASSEES EN BDD
          async function recupPastVisit() {
            const response = await fetch('http://10.2.3.51:3000/get-past-visit', {
              method: 'POST',
              headers: {'Content-Type':'application/x-www-form-urlencoded'},
              body: `token=${props.searchToken}`
            })
            const jsonResponse = await response.json()

          // Si pas de visites passées en BDD
          if(jsonResponse.length==0) {
            setPasDeVisite("Vous n'avez pas encore visité des lieux")
          } else {
            let inter = jsonResponse.map(tour=> {
              let date = getDate(tour.bookedhour)
               return <Card 
                      style={{position:"absolute"}}
                      image={{uri:tour.bookedplace.picture}}>     
                        <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                            <View style={{width:"95%"}}>
                                <Text style={{fontWeight:"bold", fontSize:18, marginTop: 20}}>{tour.bookedplace.title}</Text>
                                <Text style={{marginBottom:-3}}>Visité le {date}</Text>
                            </View>
                        </View>            
                      </Card>
            })
            setCardList(inter)
            }
          }
          recupPastVisit(); 

  // Sinon => visites à venir
        } else {
          async function recupFuturVisit() {
            const response = await fetch('http://10.2.3.47:3000/get-futur-visit', {
              method: 'POST',
              headers: {'Content-Type':'application/x-www-form-urlencoded'},
              body: `token=${props.searchToken}`
            })
            const jsonResponse = await response.json()

            if(jsonResponse.length==0) {
              pasDeVisite = "Vous n'avez pas encore visité des lieux"
            }
            else {
              let inter = jsonResponse.map(tour=> {
                let date = getDate(tour.bookedhour)
                 return <Card 
                        style={{position:"absolute"}}
                        image={{uri:tour.bookedplace.picture}}>     
                          <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                              <View style={{width:"95%"}}>
                                  <Text style={{fontWeight:"bold", fontSize:18, marginTop: 20}}>{tour.bookedplace.title}</Text>
                                  <Text style={{marginBottom:-3}}>Visite prévue le {date}</Text>
                              </View>
                          </View>            
                        </Card>
              })
              setCardList(inter)
              }
          }
          recupFuturVisit(); 
        }
      }, [selectedIndex])

    return (
        <View style={styles.container}>

        <HeaderApp navigation={props.navigation} style={styles.header}/>
        
        <View style={styles.switch}>
        <SwitchButton
            onValueChange={(val) => setSelectedIndex(val)}      
            text1 = 'Passées'                 
            text2 = 'A venir'                    
            switchWidth = {300}                
            switchHeight = {40}                 
            switchdirection = 'ltr'             
            switchBorderRadius = {100}          
            switchSpeedChange = {200}
            switchBackgroundColor = '#fff'           
            btnBorderColor = "#57508C"
            btnBackgroundColor = "#57508C"          
            fontColor = '#b1b1b1'               
            activeFontColor = '#fff' 
            marginTop={30}
        />
      </View>


            {/* <ButtonGroup 
            buttons={buttons}
            selectedButtonStyle={{backgroundColor:"white",borderWidth:1,borderColor:"#57508C"}}
            containerStyle={{height:50,width:300,borderRadius:10,backgroundColor:"#57508C"}}
            selectedIndex={selectedIndex}
            selectedTextStyle={{color:"#57508C"}}
            textStyle={{color:"white"}}
            >
          </ButtonGroup> */}

          <Text>{pasDeVisite}</Text>
          <ScrollView>
          {cardList}
          </ScrollView>

            
            <Button title="Go to badges" onPress={() => props.navigation.navigate("MyBadges")}/>
            <Button title="Go to visit" onPress={() => props.navigation.navigate("Visit")}/>
            <Button title="Go to quizz" onPress={() => props.navigation.navigate("Quizz")}/>
            <Button title="Go to PlanScreen" onPress={() => props.navigation.navigate("Plan")}/>
            <Button title="Add monument BDD" onPress={() => fetch ("http://10.2.3.92:3000/save-monument")}/>

        <FooterApp navigation={props.navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    switch: {
      marginTop:30,
      marginBottom:30
    }
  });

  function ResaPasséesParentLecture(storestate){
    return {
        searchToken: storestate.token,
    }
}
export default connect(
    ResaPasséesParentLecture,
    null
)(ResaPasséesScreen)


