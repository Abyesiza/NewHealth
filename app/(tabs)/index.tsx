import { ScrollView, StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EditScreenInfo from '@/components/EditScreenInfo';
import Glucose from '@/components/glucose';
import BP from '@/components/bp';
import Food from '@/components/foods';
import Reminder from '@/components/reminder';
import MReminder from '@/components/medicate'
import { router , Link} from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabOneScreen() {
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
          <ScrollView>

  
    <View style={styles.titleH}>

          <Text style={styles.title}>HealthApp</Text>
    </View>


      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}

      <Reminder   />
      <MReminder />

      <Glucose />
      <BP />

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
    // alignItems: 'center',
    // justifyContent: 'center',
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
    paddingLeft:70,
    paddingRight:70,
    paddingBottom:70,
    paddingTop:60,
    alignItems:"center",
    justifyContent:"center",
    // backgroundColor:"white"
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
