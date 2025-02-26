import { useContext, useState, createContext } from "react";

const DataItemContext = createContext(null);

export const DataItemProvider = ({ children }) => {
  console.log("✅ DataItemProvider is wrapping the app!"); // Debug
   const [data, setData] = useState(null);
   const [index, setIndex] = useState(0);
   const [isSheetVisible, setSheetVisible] = useState(false);
   const[loggedInUser, setLoggedInUser] = useState(null);


  const openBottomSheet = (index) => { 
    setIndex(index);
    setSheetVisible(true);
  }
  const closeBottomSheet = () =>{
    setSheetVisible(false);
    setIndex(0);
  }


  return (
    <DataItemContext.Provider value = {{data, setData, index, setIndex, isSheetVisible, openBottomSheet, closeBottomSheet, loggedInUser, setLoggedInUser}}>
      {children}
    </DataItemContext.Provider>
  ) ;

};

export const useDataItem = () => {
  console.log("🔍 Checking DataItemContext...");
  
  const context = useContext(DataItemContext);
  if (!context) {
    console.error("❌ useDataItem() is called OUTSIDE DataItemProvider!");
    throw new Error("useDataItem must be used within a DataItemProvider");
  }
  
  return context;
};

