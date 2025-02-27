import { Text, StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useDataItem } from "../contexts/userDataContext";
import DetailedTicket from "./DetailedTicket";

const CustomBottomSheet = ({
  item : item, 
  onClose : onClose, 
}) => {

  return <BottomSheet

    snapPoints={["50%", "70%"]}
    onClose={onClose}
    animateOnMount={true}
    enablePanDownToClose={true}>
      <BottomSheetView style={styles.bottomSheetContainer}>
        <View style = {styles.ticketDetails}> 
          <DetailedTicket item = {item} />
        </View>
        


        </BottomSheetView>
  </BottomSheet>
}

const styles = StyleSheet.create({  
  bottomSheetContainer: {
    height : "100%",
    width: "100%",
  },
  ticketDetails: {
    flex: 1,
    margin : 10,
  },
});

export default CustomBottomSheet;
