import { useEffect, useState } from "react";
import { useDataItem } from "../contexts/userDataContext";
import { View, Text, SafeAreaView, Image } from "react-native";
import TicketModel from "../models/ticketModel";
import { FlatList } from "react-native-gesture-handler";
import CustomCardComponent from "../components/CustomCardComponent";
import ParallaxScrollView from "../components/Parallax";

export default function Tickets() {
  const { data, setData, setSheetVisible, closeBottomSheet } = useDataItem();
  console.log("🔍 Data:", data);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <FlatList key={data.ticket_id} data={data} renderItem={({ item }) => <CustomCardComponent item={item} />} />
        
  </SafeAreaView>
  );
}
