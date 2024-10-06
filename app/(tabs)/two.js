import { Text, View, StyleSheet, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react'
import EditScreenInfo from '@/components/EditScreenInfo';
import axios from 'axios';

import { speak, isSpeakingAsync, stop } from 'expo-speech';
import ChatBubble from '../../components/chatBubb';

export default function TabTwoScreen() {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false)

  const API_KEY = "AIzaSyB4cEEH-HbtHvOzHnzfM_wbqPiqpCOPUPg"

  const handleUserInput = async () => {
    let updatedChat = [
      ...chat, {
        role: "User",
        parts: [{text : userInput}],
      },
    ];
    setLoading(true);
    console.log(updatedChat)
    try {
      const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB4cEEH-HbtHvOzHnzfM_wbqPiqpCOPUPg',
        {
          contents: updatedChat,
        }
      );
      console.log("Gemini response: ", response.data)

      const modelResponse = 
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (modelResponse) {
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role:"Model",
            parts: [{text : modelResponse}]
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Gemini error while processing response: ", error);
      console.error("Error response:" , error.response);
      setError("An error occured. Please try again.")
    } finally {
      setLoading(false);
    }

  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false)
    } else {
      if (!(await isSpeakingAsync() )) {
        speak(text);
        setIsSpeaking(true);
      }
    }
    
  }

  const renderChatItem = ({item}) => (
    <ChatBubble
    role= {item.role}
    text = {item.parts[0].text}
    onSpeech = {() => handleSpeech(item.parts[0].text)} />
  );

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Health Advisor</Text>
          <FlatList data= {chat}
          renderItem={
            renderChatItem
          } 
          keyExtractor={(item, index) => index.toString() }
          contentContainerStyle = {styles.chatContainer}/>

          <View style = {styles.inputContainer}>
            <TextInput 
            style = {styles.input}
            placeholder='Type your message...'
            placeholderTextColor="#aaa"
            value={userInput}
            onChangeText={setUserInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleUserInput}>
              <Text style={styles.buttonText}>Send</Text>

            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator style={styles.loading} color="#333" />}
          {error && <Text  style={styles.error}>{error}</Text> }
    </View>

    
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    backgroundColor:'#F8F8F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"#333",
    marginBottom:20,
    marginTop: 40,
    textAlign: "center",
  },
  chatContainer:{
    flexGrow:1,
    justifyContent:"flex-end"
  },
  inputContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:10,
  },
  input: {
    flex:1,
    height:50,
    marginRight:10,
    padding:8,
    borderColor:"#333",
    borderWidth:1,
    borderRadius:25,
    color: "#333",
    backgroundColor:"#fff",

  },
  button:{
    padding:10,
    backgroundColor:"green",
    borderRadius:15,
  },
  buttonText :{
    color:"#333",
    textAlign:"center",

  },
  loading:{
    marginTop:10,
  },
  error:{
    color:"red",
    marginTop:10,
  },

});
