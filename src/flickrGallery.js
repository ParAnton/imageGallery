import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as ScreenOrientation from 'expo-screen-orientation';
import ErrorBar from './errorbar';
import axios from 'axios';
import * as R from 'ramda';
import globalStyles from './styles';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 10
  },
  button: {
    backgroundColor: 'lightblue',
    color: 'white',
  }
});
const defaultFlickrgalleryId = '72157712544669811';

const readFromImageGallery = async (galleryId = defaultFlickrgalleryId) => {
  // setLoading(true);
  const res = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=14398bc96255b68a5f45f3ddc057add5&gallery_id=${galleryId}&format=json&nojsoncallback=1&per_page=3`);

  const images1 = res;
  console.log(images1);
  const images = R.path(['data', 'photos', 'photo'], res);
  return images;
};

const getImageSource = (image) => {
  const farmId = R.prop('farm', image);
  const serverId = R.prop('server', image);
  const id = R.prop('id', image);
  const secret = R.prop('secret', image);
  return `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
}

const navigateToGallery = () => {
  console.log('lets navigate to bug Gallery')

}
const ImageView = ({image, imageSize}) => {
  const imageSource = getImageSource(image);
  return (
    <View key={R.prop('id', image)} style={{ padding: 5 }}>
      <Text>{R.prop('title', image)}</Text>
      <TouchableOpacity onPress={() => { WebBrowser.openBrowserAsync(imageSource) }}>
        <Image
          style={{ width: imageSize, height: imageSize }}
          source={{ uri: imageSource }}
        />
      </TouchableOpacity>
    </View>);
};
const GalleryScreen = ({ route }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { galleryId, galleryName } = route.params;
  const [imageSize, setImageSize] = useState(Math.round(Dimensions.get('window').width) * 0.4);
  const [images, setImages] = useState([]);
  const loadImages = async () => {
    setLoading(true);
    try {
      const images = await (readFromImageGallery(galleryId));
      setImages(images);
    } catch (err) {
      console.warn({ err });
      setError({ title: err.message, desc: `error reading imageGallery id ${galleryId}` });
    }

    setLoading(false);
  }
  useEffect(() => {
    loadImages();
    const orientationListener = ScreenOrientation.addOrientationChangeListener(() => {
      setImageSize(Math.round(Dimensions.get('window').width) * 0.4);
    });
    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientationListener);
    }

  }, [setImages]);
  return (
    <>
      {error ? <ErrorBar error={error} /> : null}
      <View style={styles.container}>
        <View style={globalStyles.introTextCont}>
          <Text style={globalStyles.introText}>Lets show some {galleryName} from Flickr.</Text>
        </View>
        {loading ? <ActivityIndicator size="large" /> : null}
        <ScrollView>
          {
            images.map((image) => (
              <ImageView image={image} imageSize={imageSize} />
            ))
          }
        </ScrollView>
      </View>
    </>
  );
}

export default GalleryScreen;