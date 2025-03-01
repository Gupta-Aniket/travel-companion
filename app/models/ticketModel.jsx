import supabase from "../config/supabaseClient";
import  {processTickets}  from "./ticketDataModel";
class TicketModel {

  

  static async getAllTickets(userId) {
    const tempData = [{"distance": 64.49, "from_date": "2025-03-03", "from_location": "New York", "from_location_code": "NYC", "from_time": "07:00:00", "operator_name": "Operator_1", "passenger_details": [[Object]], "ticket_id": "e9f5d4ef-216a-4866-ab96-406078e37b7f", "ticket_type": "ferry", "time_travelled": "03:00:00", "to_date": "2025-03-06", "to_location": "Paris", "to_location_code": "PAR", "to_time": "09:00:00", "travel_time": "07:20:41.521778", "type_specific": {"deck_number": "D1", "ferry_name": "Ferry_7"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"}, {"distance": 307.41, "from_date": "2025-02-28", "from_location": "New York", "from_location_code": "NYC", "from_time": "15:00:00", "operator_name": "Operator_3", "passenger_details": [[Object]], "ticket_id": "06cdcafd-9e86-45ce-a13f-bec708e3bf7b", "ticket_type": "flight", "time_travelled": "05:00:00", "to_date": "2025-03-07", "to_location": "Paris", "to_location_code": "PAR", "to_time": "22:00:00", "travel_time": "13:20:41.521778", "type_specific": {"boarding_time": "09:20:41.521778", "flight_number": "FL824", "gate_number": "G4"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"},{"distance": 64.49, "from_date": "2025-03-03", "from_location": "New York", "from_location_code": "NYC", "from_time": "07:00:00", "operator_name": "Operator_1", "passenger_details": [[Object]], "ticket_id": "e9f5d4ef-216a-4866-ab96-406078e37b7f", "ticket_type": "ferry", "time_travelled": "03:00:00", "to_date": "2025-03-06", "to_location": "Paris", "to_location_code": "PAR", "to_time": "09:00:00", "travel_time": "07:20:41.521778", "type_specific": {"deck_number": "D1", "ferry_name": "Ferry_7"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"}, {"distance": 307.41, "from_date": "2025-02-28", "from_location": "New York", "from_location_code": "NYC", "from_time": "15:00:00", "operator_name": "Operator_3", "passenger_details": [[Object]], "ticket_id": "06cdcafd-9e86-45ce-a13f-bec708e3bf7b", "ticket_type": "flight", "time_travelled": "05:00:00", "to_date": "2025-03-07", "to_location": "Paris", "to_location_code": "PAR", "to_time": "22:00:00", "travel_time": "13:20:41.521778", "type_specific": {"boarding_time": "09:20:41.521778", "flight_number": "FL824", "gate_number": "G4"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"},{"distance": 64.49, "from_date": "2025-03-03", "from_location": "New York", "from_location_code": "NYC", "from_time": "07:00:00", "operator_name": "Operator_1", "passenger_details": [[Object]], "ticket_id": "e9f5d4ef-216a-4866-ab96-406078e37b7f", "ticket_type": "ferry", "time_travelled": "03:00:00", "to_date": "2025-03-06", "to_location": "Paris", "to_location_code": "PAR", "to_time": "09:00:00", "travel_time": "07:20:41.521778", "type_specific": {"deck_number": "D1", "ferry_name": "Ferry_7"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"}, {"distance": 307.41, "from_date": "2025-02-28", "from_location": "New York", "from_location_code": "NYC", "from_time": "15:00:00", "operator_name": "Operator_3", "passenger_details": [[Object]], "ticket_id": "06cdcafd-9e86-45ce-a13f-bec708e3bf7b", "ticket_type": "flight", "time_travelled": "05:00:00", "to_date": "2025-03-07", "to_location": "Paris", "to_location_code": "PAR", "to_time": "22:00:00", "travel_time": "13:20:41.521778", "type_specific": {"boarding_time": "09:20:41.521778", "flight_number": "FL824", "gate_number": "G4"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"},{"distance": 64.49, "from_date": "2025-03-03", "from_location": "New York", "from_location_code": "NYC", "from_time": "07:00:00", "operator_name": "Operator_1", "passenger_details": [[Object]], "ticket_id": "e9f5d4ef-216a-4866-ab96-406078e37b7f", "ticket_type": "ferry", "time_travelled": "03:00:00", "to_date": "2025-03-06", "to_location": "Paris", "to_location_code": "PAR", "to_time": "09:00:00", "travel_time": "07:20:41.521778", "type_specific": {"deck_number": "D1", "ferry_name": "Ferry_7"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"}, {"distance": 307.41, "from_date": "2025-02-28", "from_location": "New York", "from_location_code": "NYC", "from_time": "15:00:00", "operator_name": "Operator_3", "passenger_details": [[Object]], "ticket_id": "06cdcafd-9e86-45ce-a13f-bec708e3bf7b", "ticket_type": "flight", "time_travelled": "05:00:00", "to_date": "2025-03-07", "to_location": "Paris", "to_location_code": "PAR", "to_time": "22:00:00", "travel_time": "13:20:41.521778", "type_specific": {"boarding_time": "09:20:41.521778", "flight_number": "FL824", "gate_number": "G4"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"},{"distance": 64.49, "from_date": "2025-03-03", "from_location": "New York", "from_location_code": "NYC", "from_time": "07:00:00", "operator_name": "Operator_1", "passenger_details": [[Object]], "ticket_id": "e9f5d4ef-216a-4866-ab96-406078e37b7f", "ticket_type": "ferry", "time_travelled": "03:00:00", "to_date": "2025-03-06", "to_location": "Paris", "to_location_code": "PAR", "to_time": "09:00:00", "travel_time": "07:20:41.521778", "type_specific": {"deck_number": "D1", "ferry_name": "Ferry_7"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"}, {"distance": 307.41, "from_date": "2025-02-28", "from_location": "New York", "from_location_code": "NYC", "from_time": "15:00:00", "operator_name": "Operator_3", "passenger_details": [[Object]], "ticket_id": "06cdcafd-9e86-45ce-a13f-bec708e3bf7b", "ticket_type": "flight", "time_travelled": "05:00:00", "to_date": "2025-03-07", "to_location": "Paris", "to_location_code": "PAR", "to_time": "22:00:00", "travel_time": "13:20:41.521778", "type_specific": {"boarding_time": "09:20:41.521778", "flight_number": "FL824", "gate_number": "G4"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"},{"distance": 64.49, "from_date": "2025-03-03", "from_location": "New York", "from_location_code": "NYC", "from_time": "07:00:00", "operator_name": "Operator_1", "passenger_details": [[Object]], "ticket_id": "e9f5d4ef-216a-4866-ab96-406078e37b7f", "ticket_type": "ferry", "time_travelled": "03:00:00", "to_date": "2025-03-06", "to_location": "Paris", "to_location_code": "PAR", "to_time": "09:00:00", "travel_time": "07:20:41.521778", "type_specific": {"deck_number": "D1", "ferry_name": "Ferry_7"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"}, {"distance": 307.41, "from_date": "2025-02-28", "from_location": "New York", "from_location_code": "NYC", "from_time": "15:00:00", "operator_name": "Operator_3", "passenger_details": [[Object]], "ticket_id": "06cdcafd-9e86-45ce-a13f-bec708e3bf7b", "ticket_type": "flight", "time_travelled": "05:00:00", "to_date": "2025-03-07", "to_location": "Paris", "to_location_code": "PAR", "to_time": "22:00:00", "travel_time": "13:20:41.521778", "type_specific": {"boarding_time": "09:20:41.521778", "flight_number": "FL824", "gate_number": "G4"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"},{"distance": 64.49, "from_date": "2025-03-03", "from_location": "New York", "from_location_code": "NYC", "from_time": "07:00:00", "operator_name": "Operator_1", "passenger_details": [[Object]], "ticket_id": "e9f5d4ef-216a-4866-ab96-406078e37b7f", "ticket_type": "ferry", "time_travelled": "03:00:00", "to_date": "2025-03-06", "to_location": "Paris", "to_location_code": "PAR", "to_time": "09:00:00", "travel_time": "07:20:41.521778", "type_specific": {"deck_number": "D1", "ferry_name": "Ferry_7"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"}, {"distance": 307.41, "from_date": "2025-02-28", "from_location": "New York", "from_location_code": "NYC", "from_time": "15:00:00", "operator_name": "Operator_3", "passenger_details": [[Object]], "ticket_id": "06cdcafd-9e86-45ce-a13f-bec708e3bf7b", "ticket_type": "flight", "time_travelled": "05:00:00", "to_date": "2025-03-07", "to_location": "Paris", "to_location_code": "PAR", "to_time": "22:00:00", "travel_time": "13:20:41.521778", "type_specific": {"boarding_time": "09:20:41.521778", "flight_number": "FL824", "gate_number": "G4"}, "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d"}]; 
    // const tempData = [];  
    console.log("🔍 Fetching all tickets... -> ticket Model");

      // TODO : uncomment this when done testing -> to avoid multiple api calls, remove temp data (upArrow)
      // const { data, error } = await supabase
      //   .from("tickets")
      //   .select(`
      //     *,
      //     from_location:geolocation!tickets_from_location_id_fkey(location_name, location_code),
      //     to_location:geolocation!tickets_to_location_id_fkey(location_name, location_code),
      //     bus_tickets(bus_number, bus_type),
      //     train_tickets(train_number, coach_number),
      //     ferry_tickets(ferry_name, deck_number ),
      //     flight_tickets(flight_number, gate_number, boarding_time),
      //     passenger_details(name, age, gender, seat_number)  
      //   `)
      // .eq("user_id", userId);
    

      // if (error) {
      //     console.error("Error fetching user tickets:", error);
      //     return;
      // }

      
      // const formattedData = processTickets(data);

      return tempData;
  }

  static async createTicket(ticketData) {
    const { data, error } = await supabase.from("tickets").insert([ticketData]);
    if (error) {
      console.error("Error creating ticket:", error);
      return null;
    }

    return data;
  }

  static async getTicketById(ticketId) {
    console.log("🔍 Fetching ticket by id... -> ticket Model");
  }

  static async updateTicket(ticketId, ticketData) {
    console.log("🔍 Updating ticket... -> ticket Model");
    const { data, error } = await supabase
        .from("tickets")
        .update(ticketData)
        .eq("ticket_id", ticketId);
    if (error) {
        console.error("Error updating ticket:", error);
        return null;
    }
    return data;
  }
}

export default TicketModel;