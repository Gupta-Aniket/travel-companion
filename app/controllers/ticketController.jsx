import TicketModel from "../models/ticketModel";

class TicketController {

  static async fetchUserTickets(userId) {
    console.log("🔍 Fetching user tickets...-> ticketController");
    try {
      return await TicketModel.getAllTickets(userId);

    } catch (error) {
      console.error("Error fetching user tickets:", error.message);
      return [];
    }
  }


  static async addNewTicket(ticketData){
    try{
      return await TicketModel.createTicket(ticketData);
    }catch(error){
      console.error("Error creating a ticket:", error.message);
      return null;
    }
  }
}

export default TicketController;