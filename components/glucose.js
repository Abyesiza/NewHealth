import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { router , Link} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect , useRef} from "react";

export default function Glucose() {
const [glevel, setGLevel] = useState()
const [glabel, setGLabel] = useState()
  useEffect(()=>{

    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('my-glucose');
        const label = await AsyncStorage.getItem('my-glabels');    
        if (value !== null & label !== null) {
          // value previously stored
        setGLevel(value)   
        setGLabel(label)       
        }
      } catch (e) {
        // error reading value
        console.log(e)
      }
    }
    fetchData()
    
      // //  console.log("registering for push token")
      //   registerForPushNotificationsAsync().then(token => {
      //     // console.log(token)
      //     setExpoPushToken(token)}).catch((error) => {console.log(error)});
      },[])
  return (
    <View>
        <Link href="/glucoseScreen" asChild>
    <Pressable >

            <View style={styles.card} >
            {/* <ImageBackground source={require("../assets/images/glu.jpg")}   style={styles.image}> */}
            {/* <View style={{flexDirection:"row", borderRadius: 10, marginBottom:10}}> */}

                <View 
                style={{margin:1, 
                paddingVertical: 10,
                marginBottom:10,
                paddingHorizontal: 0,
                borderRadius: 10,
                backgroundColor:"white"}}
                // darkColor="#353935"
                // lightColor="#F8F8FF"                  
                >
  
                <Text style={styles.textT}>Glucose Level</Text>
                </View>
            {/* </View>  */}
            <View style={{flexDirection:"row", justifyContent:"space-between",
               backgroundColor: "white"
               }}> 


              <View style={{flexDirection:"row", justifyContent:"center", alignSelf:"center",
               backgroundColor: "beige", padding:10, borderRadius:10
               }}>
                <Text style={styles.text}>It was mg/dl {glevel} at {glabel} hours</Text>
              </View>
              <View style={styles.pressable}  >
            <Text 
            style={styles.text}>Enter </Text>
        </View>

            </View>
            </View>
        
    </Pressable>

      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
         card:{
        elevation: 3,
        padding:20,
        borderRadius:25,
        marginHorizontal: 9,
        marginBottom: 9,
        backgroundColor: 'white',
        shadowColor: 'white', // Shadow color

        // shadowOffset: { width: 4, height: 4 }, // Shadow offset (x, y)
        shadowOpacity: 3, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        
        // box-shadow: 2px 3px 3px 3px rgba(26, 12, 12, 0.1), 
        },
        button:{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 9,
          paddingHorizontal: 32,
          borderRadius: 10,
          elevation: 1,
          // backgroundColor:""
          
          // backgroundColor: 'ne',
        },
          text: {
          fontSize: 17,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        }, 
        textT: {
          fontSize: 20,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        }, 
         image: {
          // flex: 1,
          borderTopLeftRadius: 40,
          justifyContent: 'center',
          margin:15
        },

            pressable: {
        alignItems:"center",
        justifyContent:"flex-end",
        // backgroundColor:"#FAF9F6",
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 10,

        elevation: 1,
    
    },
              pressableI: {
        alignItems:"center",
        justifyContent:"flex-end",
        paddingVertical: 7,
        paddingHorizontal: 2,
    
    },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
