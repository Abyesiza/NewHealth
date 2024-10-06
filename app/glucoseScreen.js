import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Dimensions, TextInput } from "react-native";
import { useState, useEffect , useRef} from "react";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


export default function GlucoseScreen() {

    const [glucoseValue, setGlucoseValue] = useState(""); // Use state for glucose value
    const screenWidth = Dimensions.get("window").width;
    const [gdata, setGData] = useState([0])
    const [glabel, setGLabel] = useState([""])

     const [expoPushToken, setExpoPushToken] = useState('');
     const [outCome, setOutCome] = useState("First Enter your Glucose level to see your diagnosis")
     const [Recomed,setRecomend] = useState("We shall provide you recommendations depending on the diagnosis")


     useEffect(()=>{

async function fetchData() {
  try {
    const value = await AsyncStorage.getItem('my-glucose');
    const label = await AsyncStorage.getItem('my-glabels');    
    if (value !== null & label !== null) {
      // value previously stored
    setGData([...gdata,value])   
    setGLabel([...glabel,label])       
    }
  } catch (e) {
    // error reading value
    console.log(e)
  }
}
fetchData()

  //  console.log("registering for push token")
    registerForPushNotificationsAsync().then(token => {
      // console.log(token)
      setExpoPushToken(token)}).catch((error) => {console.log(error)});
  },[])


  const Add = async () => {
    const dDate = new Date().getHours() + ":" + new Date().getMinutes();
    if (glucoseValue<70) {
              await schedulePushNotificationL();
      setOutCome("You have low blood sugar levels, We advise you to eat or drink something with simple sugars.")
      setRecomend("For example 1/2 cup (120 ml) of juice or regular soda. 3-4 glucose tablets. 1 tablespoon of honey or sugar. 5-6 pieces of hard candy (like Lifesavers).")
    } else if(glucoseValue>180) {
      await schedulePushNotificationH();
      setOutCome("You have high high blood sugar levels, we advise you to take insulin, drink water,and exercise")
      setRecomend("Drink water: Helps your body flush excess sugar through urine and prevents dehydration.Physical activity: Light exercise, like walking, can help lower blood sugar (avoid exercising if blood sugar is above 250 mg/dL and you have ketones present). Adjust food intake: Avoid sugary foods, refined carbs, and large meals until blood sugar normalizes. Follow your treatment plan: If you're on insulin or oral medications, you may need to adjust your dose (consult your doctor for specific instructions). Monitor your blood sugar frequently to track changes.")
    } else {
      await schedulePushNotificationN();
      setOutCome("You have normal blood sugar levels")
      setRecomend("Maintain a balanced diet: Focus on a mix of carbohydrates, proteins, and healthy fats. Regular physical activity: Helps maintain normal blood sugar levels. Monitor regularly: Even if your levels are normal, checking regularly helps prevent fluctuations. Stay hydrated: Drink plenty of water to assist in blood sugar regulation. Sleep well: Aim for 7-9 hours of sleep, as poor sleep can affect blood sugar control")
    }

    setGData([...gdata,glucoseValue])
    setGLabel([...glabel,dDate])

  // try {
    await AsyncStorage.setItem('my-glucose', glucoseValue);
    await AsyncStorage.setItem('my-glabels', dDate);
  // } catch (e) {
  //   // saving error
  // }
// };
    setGlucoseValue("")
  }
  const recentData = gdata.slice(-4);
  const recentLabel = glabel.slice(-4);
    const data = {
  labels: recentLabel,
  datasets: [
    {

      data: recentData,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Glucose"] // optional
};
const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

  return (
    <View style={styles.container}>
    <ScrollView>

<View style={{justifyContent:"space-evenly"}}>
        {/* <Text style={styles.text}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"      
        >
        Line graph showing the daily Glucose level
        </Text> */}
  <View style={{
        elevation: 3,
        padding:20,
        borderRadius:25,
        marginHorizontal: 9,
        marginBottom: 9,
        backgroundColor: 'white',
        shadowColor: 'green', // Shadow color
        // shadowOffset: { width: 4, height: 4 }, // Shadow offset (x, y)
        shadowOpacity: 3, // Shadow opacity
        shadowRadius: 3, // Shadow radius
            }}>
     <LineChart
  data={data}
  width={screenWidth}
  height={220}
  yAxisLabel="mg/dL"
  chartConfig={chartConfig}
   bezier
/>  
  </View>

        {/* <Text style={styles.text}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"      
        >
      Bar Chart showing the daily Glucose level
        </Text> */}
{/* <BarChart
  style={styles.graphStyle}
  data={data}
  width={screenWidth}
  height={220}


  chartConfig={chartConfig}
  verticalLabelRotation={30}
/> */}
</View>
      <View style={{flexDirection:"row", paddingHorizontal:20, justifyContent:"space-evenly"}}>

       <TextInput
          style={{       
          height: 40,
          width:250,
          margin: 12,
          borderRadius:10,
          paddingVertical: 10,
          backgroundColor:"#F8F8FF",
          // backgroundColor:"E8E4C9",
          elevation:2
          // backgroundColor:"#ADD8E6"         
          }}
          numberOfLines={2}
          maxLength={40}
          onChangeText={(text) => setGlucoseValue(text)} // Update this line
          placeholder='Enter '
          blurOnSubmit={true}
          value={glucoseValue} 


          keyboardType="numeric"
          
        />
        <Pressable style={{backgroundColor:"orange", justifyContent:"center", alignItems:"center", margin:12, width:60, borderRadius:10}}
        onPress={Add}>
        <Text style={styles.text}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"      
        >
        Add
        </Text>
        </Pressable>

      </View>
      <View style={{
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
            }}>
      <Text style={styles.text}>
      {outCome}
      </Text>
      </View>
      <View style={{
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
            }}>
<View style = {{       
        alignItems:"center",
        justifyContent:"flex-end",
        paddingVertical: 7,
        paddingHorizontal: 2,
        backgroundColor:"lightblue",
        borderRadius:25,
    }}>
<Text style= {{
          fontSize: 17,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",}}
 >
        Recommendations
      </Text>
</View>

      <Text style={styles.text}>
      {Recomed}
      </Text>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </ScrollView>
    </View>
  );
}
async function schedulePushNotificationL() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Blood sugar is low",
      body: "We advise you to eat or drink something with simple sugars like a snack",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
async function schedulePushNotificationH() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Blood sugar is high",
      body: "We advise you to take insulin, drink water,and exercise",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
async function schedulePushNotificationN() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Normal blood sugar levels",
      body: "You have normal blood sugar levels",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'cf65941b-84d7-4282-bab0-20cc4e1d02b7' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: '#F8F8F8'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  graphStyle: {
    marginTop:20
  },
            text: {
          fontSize: 18,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          marginVertical:5,
          paddingLeft:10,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        }
});
