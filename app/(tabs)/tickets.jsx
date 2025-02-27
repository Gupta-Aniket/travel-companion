import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TicketModel from '../models/ticketModel'
import DataItemProvider,{ useDataItem  } from "../contexts/userDataContext";
const Tickets = () => {
  const { data } = useDataItem();

  console.log("🎟️ Data in Tickets Screen:", data); // ✅ Check what is printed

  if (!data || data.length === 0) {
    return <Text>No tickets available</Text>;
  }

  return (
    <View>
      {data.map((ticket, index) => (
        <Text key={index}>{ticket.name}</Text>
      ))}
    </View>
  );
};


export default Tickets

const styles = StyleSheet.create({})