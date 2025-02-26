import { Redirect, router } from "expo-router";
import { DataItemProvider, useDataItem } from "../contexts/dataItemContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "./services/authService";
import TicketController from "./controllers/ticketController";
import { useRouter } from "expo-router";


export default function Index() {
  
  const router = useRouter();
  // TODO : change this after tesing , remove isover and if(isover)
  const isOver = false;
  if (isOver === true) {
    const { setData, setIndex, setLoggedInUser } = useDataItem();
    try {
      const currentUserId = authService.getCurrentUserId();
      if (currentUserId) {
        setLoggedInUser(currentUserId);
        TicketController.fetchUserTickets(currentUserId).then((tickets) => {
          setData(tickets);
          setIndex(0);
          console.log("Tickets fetched:", tickets);
        });
      }
      return <DataItemProvider>
         <Redirect href="/(tabs)/tickets" />;
      </DataItemProvider>;
    } catch (error) {
      console.error("Error fetching user tickets:", error.message);
    }
  }
  
    return (
      <DataItemProvider>
        <Redirect href="/welcome" />
      </DataItemProvider>
    );
  
}

