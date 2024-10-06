import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';
import { router , Link} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect , useRef} from "react";

export default function BP(props) {
  const [blevel, setBLevel] = useState()
const [blabel, setBLabel] = useState()
  useEffect(()=>{

    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('my-bp');
        const label = await AsyncStorage.getItem('my-blabels');    
        if (value !== null & label !== null) {
          // value previously stored
        setBLevel(value)   
        setBLabel(label)       
        }
      } catch (e) {
        // error reading value
        console.log(e)
      }
    }
    fetchData()

      },[])

  return (
    <View>
        <Link href="/bpScreen" asChild>
    <Pressable >

            <View style={styles.card}
                // darkColor="black"
                darkColor="#353935"
                // lightColor="#F8F8FF"    
                lightColor='white'        
            >
            {/* <ImageBackground source={require("../assets/images/glu.jpg")}   style={styles.image}> */}


                <View 
                style={{margin:1,
                flexDirection:"row",
                justifyContent:"space-between", 
                paddingVertical: 10,
                marginBottom:10,
                paddingHorizontal: 0,
                borderRadius: 10,
                backgroundColor:"white"}}

                >
                <Text style={styles.textT}
               
                >Blood pressure Level </Text>

                </View>
            <View style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white"}}> 

                            <View style={{flexDirection:"row", justifyContent:"center", alignSelf:"center",
               backgroundColor: "beige", padding:10, borderRadius:10
               }}>
                <Text style={styles.text}>It was mmHg {blevel} at {blabel} hours</Text>
              </View>
        <View style={styles.pressable} 

             >
            <Text 
            style={styles.text}
          
            >Enter</Text>
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
        shadowOpacity: 3, // Shadow opacity
        shadowRadius: 3, // Shadow radius
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
        textT: {
          fontSize: 20,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        }, 
          text: {
          fontSize: 17,
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