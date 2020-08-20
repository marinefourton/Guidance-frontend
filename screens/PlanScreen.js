console.disableYellowBox = true;
import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, Image, Alert, Modal, StyleSheet,TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Scrubber from 'react-native-scrubber';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FooterApp from './footer';
import HeaderApp from './Header';
import {connect} from 'react-redux'; 
import { Audio } from 'expo-av'; 
import { withNavigationFocus } from 'react-navigation';


const soundObject = new Audio.Sound();
 
function PlanScreen (props) {

    var cloudinary = "https://res.cloudinary.com/dvx36h3ub/image/upload/v1597066939/eglise-saint-eustache-plan_qaaqxd.png"; 
    
    const [colorInt,setColorInt] = useState([]);
    const [intPoint, setIntPoint] = useState([])
    const [extPoint, setExtPoint] = useState([])
    const [intPlan, setIntPlan] = useState('')
    const [extPlan, setExtPlan] = useState('')
    const [illustration, setIllustration] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [infoModal, setInfoModal] = useState({title: '', illustration: '', sound: ''})
    const [title, setTitle] = useState('')

    const [isPlaying, setIsPlaying] = useState (false)
    const [audioPosition, setAudioPosition] = useState('')
    const [audioTime, setAudioTime] = useState('')
    const [pointSelected, setPointSelected] = useState(null)
    
    var planInt = ''
    var planExt = ''
    var iconName = 'ios-play-circle'
    var iconColor = '#a2a1e5'
    
    
    props.isFocused ? console.log('focus') : console.log('pas focus')
    
    useEffect(()=>{
        const loadData = async ()=>{
            var allDataBack = await fetch(`http://10.2.3.92:3000/points-tour?guide=${props.typeVisit}&keyId=${props.idMonument}`)
            var allData = await allDataBack.json()
            console.log(allData, 'HANS INDUSTRY')

            var intData = []
            var extData = []
            var pointImage = []
            var sound = []
            var colorI = []
            var Title = []
           
            for(var i=0; i<allData.Guide.length; i++){
                if(allData.Guide[i].type == props.typeVisit){
                    for(var j=0; j<allData.Guide[i].point.length; j++){
                        var x = allData.Guide[i].point[j].coordx
                        var y = allData.Guide[i].point[j].coordy
                        var pointImage = allData.Guide[i].point[j].illustration
                        var title= allData.Guide[i].point[j].title
                        var sound = allData.Guide[i].point[j].audio[0].urlaudio
                        var Title = allData.placeName
                        
                        
                        
                        if(props.typeVisit == "interieur"){
                            intData.push({x:x, y:y, pointImage:pointImage, title:title, sound:sound, Title:Title});
                            planInt = allData.Guide[i].urlPlan
                            colorI.push(false)
                        } else if (props.typeVisit == "exterieur"){
                            extData.push({x:x, y:y, pointImage:pointImage, title:title, sound:sound, Title: Title})
                            planExt = allData.Guide[i].urlPlan
                        }
                    } 
            }
            setIntPoint(intData)
            setExtPoint(extData)
            setIntPlan(planInt)
            setExtPlan(planExt)
            setModalVisible(false)
            setColorInt(colorI)
            setTitle(Title)
            await soundObject.unloadAsync();
            }
         }
        loadData() 
        console.log('-----', title)
    },[])

    async function runAudio(arg) {       
         soundObject.setOnPlaybackStatusUpdate((test)=>{setAudioTime(test.durationMillis), setAudioPosition(test.positionMillis)})  
   
        try {
        
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

    async function runAudio2(arg2, sound) {  
           
        soundObject.setOnPlaybackStatusUpdate((test)=>{setAudioTime(test.durationMillis), setAudioPosition(test.positionMillis)})  
  
       try {
       
       if(!arg2){
            await soundObject.pauseAsync(); 
         
       } else {
           await soundObject.loadAsync({uri:sound}),
           await soundObject.playAsync();
       }
       // Don't forget to unload the sound from memory
       // when you are done using the Sound object
       // await soundObject.unloadAsync();
       } catch (error2) {
       // An error occurred!
       console.log(error2);
     }
     
     setIsPlaying(!isPlaying)
   }   

          

        // Logique de positionnement des points en fonction X et Y
        var handleClick = (title, illustration, sound, pos) =>{
            // setColor('#4D3D84')
            soundObject.loadAsync({uri : sound});
            setInfoModal({title, illustration, sound})
            setModalVisible(true)

      };

      if(isPlaying === true){
        iconName = 'pause-circle'
        }else {
        iconName = 'play-circle'
        }

       var handleClickExt = async () => {
           await soundObject.unloadAsync()
       }
           
        if(props.typeVisit == 'interieur'){

            var position = intPoint.map((point, i) => { 
                console.log(i) 
                var color
                pointSelected == i ? color='#4D3D84' : color='#a2a1e5'
                // Fonction du OnPress sur l'icone                                      
                return  <Ionicons 
                    key={i}
                    size={25} 
                    style={{zIndex: 1, position:"absolute", bottom:point.x, left:point.y }} 
                    name="ios-radio-button-on" 
                    md="md-radio-button-on" 
                    color={color}
                    onPress={() => {handleClick(point.title, point.pointImage, point.sound, i); setPointSelected(i)}}
                    />
                    
                    })
   
                     var image = intPlan

        } else if(props.typeVisit == 'exterieur'){

            var position = extPoint.map((point, i) => {
                if(point.x != null || point.y != null){
                // Fonction du OnPress sur l'icone 
                             
                   return <Ionicons 
                       key={i}
                       size={25} 
                       style={{zIndex: 1, position:"absolute", bottom:point.x, left:point.y }} 
                       name="ios-radio-button-off" 
                       md="md-radio-button-off" 
                       color="#a2a1e5"
                       onPress={() => handleClick(point.title, point.pointImage, point.sound, i)}
                       />
                } else {
                    return (
                        <View style={{ flexDirection:'row', justifyContent:'space-around', width: 350, position:'absolute', bottom:80, padding: 30}}>
                            <View style={{backgroundColor:'white', borderRadius:50, height:50, width:50, position:'absolute', bottom:40, left:80 }}></View>
                                <MaterialCommunityIcons style={{zIndex: 1}} name={iconName} size={70} color='#57508C' onPress={() => runAudio2(!isPlaying, point.sound) }/> 
                            
                            <View style={{backgroundColor:'white', borderRadius:50, height:50, width:50, position:'absolute', bottom:40, right:80 }}></View>
                                <MaterialCommunityIcons style={{zIndex: 1 }} onPress={() => {handleClickExt(); soundObject.stopAsync();  setIsPlaying(false)}} name='stop-circle' size={70} color='#57508C' /> 
                        </View>
                        
                        )
                }
                   }) 
                   var image = extPlan
                }
              
    return (
        <View style={{flexDirection: "column", flex:1, justifyContent: "center", alignItems: "center", backgroundColor: 'white'}}>
            <HeaderApp navigation={props.navigation}/>
                
                <ScrollView>
                    <View>
                        <Text style={{marginBottom:"2%", marginTop:'3%', fontSize:20, textAlign:'center'}}>{title}</Text>
                        <Text style={{marginBottom:"3%", fontSize:15, textAlign:"center"}}>Visite Guidée {props.typeVisit} </Text>
                       
                        <Image source={{uri:image}} style={{height:435, width:350, marginLeft: 1, borderRadius:20}}/>

                        {position}
                        <Button 
                            buttonStyle={{margin:20, backgroundColor:"white", borderColor:"#57508C", borderWidth:1, width:"60%", borderRadius:30, marginRight:"auto", marginLeft:"auto"}}
                            titleStyle={{color:"#57508C"}}
                            title="Accédez au quizz"
                            onPress={() => props.navigation.navigate("Quizz")}
                            color='#4D3D84'
                        />
                        
                        {/* <Button type="solid" title= "Accédez au Quizz" onPress={() => props.navigation.navigate("Quizz")} style={{width:200, marginLeft:"22%", marginTop:"2%", color: "#FFFFFF", borderRadius: '100%'}}/> */}

                     </View>
                
                </ScrollView>  

                <View style={styles.centeredView}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onBackdropPress={() => console.log("je cliiiiiiiique")}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{fontSize: 20, marginBottom: 15, marginTop:-20}}> {infoModal.title} </Text>
                            <Image source={{uri : infoModal.illustration}} style={{height: 200, width: 200, borderRadius: 100}} />
                                    
                                <View style={styles.controls}>
                                    <TouchableOpacity style={{display:'flex', flexDirection:'row', justifyContent:'space-around', width:150}} >
                                    <MaterialCommunityIcons onPress={() => runAudio(!isPlaying)} name={iconName} size={48} color='#57508C' />
                                    <MaterialCommunityIcons onPress={() => {soundObject.stopAsync(); setIsPlaying(false)}} name='stop-circle' size={48} color='#57508C' /> 
                                    </TouchableOpacity>
                                    {/* <View>
                                        <Scrubber 
                                            value={0}
                                            
                                            totalDuration={1000}
                                            trackColor='#666'
                                            scrubbedColor='#8d309b'
                                        />
                                    </View> */}
                                
                                </View>
                                    
                                <TouchableOpacity style={{ position:"absolute",right:20,top:10}}>
                                 <Ionicons 
                               name="ios-close" 
                               size={36} 
                               color="black" 
                               position="absolute"
                                    onPress={() => {
                                    setModalVisible(!modalVisible);
                                    {soundObject.unloadAsync();}
                                    setIsPlaying(false)
                                    }}
                                />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
     
                        
                </View> 
   

      
            <FooterApp navigation={props.navigation}/>
        </View>
            
            
    )
}

function mapStateToProps(state) {
    return { typeVisit : state.typeVisit, idMonument : state.idMonument}
  }
    
   var redux = connect(
    mapStateToProps, 
    null
  )(PlanScreen);

  export default withNavigationFocus(redux)


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0, 
    padding: 0
  },
  modalView: {
      marginTop: "auto",
      height: 330,
      width:'100%',
      marginBottom: 50,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      backgroundColor: "white",
      padding: 35,
      display:"flex", 
      alignItems:"center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
      shadowOffset: {
        width: 0,
        height:1
  }
}});


