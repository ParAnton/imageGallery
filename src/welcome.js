import React from 'react';
import {View, Text, Button} from 'react-native';

const navigateToGallery = ()=>{
  console.log('lets navigate to bug Gallery')
}
const WelcomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
);

export default WelcomeScreen;