import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import NetworkChecker from './networkChecker';
import globalStyles from './styles';

const styles= StyleSheet.create({
  button:{
    backgroundColor:'lightblue',
    color:'white',
  }
})
const navigateToBugGallery = (navigation)=>{
  console.log('lets navigate to bug Gallery');
  navigation.navigate('GalleryScreen',{galleryId:'72157714206344417', galleryName:'bugs'});
}
const navigateToCloseUpGallery = (navigation)=>{
  console.log('lets navigate to close Up Gallery');
  navigation.navigate('GalleryScreen',{galleryId:'72157712544669811', galleryName:'Close Ups'});
}

const WelcomeScreen = ({navigation}) => (
  <View style={{padding:20}}>
    <NetworkChecker />
    <View style={globalStyles.introTextCont}>
    <Text style={globalStyles.introText}> Welcome to this little app showing images from Flickr.</Text>
    <Text style={globalStyles.introText}>Wanna look at somne images from a gallery?</Text>
    </View>
    <TouchableOpacity
     onPress={()=>navigateToBugGallery(navigation)}
     style={{alignSelf:'center', padding:10}}>
      <View style={{backgroundColor:'blue',
       padding:10,
       borderRadius:10
       }}>
       <Text style={{
         fontStyle:"italic",
          color:"white",
           fontWeight:"bold",
           fontSize:30
           }} >Bugs!</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
     onPress={()=>navigateToCloseUpGallery(navigation)}
     style={{alignSelf:'center', padding:10}}>
      <View style={{backgroundColor:'blue',
       padding:10,
       borderRadius:10
       }}>
       <Text style={{
         fontStyle:"italic",
          color:"white",
           fontWeight:"bold",
           fontSize:30
           }} >Close Ups!</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default WelcomeScreen;