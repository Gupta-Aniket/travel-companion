import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDataItem } from '../../src/contexts/userDataContext';
import Globe from '../../src/components/CustomGlobe';

const Explore = () => {
  const { showPhotos, setShowPhotos, closeBottomSheet } = useDataItem();
  const [locationData, setLocationData] = useState(null);

  return (
    <View style={{ height: '100%' }}>
      <Globe />
    </View>


  );
};

export default Explore;

const styles = StyleSheet.create({


  globeContainer: {
    marginVertical: 10,
    height: "90%",
  },



  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    paddingTop: 40,
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cityInfo: {
    margin: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  cityItem: {
    marginVertical: 3,
    fontSize: 14
  },

});