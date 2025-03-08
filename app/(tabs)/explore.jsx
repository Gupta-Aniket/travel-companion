import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

import CustomMasionaryList from '../components/CustomMasionaryList'
import CustomCarousel from '../components/CustomCarousel'
import CustomBottomSheet from '../components/CustomBottomSheet'
import { useDataItem } from '../contexts/userDataContext';
import { Button } from 'react-native-paper'
const Explore = () => {
  const { showPhotos, setShowPhotos, closeBottomSheet } = useDataItem();

  return (
    <View style={{ flex: 1 }}>
      <Text>Explore</Text>


      <TouchableOpacity
        onPress={() => {
          setShowPhotos(true);
        }}
      >
        <Text> hi </Text>
      </TouchableOpacity>

      {
        showPhotos && 
        <CustomBottomSheet
        onClose={
          () => {
            closeBottomSheet
            setShowPhotos(false)
          }

        } />
}

    </View>
  )
}

export default Explore

const styles = StyleSheet.create({})