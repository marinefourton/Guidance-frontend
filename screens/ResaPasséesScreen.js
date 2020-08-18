import React, { useEffect , useState }from 'react';
import { Text, View ,StyleSheet} from 'react-native';
import { ButtonGroup, Button, Card, TouchableOpacity} from "react-native-elements";
import SwitchButton from 'switch-button-react-native';
import {connect} from 'react-redux';
import FooterApp from './footer';
import HeaderApp from './Header';

function ResaPasséesScreen(props) {

    const [selectedIndex, setSelectedIndex] = useState(1)
    const buttons = ["Passées","A venir"]
    const [pastBookedTours, setPastBookedTours] = useState([])
    console.log(selectedIndex)
    
// console.log(selectedIndex)
    useEffect(() => {
      async function recupPastVisit() {
        const response = await fetch('http://10.2.3.6:3000/get-past-visit', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `token=${props.searchToken}`
        })
        const jsonResponse = await response.json()
        // console.log("reponse du back", jsonResponse);
        setPastBookedTours(jsonResponse)
      }
      recupPastVisit();      
      }, [])

      var pasDeVisite = ""
      var cardList= []
      if(pastBookedTours.length==0) {
        pasDeVisite = "Vous n'avez pas encore visité des lieux"
      }
      else {
        pastBookedTours.forEach(tour=> {
          cardList.push(
            <Card style={{position:"absolute"}} image={tour.picture}>     
            <View style={{display:"flex", flexDirection:"row", marginTop:-25}}>
                <View style={{width:"50%"}}>
                    <Text style={{fontWeight:"bold", fontSize:18}}>{tour.bookedplace.title}</Text>
                    <Text style={{marginBottom:-3}}>{tour.bookedhours}</Text>
                </View>
            </View>            
            </Card>
          )
        })
      }

    return (
        <View style={styles.container}>

        <HeaderApp navigation={props.navigation} style={styles.header}/>
        
        <View style={styles.switch}>
        <SwitchButton
            onValueChange={(val) => console.log(val)}      
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
          {cardList}

            
            <Button title="Go to badges" onPress={() => props.navigation.navigate("MyBadges")}/>
            <Button title="Go to visit" onPress={() => props.navigation.navigate("Visit")}/>
            <Button title="Go to quizz" onPress={() => props.navigation.navigate("Quizz")}/>
            <Button title="Go to PlanScreen" onPress={() => props.navigation.navigate("Plan")}/>
            {/* <Button title="Add monument BDD" onPress={() => fetch ("http://10.2.3.92:3000/save-monument")}/> */}

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


