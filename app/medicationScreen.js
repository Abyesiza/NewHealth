import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, TextInput,ScrollView, Text, View, Platform , Button} from "react-native";
import { useState, useEffect} from "react";
// import { Text, View } from '@/components/Themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MedicateScreen() {
  const [drugName, setDrugName] = useState(" ")
  const [nTabs, setNTabs] = useState()
  const [nTimes, setNTimes] = useState()


    const [date, setDate]= useState(new Date())


    const [showMD, setShowMD] = useState(false);
    const [showMT, setShowMT] = useState(false);

    const [mode,setMode] = useState('date');


    // const [medicatVisible, setMedicatVisible] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');

    const [dateValue, setDateValue] = useState("")
     

     useEffect(()=>{
   console.log("registering for push token")
    registerForPushNotificationsAsync().then(token => {
      console.log(token)
      setExpoPushToken(token)}).catch((error) => {console.log(error)});
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  },[])




    const onMedicat = () => {
        // setMedicatVisible(!medicatVisible)
  
      
    }



    const onChangeMD = (e, selecteddate) =>{
        setDate(selecteddate)
        setDateValue(selecteddate)
        // setDate(selecteddate)
        setShowMD(false)
        console.log(dateValue)
    };
    const onChangeMT = (e, selecteddate) =>{
        setDate(selecteddate)
        setDateValue(selecteddate)
        // setDate(selecteddate)
        setShowMT(false)
        console.log(dateValue)
    };
        
    

    const onMedicatSave = async () => {
      await scheduleMedicationNotification();
        // onMedicat()
     
    }



    const showModeMT = (modeToShow) => {
        setShowMT(true)
        setMode(modeToShow)
    }
    const showModeMD = (modeToShow) => {
        setShowMD(true)
        setMode(modeToShow)
    }

  return (
    <View style={styles.container}>

      {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
<ScrollView>



        <View 
        // style={styles.card}
        >

        <Pressable style={styles.pressableH} onPress={() => onMedicat()}>
        <Text style={styles.textHeader}>Schedule medication reminder</Text>
        </Pressable>    
        
        </View>

{/* 
        {
            medicatVisible && ( */}
 <View>
        <View style={styles.card}>
         <Text style={styles.text}>Drug name</Text>
        <TextInput 
        style={styles.input}
        onChangeText={ setDrugName}
        value={drugName}
        />
        </View>
 

        <View style={styles.card}>
         <Text style={styles.text}>Enter prescription</Text>
        <View style={styles.cardP}>
        <TextInput
        style={styles.inputP} keyboardType="numeric" onChangeText={ setNTabs} value={nTabs}/>

        <Text style={styles.textP}>X</Text>

        <TextInput
        style={styles.inputP} keyboardType="numeric" onChangeText={setNTimes} value={nTimes}/>
        
        </View>
        </View> 

        <View style={styles.card}>
        <Text style={styles.text}>Enter start date</Text>
        <TextInput 
        onPressIn={() => showModeMD("date")}
        style={styles.input} />
        </View> 
       {
            showMD && (
                <DateTimePicker
                value={date}
                mode={mode} 
                is24Hour={true}
                onChange={onChangeMD}

                
                />
            )
        }        
        <View style={styles.card}>
        <Text style={styles.text}>Enter start date</Text>
        <TextInput 
        onPressIn={() => showModeMT("time")}
        style={styles.input} />        
        {
            showMT && (
                <DateTimePicker
                value={date}
                mode={mode} 
                is24Hour={true}
                onChange={onChangeMT}

                
                />
            )
        }
        </View> 

        <Pressable style={styles.pressableS} onPress={() => onMedicatSave()}>
        <Text style={styles.textHeader}>SAVE</Text>
        </Pressable>         
        </View> 

 
            {/* )
        } */}

               

        </ScrollView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}
async function scheduleAppointmentNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Appointment",
      body: 'Reminder has been set',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
async function scheduleMedicationNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Medication",
      body: 'Reminder has been set',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
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
    backgroundColor:"beige"

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
        // backgroundColor:"#36454F",
        padding:20,
        borderRadius:20,
        marginHorizontal: 15,
        marginBottom: 15,
        
        },
       cardP:{
        flexDirection:"row",
          
        },
        button:{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 10,
          elevation: 1,
          // backgroundColor:""
          
          // backgroundColor: 'ne',
        },
          textP: {
          fontSize: 30,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          paddingVertical: 10,
          marginTop:17,
          color:"#36454F",
          fontFamily:"sans-serif-condensed"
        },
          textHeader: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          color:"white",
          fontFamily:"sans-serif-condensed"
        },  
          text: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          color:"#36454F",
          fontFamily:"sans-serif-condensed"
        },  image: {
          // flex: 1,
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
