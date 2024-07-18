import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { router , Link} from 'expo-router';

export default function Food({ path }: { path: string }) {
  return (
    <View>
        <Link href="/foodScreen" asChild>
    <Pressable >

            <View style={styles.card}
                // darkColor="black"
                darkColor="#353935"
                lightColor="white"            
            >
            {/* <ImageBackground source={require("../assets/images/glu.jpg")}   style={styles.image}> */}
            {/* <View style={{flexDirection:"row", borderRadius: 10, marginBottom:10}}> */}

                <View style={{margin:1, 

        paddingVertical: 10,
        marginBottom:10,
        paddingHorizontal: 0,
        borderRadius: 10,
        backgroundColor:"white"}}
                // darkColor="#353935"
                // lightColor="#F8F8FF" 
                >
                <Text style={styles.text}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"                 
                >Healthy Foods </Text>
                </View>
            {/* </View>  */}

        {/* <  Pressable style={styles.pressable} > */}
        <View style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white"}}>
        <View style={styles.pressable} 
            lightColor="#fffafa"
            darkColor= "#36454F" 
             >
            <Text 
            style={styles.text}
            // lightColor="rgba(255,255,255,0.8)"
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"   
            // darkColor="rgba(0,0,0,0.8)"            
            >Food</Text>
        </View>
        <View>
          <FontAwesome
                    name="cutlery"
                    size={40}
                    color={"brown"}
                    // style={{ margin: 15}}
                  />

        </View>
        </View>
            {/* </Pressable> */}
        {/* </ImageBackground> */}
            </View>
        
    </Pressable>
      {/* <View style={styles.getStartedContainer}>


        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </View> */}
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
        // backgroundColor:"#36454F",
        // backgroundColor:"#F8F8FF",
        // backgroundColor:"#F8F8FF",
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
