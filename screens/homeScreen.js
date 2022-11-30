
import * as React from 'react';
import { View, Text, Pressable, Image, ImageBackground } from 'react-native';
import styles from '../styles/styles';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.image}
      resizeMode="cover"
      blurRadius={1}
      source={require("../images/homeBackground2.jpg")}
    >
    <View style={styles.homeContainer}>
       
 <Image style={styles.imgHome} source = {require("../images/logoHome.png")}/>
      <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonLog} title="Log In"
            onPress={() => navigation.navigate('Log', { otherParam: 'Login' })}>
                <Text style={styles.text}>Log In</Text>
            </Pressable>
          
            <Pressable style={styles.buttonLog} title="Register"
            onPress={() => navigation.navigate('Register', { otherParam: 'Register Now' })}>
                <Text style={styles.text}>Register</Text>
            </Pressable>
        
      </View>
   
     
      
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { otherParam: 'Cuisine' })}
      /> */}
    </View>
     </ImageBackground>
  );
}