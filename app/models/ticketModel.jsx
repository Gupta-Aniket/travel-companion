import supabase from "../config/supabaseClient";
import  {processTickets}  from "./ticketDataModel";
class TicketModel {

  

  static async getAllTickets(userId) {
    
    // const tempData = [];  
    // console.log("🔍 Fetching all tickets... -> ticket Model");

    //   // TODO : uncomment this when done testing -> to avoid multiple api calls, remove temp data (upArrow)
    //   const { data, error } = await supabase
    //     .from("tickets")
    //     .select(`
    //       *,
    //       from_location:geolocation!tickets_from_location_id_fkey(location_name, location_code),
    //       to_location:geolocation!tickets_to_location_id_fkey(location_name, location_code),
    //       bus_tickets(bus_number, bus_type),
    //       train_tickets(train_number, coach_number),
    //       ferry_tickets(ferry_name, deck_number ),
    //       flight_tickets(flight_number, gate_number, boarding_time),
    //       passenger_details(name, age, gender, seat_number)  
    //     `)
    //   .eq("user_id", userId);
    

    //   if (error) {
    //       console.error("Error fetching user tickets:", error);
    //       return;
    //   }

      
    //   const formattedData = processTickets(data);

    //   return formattedData;
    return [
      {
        "ticket_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d",
        "ticket_type": "flight",
        "operator_name": "Airways Express",
        "from_location": "New York",
        "from_location_code": "NYC",
        "to_location": "Los Angeles",
        "to_location_code": "LAX",
        "travel_time": "05:45:00",
        "distance": 3980.0,
        "time_travelled": "2025-02-25",
        "from_date": "2025-02-25",
        "from_time": "14:30:00",
        "to_date": "2025-02-25",
        "to_time": "20:15:00",
        "passenger_details": [
          {
            "passenger_id": "p1",
            "name": "John Doe",
            "age": 32,
            "gender": "Male",
            "seat_number": "12A"
          },
          {
            "passenger_id": "p2",
            "name": "Aisha Khan",
            "age": 28,
            "gender": "Female",
            "seat_number": "12B"
          },
          {
            "passenger_id": "p3",
            "name": "Carlos Hernandez",
            "age": 45,
            "gender": "Male",
            "seat_number": "14C"
          }
        ],
        "type_specific": {
          "flight_number": "FL123",
          "gate_number": "G7",
          "boarding_time": "14:00:00",
          "class": "Business"
        }
      },
      {
        "ticket_id": "b2c3d4e5-f678-90ab-cdef-1234567890ab",
        "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d",
        "ticket_type": "train",
        "operator_name": "National Railways",
        "from_location": "Chicago",
        "from_location_code": "CHI",
        "to_location": "Boston",
        "to_location_code": "BOS",
        "travel_time": "08:30:00",
        "distance": 1600.0,
        "time_travelled": "2025-03-01",
        "from_date": "2025-03-01",
        "from_time": "09:00:00",
        "to_date": "2025-03-01",
        "to_time": "17:30:00",
        "passenger_details": [
          {
            "passenger_id": "p4",
            "name": "Jane Smith",
            "age": 27,
            "gender": "Female",
            "seat_number": "B12"
          },
          {
            "passenger_id": "p5",
            "name": "Rajesh Iyer",
            "age": 34,
            "gender": "Male",
            "seat_number": "B13"
          },
          {
            "passenger_id": "p6",
            "name": "Fatima El-Sayed",
            "age": 40,
            "gender": "Female",
            "seat_number": "B14"
          }
        ],
        "type_specific": {
          "train_number": "TR5678",
          "coach_number": "C3",
          "class": "First Class"
        }
      },
      {
        "ticket_id": "c3d4e5f6-7890-abcd-ef12-34567890abcd",
        "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d",
        "ticket_type": "bus",
        "operator_name": "Greyhound",
        "from_location": "Dallas",
        "from_location_code": "DAL",
        "to_location": "Austin",
        "to_location_code": "AUS",
        "travel_time": "03:15:00",
        "distance": 300.0,
        "time_travelled": "2025-03-05",
        "from_date": "2025-03-05",
        "from_time": "07:00:00",
        "to_date": "2025-03-05",
        "to_time": "10:15:00",
        "passenger_details": [
          {
            "passenger_id": "p7",
            "name": "Mark Johnson",
            "age": 40,
            "gender": "Male",
            "seat_number": "17C"
          },
          {
            "passenger_id": "p8",
            "name": "Yuki Tanaka",
            "age": 25,
            "gender": "Female",
            "seat_number": "18D"
          }
        ],
        "type_specific": {
          "bus_number": "B452",
          "bus_type": "Sleeper"
        }
      },
      {
        "ticket_id": "d4e5f678-90ab-cdef-1234-567890abcdef",
        "user_id": "31357eb0-11ec-490d-9aa7-5637073cd60d",
        "ticket_type": "ferry",
        "operator_name": "Blue Ferry Lines",
        "from_location": "Seattle",
        "from_location_code": "SEA",
        "to_location": "Victoria",
        "to_location_code": "VIC",
        "travel_time": "02:00:00",
        "distance": 120.0,
        "time_travelled": "2025-03-10",
        "from_date": "2025-03-10",
        "from_time": "12:00:00",
        "to_date": "2025-03-10",
        "to_time": "14:00:00",
        "passenger_details": [
          {
            "passenger_id": "p9",
            "name": "Lisa Adams",
            "age": 35,
            "gender": "Female",
            "seat_number": "Deck 2 - A14"
          },
          {
            "passenger_id": "p10",
            "name": "Mohammed Al-Farsi",
            "age": 50,
            "gender": "Male",
            "seat_number": "Deck 2 - A15"
          },
          {
            "passenger_id": "p11",
            "name": "Sophia Müller",
            "age": 29,
            "gender": "Female",
            "seat_number": "Deck 2 - A16"
          }
        ],
        "type_specific": {
          "ferry_name": "Ocean Voyager",
          "deck_number": "2"
        }
      }
    ]
;    
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