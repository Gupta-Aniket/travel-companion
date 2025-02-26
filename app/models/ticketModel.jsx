import supabase from "../config/supabaseClient";

class TicketModel {
  static async getAllTickets(userId) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching tickets:", error);
      return [];
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
}

export default TicketModel;