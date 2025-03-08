import { Text, StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import DataItemProvider, { useDataItem } from "../contexts/userDataContext";
import { Dimensions } from "react-native";
import DetailedTicket from "./DetailedTicket";
import imagesData from '../models/cityImagesDataModel'
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import CustomMasionaryList from "./CustomMasionaryList";

const CustomBottomSheet = ({ }) => {
  const { showPhotos, data, itemId, closeBottomSheet } = useDataItem()


  // * better to use index instead of id -> if the data is large, it will be slow
  const item = data.find(item => item.ticket_id == itemId);
  return <BottomSheet
    snapPoints={["50%", "70%"]}
    onClose={closeBottomSheet}
    animateOnMount={true}

    enablePanDownToClose={true}
    handleStyle={{ backgroundColor: "#aaa", borderTopLeftRadius:10, borderTopRightRadius:10, }}

    enableHandlePanningGesture={true}
  >
    <BottomSheetView style={styles.bottomSheetContainer}>
      <View style={styles.ticketDetails}>
        {
          item && <DetailedTicket item={item} />
        }

        { 
          showPhotos && item == null && <CustomMasionaryList images={imagesData} /> 
        }
      </View>
    </BottomSheetView>
  </BottomSheet>

}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: "#ddd",
    height: "100%",
    width: "100%",
  },

  ticketDetails: {
    flex: 1,
    margin: 5,
  },
});

export default CustomBottomSheet;
