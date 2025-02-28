import { useContext, useState, createContext } from "react";

const UserDataContext = createContext(null);

const DataItemProvider = ({ children }) => {
  console.log("🛠️ DataItemProvider is Rendering..."); // Debug
   const [itemIndex, setItemIndex] = useState(0);
   const [isSheetVisible, setSheetVisible] = useState(false);
   const [loggedInUser, setLoggedInUser] = useState(null);
   const [data, setData] = useState([]);

  const openBottomSheet = (idx) => { 
    setItemIndex(idx);
    setSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setSheetVisible(false);
    setItemIndex(-1);
  };

  const setDataWithLog = (newData) => {
    console.log("🔍 Setting data in DataItemProvider...");
    setData(newData);
    console.log("After setting data:", data);
  };

  return (
    <UserDataContext.Provider value={{ 
      itemIndex, setItemIndex, 
      data, setData,
      isSheetVisible, setSheetVisible,
      loggedInUser, setLoggedInUser, 
      openBottomSheet, 
      closeBottomSheet, 
      setDataWithLog,
    }}> 
      {children}
    </UserDataContext.Provider>
  );
};

export const useDataItem = () => {
  const context = useContext(UserDataContext);
  console.log("🛠️ Checking Context:", context);
  if (!context) {
    throw new Error("useDataItem must be used within a DataItemProvider"); 
  }
  return context;
};

export default DataItemProvider;
