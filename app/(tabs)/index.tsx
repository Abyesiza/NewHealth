import { ScrollView, StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EditScreenInfo from '@/components/EditScreenInfo';
import Glucose from '@/components/glucose';
import BP from '@/components/bp';
import Food from '@/components/foods';
import Reminder from '@/components/reminder';
import MReminder from '@/components/medicate'
import { router , Link} from 'expo-router';
import { Dimensions, Text, View ,Image, ImageBackground} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';


export default function TabOneScreen() {
  const width = Dimensions.get('window').width;

  const data = [
    { id: '1', content: 'Slide 1' , uri: 'https://images.app.goo.gl/6YTr6xwdfJJcUdby7', source: require("../assets/1.jpg") },
    { id: '2', content: 'Slide 2', uri: 'https://example.com/image2.jpg', source: require("../assets/2.jpg")  },
    { id: '3', content: 'Slide 3' , uri: 'https://example.com/image3.jpg' , source: require("../assets/3.jpg") },
  ];
  return (

    <SafeAreaProvider>
    <View style={styles.container}>
    <Link href="/register" asChild>
    <Pressable style={styles.profile}>
                    <FontAwesome
                    name="user-circle-o"
                    size={30}
                    color={"grey"}
                    // style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />        
    </Pressable>
    </Link> 

    <View 
    style={styles.titleH}
    >
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
                        
                        HealthApp
                        {item.content}
                        </Text>


          </ImageBackground>

                    </View>
                )}
            />

    </View>

    <ScrollView>

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <Glucose />
      <BP />
      <Reminder   />
      <MReminder />



      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Food  path="app/(tabs)/index.tsx" />
      </ScrollView>
    </View>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    paddingTop:50
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignItems:"center",
    justifyContent:"center",
    letterSpacing: 0.1,
    //   color:"black",
      fontFamily:"sans-serif-condensed",
  },  
  titleH: {
    height:"25%"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profile : {
    marginLeft: 350,
    paddingBottom: 5
  }
});
