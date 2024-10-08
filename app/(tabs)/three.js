import { Dimensions, Text, View ,Image, ImageBackground, StyleSheet,ScrollView} from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useState, useEffect } from "react";
import axios from 'axios';


export default function infoScreen() {

  const width = Dimensions.get('window').width;

  const data = [
    { id: '1', content: 'Emergency' , uri: 'https://images.app.goo.gl/6YTr6xwdfJJcUdby7', source: require("../assets/1.jpg") },
    { id: '2', content: 'Updates on Diabetes', uri: 'https://example.com/image2.jpg', source: require("../assets/2.jpg")  },
    { id: '3', content: 'News' , uri: 'https://example.com/image3.jpg' , source: require("../assets/3.jpg") },
  ];
  useEffect(() => {
    // Fetch news data from the WHO API
    const fetchNews = async () => {
      try {
        // const response = await axios.get('https://who.int/api/news/blogposts'); 
        // const response = await axios.get('https://who.int/api/news/newsitems');  
        const response = await axios.get('https://api.fda.gov/drug/event.json?limit=1');     
        // Replace with the actual WHO API endpoint
        const useD = response.data
        console.log(useD.results[0].safetyreportid)

      } catch (err) {
        console.error(err);
      }
    };
  
    fetchNews();
  }, []);

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <View style={{  height:"28%"}}>
    <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={3000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                        }}
                    >

        <ImageBackground
            source={item.source}
            style={{
              // width: width - 40, // Add some padding or fit screen
              height: 200, // Adjust this to match the image aspect ratio
              borderRadius: 20, // Optional styling for rounded corners
              justifyContent:"center" , 
              alignItems:"center",
              marginHorizontal:5,

            }}
          >   

          <Text style={{ textAlign: 'center', fontSize: 30, color:"white" }}>
                         {item.content}
                        </Text>


          </ImageBackground>

                    </View>
                )}
            />
     </View>
    <ScrollView>

    <View style={styles.pressableH}>

    <Text style={styles.textP}>
    Diabetes
    </Text>

    </View>

    <View style={styles.card}>

    <Text style={styles.text}>

    Diabetes is a chronic metabolic disease characterized by persistent high blood glucose levels (sugars) 
    which over time lead to complication in the heart, kidneys, eyes, blood vessels and nerves.

    The most common types are: type 1 and type 2, 
    however there’s also gestational diabetes that develops in pregnant women.

        Type 1 diabetes previously known as juvenile or insulin dependent diabetes happens when there’s 
    little or no insulin produced by the pancreas.

        Type 2 diabetes previously termed as adult on-set or non-insulin dependent diabetes commonly 
    occurring in adults and account for over 90% of the diabetes cases.
    </Text> 
    </View>


   <View style={styles.pressableH}>
  <Text style={styles.textP}>
Symptoms



  </Text>
 </View>

 <View style={styles.card}>

  <Text style={styles.text}>
Symptoms of diabetes may occur suddenly. In T2D, symptoms can be mild and may take many years to be noticed.
These include the following:

  </Text>
  <View>
  <Text style={styles.text}>

. Feeling very thirsty.
. Needing to urinate more frequently that usual.
. Feeling tired.
. Blurred vision.
. Loosing weight unintentionally.

  </Text>  
  </View>
  <View>
  <Text style={styles.text}>

Over time diabetes can damage eyes, kidneys and nerves.
People with diabetes are at a higher risk of health problems including heart attacks, strokes and kidney failure.
Many people with diabetes develop problems with their feet due to nerve damage and poor blood flow leading to foot ulcers and amputation. 
  One of the most important ways to treat diabetes is to keep a health lifestyle (lifestyle modifications).
Type 1 patients need daily insulin injections for survival.
Some people with type 2 diabetes will need some medicines to help manage and control their blood glucose levels.
These medicines can include insulin or the following:

  </Text>  
  </View>
  <View>
  <Text style={styles.text}>
  . Biguanides
  . Sulphonyureas
  . Sodium-glucose co-transporters type 2 (SGLT-2) inhibitors. 
  </Text>  
  </View>

 </View>



 <View style={styles.pressableH}>
  <Text style={styles.textP}>
    Prevention
  </Text>
 </View>

 <View style={styles.card}>

  <Text style={styles.text}>
  Lifestyle changes are the best way to prevent or delay the onset of T2D.
  To prevent type 2, people should do the following:

  </Text>
  <View>
  <Text style={styles.text}>
  . Keep a healthy body weight.
  . Stay physically active by at least 30minutes of moderate intensity exercise daily.
  . Eat a healthy diet and avoid sugar and saturated fat.
  . Stop/avoid smoking.
  . Avoid excessive consumption of alcohol.
  </Text>
  
  </View>

 </View>
 </ScrollView>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F8F8F8'
      // backgroundColor:'#505050'

  },
        input: {
        height: 40,
        margin: 12,

        borderRadius:10,
        paddingVertical: 10,
        backgroundColor:"#ADD8E6"
        },
        inputP: {
        height: 40,
        margin: 12,
        width: 40,
        borderRadius:10,
        paddingVertical: 10,
        backgroundColor:"#ADD8E6"
        },

       card:{
        backgroundColor:"white",
            // backgroundColor:'#e0e0e0',
        padding:20,
        borderRadius:20,
        marginHorizontal: 15,
        marginBottom: 15,
        
        },
       cardP:{
        flexDirection:"row"     
        },
        button:{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 10,
          elevation: 1,

        },
          textP: {
          fontSize: 20,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          paddingVertical: 3,
          color:"white",
          fontFamily:"sans-serif-condensed"
        }, 
          text: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          color:"black",
          fontFamily:"sans-serif-condensed"
        },  image: {

          borderTopLeftRadius: 40,
          justifyContent: 'center',
          margin:15
        },
            pressable: {
        alignItems:"center",
        justifyContent:"flex-end",
        backgroundColor:"#353839",
        paddingVertical: 12,
        paddingHorizontal: 2,
        marginHorizontal:19,
        borderRadius: 15,
        elevation: 1,
    
    },
            pressableS: {
        alignItems:"center",
        justifyContent:"flex-end",
        backgroundColor:"green",
        paddingVertical: 12,
        paddingHorizontal: 2,
        marginHorizontal:19,
        marginBottom: 10,
        borderRadius: 15,
        elevation: 1,
    
    },
            pressableH: {
        alignItems:"center",
        justifyContent:"flex-end",
        backgroundColor:"#353839",
        paddingVertical: 12,
        paddingHorizontal: 2,
        marginHorizontal:19,
        marginVertical:10,
        borderRadius: 15,
        elevation: 1,
    
    },
});
