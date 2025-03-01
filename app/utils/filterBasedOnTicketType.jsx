export default function filterBasedOnTicketType(tickets, type) {
  if (type === "All") return tickets;
  return tickets.filter(item => item.ticket_type === type);
}