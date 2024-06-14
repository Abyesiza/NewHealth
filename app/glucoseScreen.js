import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Dimensions, TextInput } from "react-native";
import { useState, useEffect , useRef} from "react";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

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
    const [outCome, setOutCome] = useState("")
     const [expoPushToken, setExpoPushToken] = useState('');

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
    } else if(glucoseValue>180) {
      await schedulePushNotificationH();
      setOutCome("You have high high blood sugar levels, we advise you to take insulin, drink water,and exercise")
    } else {
      await schedulePushNotificationN();
      setOutCome("You have normal blood sugar levels")
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

    const data = {
  labels: glabel,
  datasets: [
    {
      data: gdata,
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
  <View>
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
      <View style={{backgroundColor:"white", padding:20, elevation:1, borderRadius:10, margin:10}}>
      <Text style={styles.text}>
      {outCome}
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
    paddingTop:20
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
