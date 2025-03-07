import { StyleSheet, Text, View, PixelRatio } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper';
import formatDate from '../utils/dateConvert';
import { Icon } from 'react-native-elements'
import { use } from 'react';
import { useDataItem } from '../contexts/userDataContext';
import formatTime from '../utils/fomatTime';
import formatTimeTravelled from '../utils/formatTimeTravelled';
import iconNameFromType from '../utils/iconNameFromType';
import { Dimensions } from 'react-native';
import { ScaledSheet, moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';

const DetailedTicket = ({
  item
}) => {
  // ! use this for map, in case needed
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  console.log(height);
  console.log(width);
  console.log("🔍 Detailed Ticket Item:", item);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cardContainer}>
        <View style={styles.ticketContainer}>
          <View style={styles.upperTicketInfo}>
            <View style={styles.ticketInfo}>
              <Icon size={28} name={iconNameFromType(item.ticket_type)} type="ionicon" reverse />
              <View style={styles.departureInfo}>
                <Text style={styles.departureText}>Departure Date</Text>
                <Text style={styles.departureTime}>{formatDate(item.from_date)}, {item.from_time ? formatTime(item.from_time) : "N/A"}

                </Text>
              </View>

            </View>
            <Icon
              name = 'trash'
              type = 'ionicon'
              color = 'red'
              size = {20}/>
          </View>

          <View style={styles.middleDetails}>
            <View style={styles.locationDetails}>
              <Text style={styles.codeText}>{item.from_location_code}</Text>
              <Text style={styles.locationText} numberOfLines={1}>{item.from_location}</Text>
              <Text style={styles.dateTimeText}>{formatDate(item.from_date)}</Text>
              <Text style={styles.dateTimeText}>{item.from_time ? formatTime(item.from_time) : "N.A"}</Text>
            </View>

            <View style={styles.travelInfo}>
              <Icon size={30} name="arrow-forward-outline" type="ionicon" style={styles.arrowIcon} />
              <Text style={styles.travelTime}>{item.travel_time ? formatTimeTravelled(item.travel_time) : "-"}</Text>
            </View>

            <View style={styles.locationDetails}>
              <Text style={[styles.codeText, styles.alignRight]}>{item.to_location_code}</Text>
              <Text style={[styles.locationText, styles.alignRight]} numberOfLines={1}>{item.to_location}</Text>
              <Text style={[styles.dateTimeText, styles.alignRight]}>{formatDate(item.to_date)}</Text>
              <Text style={[styles.dateTimeText, styles.alignRight]}>{item.to_time ? formatTime(item.to_time) : "N.A"}</Text>
            </View>
          </View>

          {/* Passengers Section */}
          <View style={styles.passengersContainer}>
            <Text style={styles.passengerHeader}>Passengers</Text>
            {item.passenger_details.map((passenger, index) => (
              <View key={index} style={styles.passenger}>
                <Text style={styles.passengerText}>
                  {index + 1}. {passenger.name} ({passenger.age}) - {passenger.seat_number}
                </Text>
              </View>
            ))}
          </View>

          {/* More Info Section (Custom per Ticket Type) */}
          <View style={styles.moreInfoContainer}>
            <Text style={styles.heading}>More Info</Text>

            {item.ticket_type === "flight" && (
              <View style={styles.moreInfoItem}>
                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Boarding Time: </Text>
                  <Text style={styles.value}>{formatTime(item.type_specific.boarding_time)}</Text>
                </View>

                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Class: </Text>
                  <Text style={styles.value}>{item.type_specific.class}</Text>
                </View>

                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Flight Number: </Text>
                  <Text style={styles.value}>{item.type_specific.flight_number}</Text>
                </View>

                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Gate Number: </Text>
                  <Text style={styles.value}>{item.type_specific.gate_number}</Text>
                </View>
              </View>
            )}

            {item.ticket_type === "ferry" && (
              <View style={styles.moreInfoItem}>
                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Deck Number: </Text>
                  <Text style={styles.value}>{item.type_specific.deck_number === "-2" ? "2" : item.type_specific.deck_number}</Text>
                </View>

                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Ferry Name: </Text>
                  <Text style={styles.value}>{item.type_specific.ferry_name}</Text>
                </View>
              </View>
            )}

            {item.ticket_type === "bus" && (
              <View style={styles.moreInfoItem}>
                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Bus Number: </Text>
                  <Text style={styles.value}>{item.type_specific.bus_number}</Text>
                </View>
                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Bus Type: </Text>
                  <Text style={styles.value}>{item.type_specific.bus_type}</Text>
                </View>
              </View>
            )}

            {item.ticket_type === "train" && (
              <View style={styles.moreInfoItem}>
                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Class: </Text>
                  <Text style={styles.value}>{item.type_specific.class}</Text>
                </View>

                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Coach Number: </Text>
                  <Text style={styles.value}>{item.type_specific.coach_number}</Text>
                </View>

                <View style={styles.moreInfoItemRow}>
                  <Text style={styles.label}>Train Number: </Text>
                  <Text style={styles.value}>{item.type_specific.train_number}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* <View style={styles.mapContainer}>
        {item.from_city && item.to_city && (
          <CustomMapComponent startLocation={item.from.city} endLocation={item.to.city} />
        )}
      </View> */}
      </View>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  cardContainer: {
    elevation: 5,
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: '4@ms',
    // padding: '5@ms',
    paddingTop:'2@ms',
  },
  ticketContainer: { padding: '2@ms' },

  upperTicketInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingRight: 10},
  ticketInfo: { flexDirection: 'row', alignItems: 'center' },
  departureInfo: { marginLeft: '5@ms' },
  departureText: { fontSize: '18@ms', fontWeight: 'bold' },
  departureTime: { fontSize: '16@ms', color: 'black' },
  middleDetails: { flexDirection: 'row', justifyContent: 'space-between', marginTop: '10@vs' },
  locationDetails: { marginHorizontal: '5@ms' },
  codeText: { fontSize: '18@ms', fontWeight: 'bold' },
  locationText: { fontSize: '16@ms', color: 'gray' },
  dateTimeText: { fontSize: '14@ms', color: 'gray' },
  travelInfo: { alignItems: 'center' },
  travelTime: { fontSize: '14@ms', color: 'gray' },
  arrowIcon: { paddingTop: '5@vs' },
  alignRight: { textAlign: 'right' },
  passengersContainer: { marginTop: '15@vs', width: '100%' },
  passengerHeader: { fontSize: '18@ms', fontWeight: 'bold', marginBottom: '5@vs' },
  passenger: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: '5@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  passengerText: { fontSize: '16@ms' },
  moreInfoContainer: {
    marginTop: '15@vs',
    padding: '10@ms',
    backgroundColor: '#f9f9f9',
    borderRadius: '5@ms'
  },
  moreInfoContainer: {
    padding: "10@ms",
    backgroundColor: "#f9f9f9",
    borderRadius: "8@ms",
    marginTop: "10@ms",
  },
  heading: {
    fontSize: "18@ms",
    fontWeight: "bold",
    marginBottom: "8@ms",
    color: "#333",
  },
  moreInfoItem: {
    marginBottom: "10@ms",
  },
  moreInfoItemRow: {
    flexDirection: "row",
  },
  label: {
    fontSize: "14@ms",
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    fontSize: "14@ms",
    color: "#666",
    marginBottom: "5@ms",
  },

});
export default DetailedTicket;
