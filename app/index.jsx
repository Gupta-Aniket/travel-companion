import { Redirect } from "expo-router";
import DataItemProvider, { useDataItem } from "./contexts/userDataContext";
import authService from "./services/authService";
import TicketController from "./controllers/ticketController";
import { useEffect } from "react";

export default function Index() {
  return (

      <IndexContent />

  );
}

function IndexContent() {
  const { setLoggedInUser, loggedInUser, setData, data, setDataWithLog, setIndex } = useDataItem();
  // TODO : CHANGE THIS TO USE AUTH FIRST
  useEffect(() => {
    const addUserTickets = async () => {
      // const currentUserId = "31357eb0-11ec-490d-9aa7-5637073cd60d"; // Simulated user ID
      const currentUserId = await authService.getCurrentUserId();
      if (currentUserId) {
        setLoggedInUser(currentUserId);
        const tickets = await TicketController.fetchUserTickets(currentUserId);
        setDataWithLog(tickets);
      }
    };

    addUserTickets();
  },[]);


  
  const isLoggedin = true; // Simulated authentication check
  // return <Redirect href={isLoggedin ? "/(tabs)/tickets" : "/welcome"} />;

  return <Redirect href={"/(tabs)/tickets"} />;
  // return <Redirect href ={"./components/TicketDetailsForm"} />;
  // return <Redirect href={loggedInUser ? "/(tabs)/tickets" : "/welcome"} />;
}

