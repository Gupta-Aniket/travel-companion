import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper';
import { formatDate } from '../utils/dateConvert';
import { Icon } from 'react-native-elements'
import forwardGeocoding from '../utils/forwardGeocoding';

const DetailedTicket = ({
  item 
}) => {
  // const item = data[0];
  // const startLatLong = forwardGeocoding(item.from.city);
  // TODO : called a lot of times without use
  

  // const endLatLong = forwardGeocoding(item.to.city);
  
  return (
    <>
      <View style = {styles.ticketContainer}>
        <View style = {styles.upperTicketInfo}>
          <Icon size = {28} name={item.ticket_type + "-outline"}
                type="ionicon" reverse />
          <View style = {styles.departureInfo}>
            <Text style = {styles.departureText}>Departure Date</Text>
            <Text style = {styles.departureTime}>{formatDate(item.from.date)},   {item.from.time ? item.from.time : ""}</Text> 
            
          </View>
        </View>

        // ------------- From-custom catrd -------------
        
        <View style={styles.middleDetails}>
              <View style={styles.locationDetails}>
                <Text style = {styles.cardTextLocationCode}>{item.from.code}</Text>
                <Text style={styles.cardTextLocation}
                  numberOfLines={1}
                >
                  {item.from.city}
                </Text>


                <Text style={styles.cardTextLocationDateAndTime}>{formatDate(item.from.date)}</Text>
                <Text style={styles.cardTextLocationDateAndTime}>{ item.from.time === null ? "N.A" : item.from.time}</Text>
              </View> 
              <View>
                <Icon size = {30} name="arrow-forward-outline"
                  type="ionicon" style={{paddingTop: 7}} />
                  <Text>
                    {item.travel_info.distance ? item.travel_info.distance : null}
                  </Text>
              </View>

              <View style={styles.locationDetails}>
                <Text style = {[styles.cardTextLocationCode, { textAlign: "right" }]}>{item.to.code}</Text>
                <Text
                  style={[styles.cardTextLocation, { textAlign: "right" }]}
                  numberOfLines={1}
                >
                  {item.to.city}
                </Text>
                <Text style={[styles.cardTextLocationDateAndTime, { textAlign: "right" }]}>
                  {formatDate(item.to.date)}
                </Text>
                <Text style={[styles.cardTextLocationDateAndTime, { textAlign: "right" }]}>{item.to.time === null ? "N.A" : item.to.time}</Text>
              </View>
            </View>
          
          // passengers
          <View style = {styles.passengersContainer}>
            {/* Loop through passengers array and render each passenger */}
            {
              item.passenger_details.map((passenger, index) => (
                <View key={index} style={styles.passengerItem} >
                  <View style={styles.passengerDetails}>
                    <View style={styles.passengerName}>
                      <Text sytle = {styles.passengerNameandAge}>
                        {passenger.name}, ({passenger.age})
                      </Text>
                      <Text>{passenger.gender}</Text>
                    </View>
                    
                    <Text sytle = {styles.passengerSeat}>
                      { passenger.seat_number }</Text>
                  </View>
                  


                </View>
              ))
            }
          </View>
      </View>
      <View style = {styles.mapContainer}>
        {startLatLong && <CustomMapComponent
            startLocation = {item.from.city}
            endLocation = {item.to.city}
         />}
      </View>
    </>
  )
}

export default DetailedTicket

const styles = StyleSheet.create({
  ticketContainer: {
    marginBottom: 10,
    backgroundColor : "#deb885",
    borderRadius: 10,
    padding: 1,
    width: "100%",
  },

  upperTicketInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    margin: 10,
    width: "100%",
  },
  
  departureText: {
    fontSize: 16,
    fontFamily: "Ubuntu",
    marginRight: 12,
  },

  departureTime: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Ubuntu",
    marginRight: 10,
  },

  departureInfo: {
    paddingLeft: 10,
  },

  middleDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal : 20,
    marginVertical : 10,
  },

  locationDetails: {
    maxWidth: 120,
  },

  cardTextLocationCode: {
    fontSize: 36,
    fontWeight: "regular",
    fontFamily: "Ubuntu",
  },

  cardTextLocation: {
    fontSize: 14,
    color : "black",
    fontWeight: 300,
    fontFamily: "Ubuntu",
  },

  cardTextLocationDateAndTime: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Ubuntu",
  },

  passengerItem :{
    flexDirection: "row",
    marginHorizontal : 20,
    marginVertical : 10,
  },
  
  passengerDetails: {
    flexDirection: "column",
    flex: 1,
  },
  passengerName: {
    flexDirection : "row",
    justifyContent: "space-between",
  },
  passengerNameandAge:{
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Ubuntu",
  },
  passengerSeat:{
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Ubuntu",
  },
  mapContainer:{
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  }
});