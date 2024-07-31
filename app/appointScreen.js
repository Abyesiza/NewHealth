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
      await Calendar.requestCalendarPermissionsAsync();
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

  const createCalendarEvent = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
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
        startDate: combineDateAndTime(startDate, startTime),
        endDate: combineDateAndTime(endDate, endTime),
        timeZone: 'GMT',
        notes: notes,
      });
    }
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

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget!",
        body: 'You have an appointment soon!',
      },
      trigger: { date: new Date(combineDateAndTime(startDate, startTime).getTime() - 60 * 1000) }, // 1 minute before appointment
    });

    await createCalendarEvent();

    const permissions = await Notifications.getPermissionsAsync();
    console.log('Notification Permissions:', permissions);
    console.log('Expo Push Token:', expoPushToken);

    Alert.alert('Success', 'Appointment saved successfully.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Hospital</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Hospital Name"
        value={hospital}
        onChangeText={setHospital}
      />
      <Text style={styles.label}>Doctor Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Doctor Name"
        value={doctorName}
        onChangeText={setDoctorName}
      />
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Notes"
        value={notes}
        onChangeText={setNotes}
      />
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('date'); setDatePickerTarget('startDate'); }}>
        <Text style={styles.input}>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Start Time</Text>
      <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('time'); setDatePickerTarget('startTime'); }}>
        <Text style={styles.input}>{startTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('date'); setDatePickerTarget('endDate'); }}>
        <Text style={styles.input}>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>End Time</Text>
      <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerMode('time'); setDatePickerTarget('endTime'); }}>
        <Text style={styles.input}>{endTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
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
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 20,
  },
  label: {
    color: COLORS.white,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
