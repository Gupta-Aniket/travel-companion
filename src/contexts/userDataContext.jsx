import { useContext, useState, createContext } from "react";

const UserDataContext = createContext(null);

const DataItemProvider = ({ children }) => {
  // console.log("🛠️ DataItemProvider is Rendering..."); // Debug
   const [itemId, setItemId] = useState("");
   const [isSheetVisible, setSheetVisible] = useState(false);
   const [loggedInUser, setLoggedInUser] = useState(null);
   const [data, setData] = useState([]);
   const [showPhotos, setShowPhotos] = useState(false);

  const openBottomSheet = (itemId) => { 
    setItemId(itemId);
    setSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setSheetVisible(false);
    setShowPhotos(false);
    setItemId("");
  };

  const setDataWithLog = (newData) => {
    // console.log("🔍 Setting data in DataItemProvider...");
    setData(newData);
    // console.log("After setting data:", data);
  };

  return (
    <UserDataContext.Provider value={{ 
      showPhotos, setShowPhotos,
      itemId, setItemId, 
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
  // console.log("🛠️ Checking Context:", context);
  if (!context) {
    throw new Error("useDataItem must be used within a DataItemProvider"); 
  }
  return context;
};

export default DataItemProvider;
