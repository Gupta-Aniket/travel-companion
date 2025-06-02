import { useEffect, useState } from "react";
import { useDataItem } from "../../src/contexts/userDataContext";
import { View, Text, SafeAreaView, Image } from "react-native";
import TicketModel from "../../src/models/ticketModel";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CustomCardComponent from "../../src/components/CustomCardComponent";

import filterBasedOnTicketType from "../../src/utils/filterBasedOnTicketType";
import CustomFAB from "../../src/components/CustomFAB";
import CusomBottomSheet from '../../src/components/CustomBottomSheet';
import React from 'react'
import CustomParallaxScrollView from "../../src/components/CustomParallax";
import CustomBottomSheet from "../../src/components/CustomBottomSheet";


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
                } />}

            nestedScrollEnabled={true}
            scrollEventThrottle={16}
          />

        </View>
      </CustomParallaxScrollView>
      {FABVisible && <CustomFAB />}

    </>
  );
}
