export const processTickets = (tickets) => {
  return tickets.map(ticket => {
    return {
      ticket_id: ticket.ticket_id,
      user_id: ticket.user_id,
      ticket_type: ticket.ticket_type,
      operator_name: ticket.operator_name,
      from_location: ticket.from_location || "Unknown",
      from_location_code: ticket.from_location_code || "N/A",
      to_location: ticket.to_location || "Unknown",
      to_location_code: ticket.to_location_code || "N/A",
      from_date: ticket.from_date,
      to_date: ticket.to_date,
      from_time: ticket.from_time,
      to_time: ticket.to_time,
      travel_time: ticket.travel_time,
      time_travelled: ticket.time_travelled,
      distance: ticket.distance,
      passenger_details: ticket.passenger_details || [],

      type_specific:
        ticket.ticket_type === "train" ? ticket.train_tickets :
        ticket.ticket_type === "flight" ? ticket.flight_tickets :
        ticket.ticket_type === "bus" ? ticket.bus_tickets :
        ticket.ticket_type === "ferry" ? ticket.ferry_tickets :
        null
    };
  });
};
