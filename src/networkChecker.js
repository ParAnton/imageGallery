import React, {useState, useEffect} from 'react';
import * as Network from 'expo-network';
import * as Cellular from 'expo-cellular';
import {View,Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  errorContainer:{
    backgroundColor:'red',
    paddingLeft:10
    
  },
  warningContainer:{
    backgroundColor:'yellow',
    paddingLeft:10
    
  },
  textTitle:{
    fontSize:20
  },
  textDesc:{
    fontSize:15
  }
});

const ErrorBar= ({errorMessage}) => (
  <View style={styles.errorContainer}>
    <Text style={styles.textTitle}>{errorMessage}</Text>
  </View>
);
const WarningBar= ({warningMessage}) => (
  <View style={styles.warningContainer}>
    <Text style={styles.textTitle}>{warningMessage}</Text>
  </View>
);
const NetworkChecker = ()=>{
  const [displayWarning, setDisplayWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const checkNetork = async ()=>{
    const networkState = await Network.getNetworkStateAsync();
    if(!networkState.isInternetReachable){
      setDisplayError(true);
      setErrorMessage(`Can't reach Internet check your connection`);
    } else {
      setDisplayError(false);
      setErrorMessage('');
    }
  };
  const checkCellular = async ()=>{
    const cellularGeneration = await Cellular.getCellularGenerationAsync();
    
    if((cellularGeneration === Cellular.CellularGeneration.CELLULAR_2G) ||
      (cellularGeneration === Cellular.CellularGeneration.CELLULAR_3G)){
      setDisplayWarning(true);
      setWarningMessage(`Slow Internet connection can cause long loading times`);
    } else {
      setDisplayWarning(false);
      setWarningMessage('');
    }
  };
  useEffect(()=>{
    checkNetork();
    checkCellular();
  },[Network])
  return (
    <>
    {
      displayWarning? <WarningBar warningMessage={warningMessage}/> : null
    }
    {
      displayError? <ErrorBar errorMessage={errorMessage}/> : null
    }
    </>
  );
};

export default NetworkChecker;