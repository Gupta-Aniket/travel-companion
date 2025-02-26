
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions
} from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'

import CustomBottomSheet from './CustomBottomSheet';
import CustomCardComponent from './CustomCardComponent';
import { color } from 'react-native-elements/dist/helpers';
import { useDataItem } from '../contexts/userDataContext';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const ShowCardList = ({ data: data }) => {
  const { openBottomSheet } = useDataItem();
  return (
    <>
      
        <FlatList
          style={styles.flatListContainer}
          data={data}
          number={10}
          keyExtractor={(item) => item.ticket_type}
          renderItem={({ item }) => (
            <CustomCardComponent item={item} 
            onPress={
              () => {
                openBottomSheet(item);
                
              }
            } />
          )}
        />
    </>
  )
}

export default ShowCardList

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: DEVICE_HEIGHT,
    flex: 1,
  },
  item: {
    backgroundColor: "#3674B5",
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  bottomSheetContainer: {
    flex: 1,
    height: "50%",
    backgroundColor: "#0f0",
  },
})