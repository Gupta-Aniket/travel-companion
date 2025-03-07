import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import { Icon } from "react-native-elements";
import  formatDate  from "../utils/dateConvert"
import formatTime from '../utils/fomatTime';
import formatTimeTravelled from '../utils/formatTimeTravelled';
import iconNameFromType from '../utils/iconNameFromType';

const CustomCardComponent = ({onPress: onPress, item: item, onLongPress: onLongPress}) => {

  return (
    <TouchableOpacity
    onPress={() => {
      onPress()
    }}
    onLongPress={() => {
      onLongPress()
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
        <Icon size = {30} 
              name={iconNameFromType(item.ticket_type)}
              color="#4391DA"
              type="ionicon" /> 

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {/* <Text>{item.distance_travelled}</Text> */}
          <Text>{String(formatTimeTravelled(item.travel_time))}</Text>
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
        <Text style={{ textAlign: "right" }}>{item.to_time ? formatTime(item.to_time) : "N.A"}</Text>
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