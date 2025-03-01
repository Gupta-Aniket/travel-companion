import { useEffect, useState } from "react";
import { useDataItem } from "../contexts/userDataContext";
import { View, Text, SafeAreaView, Image } from "react-native";
import TicketModel from "../models/ticketModel";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CustomCardComponent from "../components/CustomCardComponent";
import ParallaxScrollView from "../components/Parallax";
import filterBasedOnTicketType from "../utils/filterBasedOnTicketType";
import CustomFAB from "../components/CustomFAB";




export default function Tickets() {
  const { data, setData, setSheetVisible, closeBottomSheet } = useDataItem();
  
  
  // const [selectedTab, setSelectedTab] = useState("All");
  // const filteredData = selectedTab === "All" ? data : data.filter(item => item.ticket_type === selectedTab);
  const filteredData = filterBasedOnTicketType(data, "All");
  const [FABVisible, setFABVisible] = useState(true);

  return (
    <>
    <View style={{ flex: 1 }}>
      

          <FlatList
            onEndReached={()=> setFABVisible(false)}
            onScrollBeginDrag={()=> setFABVisible(true)}
            scrollEnabled={true}
            data={filteredData} // ✅ Use filtered data
            keyExtractor={(item) => item.ticket_id.toString()}
            renderItem={({ item }) => <CustomCardComponent item={item} />}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
            }}
            nestedScrollEnabled={true}
            scrollEventThrottle={16}
            />
            
      {FABVisible && <CustomFAB />}
    </View>
</>
  );
}
