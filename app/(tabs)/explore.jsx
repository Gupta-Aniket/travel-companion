import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import imagesData from '../models/cityImagesDataModel'
import CustomMasionaryList from '../components/CustomMasionaryList'
import CustomCarousel from '../components/CustomCarousel'

const Explore = () => {

  return (
    <View>
      <Text>Explore</Text>
      <View
        style={{
          backgroundColor: "#f0f",
          height :200,
        }}
      >

        <CustomCarousel />
      </View>

      <CustomMasionaryList  images={imagesData} />
      
    </View>
  )
}

export default Explore

const styles = StyleSheet.create({})