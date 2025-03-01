import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import { Icon } from "react-native-elements";
import  formatDate  from "../utils/dateConvert"
import formatTime from '../utils/fomatTime';
import formatTimeTravelled from '../utils/formatTimeTravelled';

const CustomCardComponent = ({onPress: onPress, item: item}) => {

  return (
    <TouchableOpacity
    onPress={() => {
      onPress()
    }}
  >
    <View style={styles.card}>

      <View style={styles.fromDetails}>
        <Text style={styles.cardTextLocation}>
          {item.from_location_code}
        </Text>
        <Text style={styles.cardTextDate}>{item.from_date ? formatDate(item.from_date) : "N.A"}</Text>  
        <Text>{formatTime(item.from_time)}</Text>
      </View>

      <View style={{marginTop:5, marginBottom:5}}>
        
        {/* Display icon based on ticket type */}
        {item.ticket_type === "train" && (
          <Icon 
            style={styles.icon} 
            name="train-outline"
            type="ionicon" 
            size={30}
            color="#4391DA" />
        )}
        {item.ticket_type === "flight" && (
          <Icon
            style={styles.icon}
            name="airplane-outline"
            type="ionicon"
            color="#4391DA"
            size={30}
          />
        )}
        {item.ticket_type === "ferry" && (
          <Icon 
            size={30}
            style={styles.icon} 
            name="boat-outline"
            type="ionicon" 
            color="#4391DA" />
        )}
        {item.ticket_type === "bus" && (
          <Icon 
            size={30}
            style={styles.icon} 
            name="bus-outline"
            type="ionicon" 
            color="#4391DA" />
        )}

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {/* <Text>{item.distance_travelled}</Text> */}
          <Text>{formatTimeTravelled(item.travel_time)}</Text>
        </View>
      </View>

      <View style={styles.toDetails}>
        <Text
          style={[styles.cardTextLocation, { textAlign: "right" }]}
        >
          {item.to_location_code}
        </Text>
        <Text style={[styles.cardTextDate, { textAlign: "right" }]}>
          {item.to_date ? formatDate(item.to_date) : "N.A"}
        </Text>
        <Text style={{ textAlign: "right" }}>{formatTime(item.to_time) ? formatTime(item.to_time) : "N.A"}</Text>
      </View>
    </View>
  </TouchableOpacity>
  )
}

export default CustomCardComponent;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 6,
    backgroundColor: "#fff",
    padding: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
  },
  fromDetails: {
    maxWidth: 100,
    width : 100,
  },
  cardTextLocation: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Ubuntu",
  },
  toDetails: {
    maxWidth: 100,
    width : 100,
  },
  icon:{
    paddingBottom:5,
  },

})