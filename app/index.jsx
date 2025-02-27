import { Redirect } from "expo-router";
import DataItemProvider, { useDataItem } from "./contexts/userDataContext";
import authService from "./services/authService";
import TicketController from "./controllers/ticketController";
import { useEffect } from "react";

export default function Index() {
  return (
    <DataItemProvider>
      <IndexContent />
    </DataItemProvider>
  );
}

function IndexContent() {
  const { setLoggedInUser, loggedInUser, setData, data, setDataWithLog, setIndex } = useDataItem();
  // TODO : CHANGE THIS TO USE AUTH FIRST
  useEffect(() => {
    const addUserTickets = async () => {
      const currentUserId = "31357eb0-11ec-490d-9aa7-5637073cd60d"; // Simulated user ID
      if (currentUserId) {
        setLoggedInUser(currentUserId);
        const tickets = await TicketController.fetchUserTickets(currentUserId);
        setData(tickets);
      }
    };

    addUserTickets();
  }, [data, setData]);


  
  const isLoggedin = true; // Simulated authentication check
  
  return <Redirect href={isLoggedin ? "/(tabs)/tickets" : "/welcome"} />;
}

