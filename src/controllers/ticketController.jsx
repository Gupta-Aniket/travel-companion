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


  static async addNewTicket(ticketData) {
    try {
      return await TicketModel.createTicket(ticketData);
    } catch (error) {
      console.error("Error creating a ticket:", error.message);
      return null;
    }
  }
  static async updateTicket(ticketId, ticketData) {
    try {
      return await TicketModel.updateTicket(ticketId, ticketData);
    } catch (error) {
      console.error("Error updating a ticket:", error.message);
      return null;
    }
  }
  static async deleteTicket(ticketId) {
    try {
      //todo : delete the tickets from the internal memory as well
      return await TicketModel.deleteTicket(ticketId);
    } catch (error) {
      console.error("Error deleting a ticket:", error.message);
      return null;
    }
  }
}

export default TicketController;