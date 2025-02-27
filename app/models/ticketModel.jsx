import supabase from "../config/supabaseClient";
import { useDataItem } from "../contexts/userDataContext";
class TicketModel {

  static async getAllTickets(userId) {

    console.log("🔍 Fetching all tickets... -> ticket Model");

      const { data, error } = await supabase
        .from("tickets")
        .select(`
          *,
          from_location:geolocation!tickets_from_location_id_fkey(location_name, location_code),
          to_location:geolocation!tickets_to_location_id_fkey(location_name, location_code),
          bus_tickets(bus_number, seat_number, bus_type),
          train_tickets(train_number, coach_number, seat_number),
          ferry_tickets(ferry_name, deck_number, seat_number),
          flight_tickets(flight_number, gate_number, boarding_time)
        `)
        .eq("user_id", userId);
    
      if (error) {
        console.error("Error fetching user tickets:", error);
        return;
      }
    
      
      return data;

    

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
}

export default TicketModel;