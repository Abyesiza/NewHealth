import { StatusBar } from 'expo-status-bar';
import {Modal,Alert, StyleSheet, Pressable, TextInput,ScrollView, Text, View, Platform , Button, TouchableOpacity} from "react-native";
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

export default function AppointScreen() {
  const [hospital, setHospital] = useState("")
  const [doctorName, setDoctorName] = useState("")
  const [Notes, setNotes] = useState("")
  const [dateValue, setDateValue] = useState("")
  const [dateEValue, setEDateValue] = useState("")

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate]= useState(new Date())
  const [Edate, setEDate]= useState(new Date())

  const [showAD, setShowAD] = useState(false);
  const [showAT, setShowAT] = useState(false);

  const [EshowAD, setEShowAD] = useState(false);
  const [EshowAT, setEShowAT] = useState(false);
  const [mode,setMode] = useState('date');
  const [Emode,setEMode] = useState('date');
  const [expoPushToken, setExpoPushToken] = useState('');

  const onAppointSave = async () => {
    await scheduleAppointmentNotification();
    const triggerDate = new Date(date.getTime() - 60 * 1000); // 1 minute before appointment

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget!",
        body: 'You have an appointment soon!',
      },
      trigger: { date: triggerDate },
    });

    createCalendarEvent();   
    console.log(hospital)
    console.log(doctorName)
    console.log(Notes)
    console.log(dateValue)
    console.log(dateEValue)

    setModalVisible(!modalVisible)
}
const createCalendarEvent = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === 'granted') {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    console.log('Here are all your calendars:');
    console.log({ calendars });

    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Health app',
      color: 'yellow',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    await Calendar.createEventAsync(newCalendarID, {
      title: hospital,
      startDate: dateValue,
      endDate:dateEValue,
      // endDate: new Date(date.getTime() + 60 * 60 * 1000), // 1 hour duration
      timeZone: 'GMT',
      notes: 'Annual check-up with Dr. Smith',
    });
  }
};

const getDefaultCalendarSource = async () => {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
};
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




    const onChangeAD = (e, selecteddate) =>{
        setDate(selecteddate)
        setDateValue(selecteddate)
        // setDate(selecteddate)
        setShowAD(false)
        console.log(dateValue)
    };
    const onChangeAT = (e, selecteddate) =>{
        // setDate(selecteddate)
        setDateValue(selecteddate)
        // setDate(selecteddate)
        setShowAT(false)
        console.log(dateValue)
    };

  const onEChangeAT = (e, selecteddate) =>{

      setEDateValue(selecteddate)
      setEShowAT(false)
      console.log(dateEValue)
  };



    const showModeAT = (modeToShow) => {
        setShowAT(true)
        setMode(modeToShow)
    }
    const showModeAD = (modeToShow) => {
        setShowAD(true)
        setMode(modeToShow)
    }
    const showEModeAT = (modeToShow) => {
  
      setEShowAT(true)
      setEMode(modeToShow)
  }

  return (
    <View style={styles.container}>
<View style={styles.card}>

<Pressable style={styles.pressableA} >
<Text style={styles.textHeader}>Appointments </Text>
</Pressable>   
<Text style={styles.textA}>|Grade B, Dr Awum Drake, At 12:30 am to 13:40 am </Text>
<Text style={styles.textA}>|Kalule, Dr Juwem Owen, At 12:30 am to 13:40 am </Text>
</View>

<View style={styles.card}>


<Pressable style={styles.pressableH} onPress={() => setModalVisible(true)} >
<Text style={styles.textHeader}>Schedule appointment</Text>
</Pressable>   

</View>
<Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Appointment has been set.');
          setModalVisible(!modalVisible);
        }}>

        <ScrollView>





<View>
<View style={styles.card}>
 <Text style={styles.text}>Hospital name</Text>
<TextInput 
style={styles.input} 
onChangeText={setHospital}
value={hospital}
/>

 <Text style={styles.text}>Doctors name (optional)</Text>
<TextInput 
style={styles.input}
onChangeText={setDoctorName}
value={doctorName}
 />
</View>   

<View style={styles.card}>
<Text style={styles.text}>Brief notes about your visit</Text>
<TextInput 
editable
multiline
numberOfLines={8}
maxLength={40}
style={styles.input} 
onChangeText={setNotes}
value={Notes}
/>

</View>

<View style={styles.card}>
  <View style={styles. pressableH}>
  <Text style={styles.textHeader}>Enter date</Text>
  </View>

      <TouchableOpacity style={{backgroundColor:"#ADD8E6", marginHorizontal:25, paddingHorizontal:30,paddingVertical:10, borderRadius:18}} onPress={() => showModeAD("date")} >
      <Text>Pick Day</Text>
      </TouchableOpacity>

      <View style={{flexDirection:"row"}}>

      <TouchableOpacity style={{backgroundColor:"#ADD8E6", marginHorizontal:25, paddingHorizontal:30,paddingVertical:10, borderRadius:18}} onPress={() => showModeAT("time")} >
      <Text>Pick Start time</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:"#ADD8E6", marginHorizontal:25, paddingHorizontal:30,paddingVertical:10, borderRadius:18}} onPress={() => showEModeAT("time")} >
      <Text>Pick End time</Text>
      </TouchableOpacity>

      </View>

<Text style={styles.selectedTime}>Selected Time: {date.toLocaleString()}</Text>

{
    showAD && (
        <DateTimePicker
        value={date}
        mode={mode} 
        is24Hour={true}
        onChange={onChangeAD}

        
        />
    )
}


<Text style={styles.selectedTime}>Selected Time: {dateValue.toLocaleString()}</Text>
{
    showAT && (
        <DateTimePicker
        value={dateValue}
        mode={Emode} 
        is24Hour={true}
        onChange={onChangeAT}       
        />
    )
}

{
    EshowAT && (
        <DateTimePicker
        value={dateValue}
        mode={Emode} 
        is24Hour={true}
        onChange={onEChangeAT}       
        />
    )
}
</View>         

</View>            
</ScrollView>
<Pressable style={styles.pressableS} onPress={() => onAppointSave()}>
<Text style={styles.textHeader}>SAVE</Text>
</Pressable>          

</Modal>

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
    backgroundColor:'#F8F8F8'

  },
  button: {
    backgroundColor: "blue", // Green background color
    borderRadius: 20, // Rounded corners
    padding: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
        textA: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          color:"black",
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
    pressableA: {
      alignItems:"center",
      justifyContent:"flex-end",
      backgroundColor:"green",
      paddingVertical: 12,
      paddingHorizontal: 2,
      // marginHorizontal:19,
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
        // marginHorizontal:19,
        marginVertical:10,
        borderRadius: 15,
        elevation: 1,
    
    },
});
