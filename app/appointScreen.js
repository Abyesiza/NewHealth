import { StatusBar } from 'expo-status-bar';
import { Modal, Alert, StyleSheet, Pressable, TextInput, ScrollView, Text, View, Platform, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
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

const COLORS = {
  primary: '#353839',
  secondary: '#ADD8E6',
  white: '#FFFFFF',
  black: '#000000',
  green: 'green',
};

export default function AppointScreen() {
  const [hospital, setHospital] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [datePickerTarget, setDatePickerTarget] = useState('startDate'); // Track which date/time to set

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    (async () => {
      await registerForPushNotificationsAsync();
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      } else {
        console.log("Failed to get permission");
      }
    })();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
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
      token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      console.log('Expo Push Token:', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  const createCalendarReminder = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };

    // Create a new calendar if necessary
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

    const startDateTime = combineDateAndTime(startDate, startTime);
    const endDateTime = combineDateAndTime(startDate, endTime);

    // Create a reminder or event in the calendar
    const reminderId = await Calendar.createEventAsync(newCalendarID, {
      title: `Appointment at ${hospital}`,
      location: hospital,
      notes: notes,
      startDate: startDateTime,
      endDate: endDateTime,
      alarms: [{ relativeOffset: -10, method: Calendar.AlarmMethod.ALERT }], // 10 minutes before the appointment
    });

    console.log('Created event/reminder with id:', reminderId);
  };

  const combineDateAndTime = (date, time) => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    return combined;
  };

  const onAppointSave = async () => {
    if (!hospital || !startDate || !endDate || !startTime || !endTime) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    // Schedule a push notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget!",
        body: `You have an appointment at ${hospital} soon!`,
      },
      trigger: { date: new Date(combineDateAndTime(startDate, startTime).getTime() - 60 * 1000) }, // 1 minute before appointment
    });

    // Create calendar event
    await createCalendarReminder();

    const permissions = await Notifications.getPermissionsAsync();
    console.log('Notification Permissions:', permissions);
    console.log('Expo Push Token:', expoPushToken);

    Alert.alert('Success', 'Appointment saved successfully.');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.label}>Hospital</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Hospital Name"
            value={hospital}
            onChangeText={setHospital}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Doctor Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Doctor Name"
            value={doctorName}
            onChangeText={setDoctorName}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Notes"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('date'); setDatePickerTarget('startDate'); }}>
            <Text style={styles.input}>{startDate.toDateString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('time'); setDatePickerTarget('startTime'); }}>
            <Text style={styles.input}>{startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('time'); setDatePickerTarget('endTime'); }}>
            <Text style={styles.input}>{endTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={
              datePickerTarget === 'startDate'
                ? startDate
                : datePickerTarget === 'endDate'
                  ? endDate
                  : datePickerTarget === 'startTime'
                    ? startTime
                    : endTime
            }
            mode={datePickerMode}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                if (datePickerMode === 'date') {
                  if (datePickerTarget === 'startDate') {
                    setStartDate(selectedDate);
                  } else if (datePickerTarget === 'endDate') {
                    setEndDate(selectedDate);
                  }
                } else {
                  if (datePickerTarget === 'startTime') {
                    setStartTime(selectedDate);
                  } else if (datePickerTarget === 'endTime') {
                    setEndTime(selectedDate);
                  }
                }
              }
            }}
          />
        )}
        <Pressable style={styles.button} onPress={onAppointSave}>
          <Text style={styles.buttonText}>Save Appointment</Text>
        </Pressable>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F8F8F8',
    padding: 16,

  },
  card:{
    elevation: 3,
    padding:20,
    borderRadius:20,
    marginHorizontal: 3,
    marginBottom: 8,
    backgroundColor: 'white',
    shadowColor: 'white', // Shadow color
    shadowOpacity: 3, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    },
  label: {
    color: "black",
    marginBottom: 10,
  },
  input: {
    backgroundColor:"#ADD8E6",
    padding: 8,
    // marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal:20
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   card: {
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   label: {
//     fontWeight: 'bold',
//     color: COLORS.black,
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: COLORS.secondary,
//     padding: 10,
//     borderRadius: 5,
//     color: COLORS.black,
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginHorizontal: 15,
//     marginBottom: 30,
//   },
//   buttonText: {
//     color: COLORS.white,
//     fontWeight: 'bold',
//   },
// });

// import { StatusBar } from 'expo-status-bar';
// import { Modal, Alert, StyleSheet, Pressable, TextInput, ScrollView, Text, View, Platform, TouchableOpacity } from "react-native";
// import { useState, useEffect } from "react";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import * as Calendar from 'expo-calendar';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// const COLORS = {
//   primary: '#353839',
//   secondary: '#ADD8E6',
//   white: '#FFFFFF',
//   black: '#000000',
//   green: 'green',
// };

// export default function AppointScreen() {
//   const [hospital, setHospital] = useState("");
//   const [doctorName, setDoctorName] = useState("");
//   const [notes, setNotes] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [endTime, setEndTime] = useState(new Date());

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [datePickerMode, setDatePickerMode] = useState('date');
//   const [datePickerTarget, setDatePickerTarget] = useState('startDate'); // Track which date/time to set

//   const [expoPushToken, setExpoPushToken] = useState('');

//   useEffect(() => {
//     (async () => {
//       await registerForPushNotificationsAsync();
//       const { status } = await Calendar.requestCalendarPermissionsAsync();
//       if (status === 'granted') {
//         const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
//         console.log('Here are all your calendars:');
//         console.log({ calendars });
//       } else {console.log("Failed to get permission")}

//     })();
//   }, []);

//   const registerForPushNotificationsAsync = async () => {
//     let token;
//     if (Device.isDevice) {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       setExpoPushToken(token);
//       console.log('Expo Push Token:', token);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }

//     if (Platform.OS === 'android') {
//       await Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }
//   };

//   async function getDefaultCalendarSource() {
//     const defaultCalendar = await Calendar.getDefaultCalendarAsync();
//     return defaultCalendar.source;
//   }

//   const createCalendarReminder = async () => {
//   const defaultCalendarSource =
//     Platform.OS === 'ios'
//       ? await getDefaultCalendarSource()
//       : { isLocalAccount: true, name: 'Expo Calendar' };

//   const newCalendarID = await Calendar.createCalendarAsync({
//     title: 'Expo Calendar',
//     color: 'blue',
//     entityType: Calendar.EntityTypes.EVENT,
//     sourceId: defaultCalendarSource.id,
//     source: defaultCalendarSource,
//     name: 'internalCalendarName',
//     ownerAccount: 'personal',
//     accessLevel: Calendar.CalendarAccessLevel.OWNER,
//   });
//   console.log(`Your new calendar ID is: ${newCalendarID}`);

//     // Create a reminder in the newly created calendar or use an existing one
//     const reminderId = await Calendar.createCalendarAsync(newCalendarID, {
//       title: hospital,
//       notes: notes,
//       startDate: startDate,
//       dueDate: endTime, // 1 hour later
//       alarms: [{ relativeOffset: -10, method: Calendar.AlarmMethod.ALERT }], // 10 minutes before the due date
//     });
  
//     console.log('Created reminder with id:', reminderId);
//   };

//   const combineDateAndTime = (date, time) => {
//     const combined = new Date(date);
//     combined.setHours(time.getHours());
//     combined.setMinutes(time.getMinutes());
//     return combined;
//   };

//   const onAppointSave = async () => {
//     if (!hospital || !startDate || !endDate || !startTime || !endTime) {
//       Alert.alert('Error', 'Please fill all required fields.');
//       return;
//     }

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Don't forget!",
//         body: 'You have an appointment soon!',
//       },
//       trigger: { date: new Date(combineDateAndTime(startDate, startTime).getTime() - 60 * 1000) }, // 1 minute before appointment
//     });

//     await createCalendarReminder();

//     const permissions = await Notifications.getPermissionsAsync();
//     console.log('Notification Permissions:', permissions);
//     console.log('Expo Push Token:', expoPushToken);

//     Alert.alert('Success', 'Appointment saved successfully.');
//   };

//   return (
//     <View  style={styles.container}>

//     <ScrollView>
//       <View style={styles.card}>
//       <Text style={styles.label}>Hospital</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Hospital Name"
//         value={hospital}
//         onChangeText={setHospital}
//       />
//       </View>

//       <View style={styles.card}>
//       <Text style={styles.label}>Doctor Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Doctor Name"
//         value={doctorName}
//         onChangeText={setDoctorName}
//       />

// </View>
// <View style={styles.card}>
//       <Text style={styles.label}>Notes</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Notes"
//         value={notes}
//         onChangeText={setNotes}
//       />
//            </View>
//            <View style={styles.card}>
//       <Text style={styles.label}>Date</Text>
//       <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('date'); setDatePickerTarget('startDate'); }}>
//         <Text style={styles.input}>{startDate.toDateString()}</Text>
//       </TouchableOpacity>
//       </View>
      
//       <View style={styles.card}>
//       <Text style={styles.label}>Start Time</Text>
//       <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('time'); setDatePickerTarget('startTime'); }}>
//         <Text style={styles.input}>{startTime.toLocaleTimeString()}</Text>

//       </TouchableOpacity>

//       </View>  


//       <View style={styles.card}>     
//       <Text style={styles.label}>End Time</Text>
//       <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('time'); setDatePickerTarget('endTime'); }}>
//         <Text style={styles.input}>{endTime.toLocaleTimeString()}</Text>
//       </TouchableOpacity>
//       </View>
//       {showDatePicker && (
//         <DateTimePicker
//           value={
//             datePickerTarget === 'startDate'
//               ? startDate
//               : datePickerTarget === 'endDate'
//               ? endDate
//               : datePickerTarget === 'startTime'
//               ? startTime
//               : endTime
//           }
//           mode={datePickerMode}
//           is24Hour={true}
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) {
//               if (datePickerMode === 'date') {
//                 if (datePickerTarget === 'startDate') {
//                   setStartDate(selectedDate);
//                 } else if (datePickerTarget === 'endDate') {
//                   setEndDate(selectedDate);
//                 }
//               } else {
//                 if (datePickerTarget === 'startTime') {
//                   setStartTime(selectedDate);
//                 } else if (datePickerTarget === 'endTime') {
//                   setEndTime(selectedDate);
//                 }
//               }
//             }
//           }}
//         />
//       )}
//       <Pressable style={styles.button} onPress={onAppointSave}>
//         <Text style={styles.buttonText}>Save Appointment</Text>
//       </Pressable>
//       <StatusBar style="auto" />
//     </ScrollView>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#F8F8F8',
//     padding: 16,

//   },
//   card:{
//     elevation: 3,
//     padding:20,
//     borderRadius:20,
//     marginHorizontal: 3,
//     marginBottom: 8,
//     backgroundColor: 'white',
//     shadowColor: 'white', // Shadow color
//     shadowOpacity: 3, // Shadow opacity
//     shadowRadius: 3, // Shadow radius
//     },
//   label: {
//     color: "black",
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor:"#ADD8E6",
//     padding: 8,
//     // marginBottom: 20,
//     borderRadius: 10,
//   },
//   button: {
//     backgroundColor: "green",
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginHorizontal:20
//   },
//   buttonText: {
//     color: COLORS.black,
//     fontWeight: 'bold',
//   },
// });
