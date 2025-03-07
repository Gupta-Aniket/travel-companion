import { useEffect, useState } from "react";
import { useDataItem } from "../contexts/userDataContext";
import { View, Text, SafeAreaView, Image } from "react-native";
import TicketModel from "../models/ticketModel";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CustomCardComponent from "../components/CustomCardComponent";

import filterBasedOnTicketType from "../utils/filterBasedOnTicketType";
import CustomFAB from "../components/CustomFAB";
import CusomBottomSheet from '../components/CustomBottomSheet';
import React from 'react'
import CustomParallaxScrollView from "../components/CustomParallax";


export default function Tickets() {
  const { data, setSheetVisible, openBottomSheet, itemId, closeBottomSheet } = useDataItem();
  const filteredData = data;
  const [FABVisible, setFABVisible] = useState(true);

  return (
    <>
      <CustomParallaxScrollView>
        <View style={{ flex: 1 }}>
          {
            !filteredData && <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>No Tickets Found</Text>
              <Text>Add Tickets To See Here</Text>
            </View>
          }
        
            <FlatList

              // onEndReached={()=> setFABVisible(false)}
              // onScrollBeginDrag={()=> setFABVisible(true)}
              scrollEnabled={true}
              data={filteredData} // ✅ Use filtered data
              keyExtractor={(item) => item.ticket_id.toString()}
              renderItem={({ item }) =>
                < CustomCardComponent item={item}
                  onPress={() => {
                    openBottomSheet(item.ticket_id);
                  }} 
                  onLongPress={() => console.log("Long Pressed:", item.ticket_id)
                  }/>}
              
              nestedScrollEnabled={true}
              scrollEventThrottle={16}
            />

        </View>
      </CustomParallaxScrollView>
      {FABVisible && <CustomFAB />}
      {itemId != "" && <CusomBottomSheet onClose={closeBottomSheet} />}
    </>
  );
}
