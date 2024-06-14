import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, TextInput,ScrollView, Text, View, Platform , Button} from "react-native";
import { useState, useEffect} from "react";
// import { Text, View } from '@/components/Themed';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as Device from 'expo-device';


function Register() {

//Patient

    const [patientName, setPatientName] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [patientaddress, setPatientAddress] = useState('')
    const [patientContact, setPatientContact] = useState('')
    const [emergencyContact, setEmergencyContact] = useState('')
    const [patientHealthcareProvider, setPatientHealthcareProvider] = useState('')
    const [patientHealthCondition, setPatientHealthCondition] = useState('')
    const [patientAllergyCondition, setPatientAllergyCondition] = useState('')
    const [patientbloodGroup, setPatientBloodGroup] = useState('')
    const [patientComment, setPatientComment] = useState('')
    const [showPatient, setShowPatient] = useState(false)

//Hospital
    const [hospitalName, setHospitalName] = useState('')
    const [hospitalType, setHospitalType] = useState('')
    const [hospitaladdress, setHospitalAddress] = useState('')
    const [hospitalContact, setHospitalContact] = useState('')
    const [hospitalEmail, setHospitalEmail] = useState('')
    const [hospitalSpecialty, setHospitalSpecialty] = useState('')
    const [affiliation, setAffiliation] = useState('')
    const [operatingHours, setOperatingHours] = useState('')
    const [hospitalComment, setHospitalComment] =useState('')
    const [showHospital, setShowHospital] = useState(false)

    const registerPatient = () => {

      }
    const registerHospital = () => {

      }
    const togglePatient = () => {
        if (showHospital===true) {setShowHospital(!showHospital) &  setShowPatient(!showPatient) }
        else {
  setShowPatient(!showPatient) 
        }
 
 
    }
    const toggleHospital = () => {

if (showPatient===true) {  setShowPatient(!showPatient) & setShowHospital(!showHospital)  }  
    else { setShowHospital(!showHospital)  }
    }
    return(
        <View style={styles.container}>
<Text style={styles.textShow}>Click on your right choice ?</Text>
  <Pressable onPress={togglePatient} style={styles.button} >
  <Text style={styles.text}>PATIENT</Text>
  </Pressable>

  <Pressable onPress={toggleHospital} style={styles.button} >
  <Text style={styles.text}>HOSPITAL</Text>
  </Pressable>

    
  
        <ScrollView>
 {
    showPatient && (
        <View>
        <View style={styles.card}>
         <Text style={styles.text}>Full name</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setPatientName(text)}        
        />
        </View>

        <View style={styles.card}>
         <Text style={styles.text}>Email</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text) => setPatientEmail(text)}
        />
        </View> 

        <View style={styles.card}>
         <Text style={styles.text}>Patient address</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text) => setPatientAddress(text)}
        />
        </View>  
        <View style={styles.card}>
         <Text style={styles.text}>Personal phone number</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text) => setPatientContact(text)}
        />
        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Emergency phone number</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text) => setEmergencyContact(text)}
        />
        </View>    
        <View style={styles.card}>
         <Text style={styles.text}>Gender </Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text) => setPatientGender(text)}
        />
        </View>    


{/* 

        <View style={styles.card}>
        <Text style={styles.text}>Date of birth</Text>
        <TextInput 
        onPressIn={() => showMode("date")}
        style={styles.input} 
        
        />      
        {
            show && (
                <DateTimePicker
                value={date}
                mode={mode} 
                is24Hour={true}
                onChange={onChange}
                />
            )
        }
        </View>  */}

        <View style={styles.card}>
         <Text style={styles.text}>What is the name of your health care provider</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setPatientHealthcareProvider(text)}/>
        </View>

        <View style={styles.card}>
         <Text style={styles.text}>Do you have any health condition. If yes please specify?</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setPatientHealthCondition(text)}

        />
        </View>

        <View style={styles.card}>
         <Text style={styles.text}>Do you have any allergies, If yes please specify?</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setPatientAllergyCondition(text)}
  
        />

        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Blood Group</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setPatientBloodGroup(text)}
  
        />
                </View>
        <View style={styles.card}>
         <Text style={styles.text}>Is there anything else you would want to tell your health provider. If yes please go ahead</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setPatientComment(text)}
  
        />


        </View>       



        <Pressable style={styles.pressable} onPress={registerPatient}>
        <Text style={styles.text}>REGISTER</Text>
        </Pressable>           
        
        </View>
    )
 }   

        {
            showHospital && (
        <View>
        <View style={styles.card}>
         <Text style={styles.text}>Hospital name</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setHospitalName(text)}        
        />
        </View>

        <View style={styles.card}>
         <Text style={styles.text}>Hospital type</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setHospitalType(text)}        
        />
        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Hospital address</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setHospitalAddress(text)}        
        />
        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Hospital phone number</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setHospitalContact(text)}        
        />
        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Hospital email</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setHospitalEmail(text)}        
        />
        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Hospital specialty</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setHospitalSpecialty(text)}        
        />
        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Hospital affiliation</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setAffiliation(text)}        
        />
        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Hospital operating Hours</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setOperatingHours(text)}        
        />
        </View>
        <View style={styles.card}>
         <Text style={styles.text}>Is there anything else you would want us to know about this hospital </Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setHospitalComment(text)}        
        />
        </View>
        <Pressable style={styles.pressable} onPress={registerHospital}>
        <Text style={styles.text}>REGISTER</Text>
        </Pressable>   
        </View>
            )
        }
        </ScrollView>
        </View>
    )
};

export default Register
const styles = StyleSheet.create({
        input: {
        height: 40,
        margin: 12,

        borderRadius:10,
        paddingVertical: 10,
        backgroundColor:"beige"
        },

       card:{
        backgroundColor:"#36454F",

        padding:20,
        borderRadius:20,
        marginHorizontal: 15,
        marginBottom: 15,
        
        },
        button:{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 10,
          marginHorizontal:10,
          elevation: 1,
          backgroundColor:"white"
          
          // backgroundColor: 'ne',
        },
          text: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          color:"black",
          fontFamily:"sans-serif-condensed"
        }, 
          textError: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          color:"red",
          fontFamily:"sans-serif-condensed"
        }, 
          textShow: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          color:"green",
          fontFamily:"sans-serif-condensed"
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
        backgroundColor:"#353839",
        paddingVertical: 12,
        paddingHorizontal: 2,
        marginHorizontal:19,
        borderRadius: 15,
        elevation: 1,
    
    },
        container: {
       flex:1,
        backgroundColor:"beige",
        paddingTop:10

    },
      

    });