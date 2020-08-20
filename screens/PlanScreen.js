console.disableYellowBox = true;
import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, Image, Alert, Modal, StyleSheet,TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Slider from "react-native-slider";
import Scrubber from 'react-native-scrubber';
import { Ionicons } from '@expo/vector-icons';
import FooterApp from './footer';
import HeaderApp from './Header';
import {connect} from 'react-redux'; 
import { Audio } from 'expo-av'; 


const soundObject = new Audio.Sound();
 
function PlanScreen (props) {

    var cloudinary = "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache-plan_qaaqxd.png"; 
    
    const [color,setColor] = useState('#a2a1e5');
    const [intPoint, setIntPoint] = useState([])
    const [extPoint, setExtPoint] = useState([])
    const [intPlan, setIntPlan] = useState('')
    const [extPlan, setExtPlan] = useState('')
    const [illustration, setIllustration] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [infoModal, setInfoModal] = useState({title: '', illustration: '', sound: ''})
    const [audioLive, setAudioLive] = useState ('')
    const [isPlaying, setIsPlaying] = useState (false)
    const [playbackInstance, setplaybackInstance] = useState()
    const [currentIndex, setcurrentIndex] = useState (0)
    const [volume, setvolume] = useState (1)
    const [isBuffering, setisBuffering] = useState (false)
    const [audioPosition, setAudioPosition] = useState('')
    const [audioTime, setAudioTime] = useState('')
    
    var planInt = ''
    var planExt = ''
    var iconName = 'ios-play-circle'
    
    useEffect(()=>{
        const loadData = async ()=>{
            var allDataBack = await fetch("http:/10.2.3.92:3000/points-tour")
            var allData = await allDataBack.json()
            // console.log('-------------', allData.guide,'Tableau ou pas' )

            var allDataGuide = allData.guide
            var intData = []
            var extData = []
            var pointImage = []
            var sound = []
           
        
            for(var i=0; i<allDataGuide.length; i++){
                if(allDataGuide[i].type == 'interieur'){
                    for(var j=0; j<allDataGuide[i].point.length; j++){
                        var x = allDataGuide[i].point[j].coordx
                        var y = allDataGuide[i].point[j].coordy
                        var pointImage = allDataGuide[i].point[j].illustration
                        var title= allDataGuide[i].point[j].title
                        var sound = allDataGuide[i].point[j].audio[0].urlaudio
                        
                        // console.log(pointImage, 'Flute')
                        // console.log('-------------', sound, '---------------------Bordellllllll')
                        intData.push({x:x, y:y, pointImage:pointImage, title: title, sound:sound});
                      
                    } 
                    planInt = allDataGuide[i].urlPlan
                } else if(allDataGuide[i].type == 'exterieur'){
                    for(var j=0; j<allDataGuide[i].point.length; j++){
                        var x = allDataGuide[i].point[j].coordx
                        var y = allDataGuide[i].point[j].coordy
                        var pointImage = allDataGuide[i].point[j].illustration
                        var title= allDataGuide[i].point[j].title
                        var sound = allDataGuide[i].point[j].audio
                        
                        extData.push({x:x, y:y, pointImage:pointImage, title:title, sound:sound})
                    }
                    planExt = allDataGuide[i].urlPlan
                }
            }

            setIntPoint(intData)
            setExtPoint(extData)
            setIntPlan(planInt)
            setExtPlan(planExt)
            setModalVisible(false)
            
        }

        loadData()
       
         
    },[])

    async function runAudio(arg) {
       
         soundObject.setOnPlaybackStatusUpdate((test)=>{setAudioTime(test.durationMillis), setAudioPosition(test.positionMillis)})  
   

             
         
        try {
        
        // await soundObject.playAsync();
        // setIsPlaying(true)
        // soundObject.setVolumeAsync(1);
        // Your sound is playing!
        // await soundObject.pauseAsync(); 
        // soundObject.stopAsync();

        if(!arg){
             await soundObject.pauseAsync(); 
          
        } else {
            await soundObject.playAsync();
           
        }

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        // await soundObject.unloadAsync();
        } catch (error) {
        // An error occurred!
        console.log(error);
      }
      
      
      setIsPlaying(!isPlaying)
    }


    // console.log('aaaaaaaaaaaaaa', planInt)
    
        // Logique de positionnement des points en fonction X et Y

        var handleClick = (title, illustration, sound) =>{
            setColor('#4D3D84')
            soundObject.loadAsync({uri : sound});
           
            // console.log(soundObject, 'SOUNDOBJECT')
            setInfoModal({title, illustration, sound})
            
            setModalVisible(true)
      };
           
        // if(props.typeVisit == 'interieur'){

            var position = intPoint.map((point, i) => {
                // console.log(point,'pooooooint')
                // console.log(point.pointImage,'MERDEEEE')
                // console.log(point, 'cacacacacacaacacc')
                // Fonction du OnPress sur l'icone                                      
                return  <Ionicons 
                    key={i}
                    size={25} 
                    style={{zIndex: 1, position:"absolute", bottom:point.x, left:point.y }} 
                    name="ios-radio-button-on" 
                    md="md-radio-button-on" 
                    color={color}
                    onPress={() => handleClick(point.title, point.pointImage, point.sound)}
                    />
                    
                    })
   
                     var image = intPlan

                     if(isPlaying === true){
                         iconName = 'ios-pause'
                     }else {
                        iconName = 'ios-play-circle'
                    }

                   
                    
           

        // } else 
        // if(props.typeVisit == 'exterieur'){

            // var position = extPoint.map((point, i) => {
            //     console.log(point,'pooooooint')
            //     // Fonction du OnPress sur l'icone                    
            //        return <Ionicons 
            //            key={i}
            //            size='25' 
            //            style={{zIndex: 1, position:"absolute", bottom:point.x, left:point.y }} 
            //            name="ios-radio-button-off" 
            //            md="md-radio-button-off" 
            //            color="#a2a1e5"
            //            />
            //            // OnPress => (){}
            //        }); 

            //        var image = extPlan
            //         )
            //     }
        // }

      
//    console.log(audioPosition, audioTime, 'HAMMMMMEDDDD BOSSSSSS')
    return (
            <View style={{flexDirection: "column", flex:1, justifyContent: "center", alignItems: "center"}}>
                <HeaderApp navigation={props.navigation}/>

                <Button type="solid" title= "Accédez au Quizz" onPress={() => props.navigation.navigate("Quizz")} style={{width:200, marginLeft:"22%", marginTop:"5%", color: "#FFFFFF"}}/>

                    <View style={styles.centeredView}>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                  <Text style={styles.modalText}> {infoModal.title} </Text>
                                  <Image source={{uri : infoModal.illustration}} style={{height: 200, width: 200}} />
                                    
                                    <View style={styles.controls}>
                                        <TouchableOpacity style={styles.controls} >
                                        <Ionicons onPress={() => runAudio(!isPlaying)} name={iconName} size={48} color='#444' />
                                        <Ionicons onPress={() => {soundObject.stopAsync(); setIsPlaying(false)}} name='md-square' size={44} color='#444' /> 
                                        </TouchableOpacity>
                                        {/* <View>
                                            <Scrubber 
                                                value={0}
                                                onSlidingComplete={}
                                                totalDuration={1000}
                                                trackColor='#666'
                                                scrubbedColor='#8d309b'
                                            />
                                        </View> */}
                                       
                                            
                                    </View>
                                    
                                    <TouchableHighlight
                                     style={{ ...styles.openButton, backgroundColor: "#57508C" }}
                                     onPress={() => {
                                        setModalVisible(!modalVisible);
                                        {soundObject.unloadAsync();}
                                     }}
                                     >
                                     <Text style={styles.textStyle}>Fermer</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
     
                        
                    </View>

                

                <ScrollView>
                    <View>
                        <Text style={{marginLeft:"21%", marginBottom:"2%", fontSize:20}}>Eglise de Saint-Eustache</Text>
                        <Text style={{marginLeft:"2%", marginBottom:"7%", fontSize:15, textAlign:"center"}}>Visite Guidée interieur</Text>
                        <Image source={{uri:image}} style={{height:500, width:350, marginLeft: 1}}/>

                        {position}
                        

                        <Button type="solid" title= "Accédez au Quizz" onPress={() => props.navigation.navigate("Quizz")} style={{width:200, marginLeft:"22%", marginTop:"5%", color: "#FFFFFF"}}/>

                     </View>
                
                </ScrollView>     

      
                <FooterApp navigation={props.navigation}/>
            </View>
            
            
    )
}

function mapStateToProps(state) {
    return { typeVisit : state.typeVisit }
  }
    
  export default connect(
    mapStateToProps, 
    null
  )(PlanScreen);



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    elevation: 2,
    marginTop: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center", 
    margin: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  controls: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      width : '70%',
      marginLeft: 10
    //   backgroundColor: 'red'
  }
});


