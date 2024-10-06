import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';
import { router , Link} from 'expo-router';

export default function Reminder() {
  return (
    <View>
        <Link href="/appointScreen" asChild>
    <Pressable >

            <View style={styles.card}
                // darkColor="black"
                darkColor="#353935"
                lightColor="white"            
            >


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
               
                >Appointment Reminders </Text>

                </View>

            <View style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white"}}> 
        <View style={styles.pressable} 

            >
            <Text 
            style={styles.text}
           
            >Schedule</Text>
        </View>
                                                  <FontAwesome
                    name="bell"
                    size={30}
                    color={"green"}
                    // style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />


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

        },
          text: {
          fontSize: 17,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        },         textT: {
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
