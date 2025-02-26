import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import { Icon } from "react-native-elements";
import { formatDate } from '../utils/dateConvert';

const CustomCardComponent = ({onPress: onPress, item: item}) => {
  //       item : item.type,
  //       item : item.distance_travelled,
  //       item : item.time_travelled,
  //       item : item.from.location,
  //       item : item.from.date,  
  //       item : item.from.time,
  //       item : item.end.location,
  //       item : item.end.date, 
  //       item : item.end.time

  return (
    <TouchableOpacity
    onPress={() => {
      onPress()
    }}
  >
    <View style={styles.card}>

      <View style={styles.fromDetails}>
        <Text style={styles.cardTextLocation}>
          {item.from.code}
        </Text>
        <Text style={styles.cardTextDate}>{item.from.date ? formatDate(item.from.date) : "N.A"}</Text>  
        <Text>{item.from.time ? item.from.time : "N.A"}</Text>
      </View>

      <View>
        {item.ticket_type === "train" && (
          <Icon name="train-outline" type="ionicon" color="#4391DA" />
        )}
        {item.ticket_type === "flight" && (
          <Icon
            style={styles.icon}
            name="airplane-outline"
            type="ionicon"
            color="#4391DA"
          />
        )}

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text>{item.travel_info.distance}</Text>
          <Text>{item.travel_info.time_travelled}</Text>
        </View>
      </View>

      <View style={styles.toDetails}>
        <Text
          style={[styles.cardTextLocation, { textAlign: "right" }]}
        >
          {item.to.code}
        </Text>
        <Text style={[styles.cardTextDate, { textAlign: "right" }]}>
          {item.to.date ? formatDate(item.to.date) : "N.A"}
        </Text>
        <Text style={{ textAlign: "right" }}>{item.to.time ? item.to.time : "N.A"}</Text>
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
})