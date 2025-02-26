import { useContext, useState, createContext } from "react";

const UserDataContext = createContext(null);

const DataItemProvider = ({ children }) => {
   [item, setItem] = useState(null);
   [isSheetVisible, setSheetVisible] = useState(false);



  const openBottomSheet = (newItem) => { 
    setItem(newItem);
    setSheetVisible(true);
  }
  const closeBottomSheet = () =>{
    setSheetVisible(false);
    setItem(null);
  }


  return (
    <UserDataContext.Provider value = {{item, openBottomSheet, closeBottomSheet, isSheetVisible}}>
      {children}
    </UserDataContext.Provider>
  ) ;

};

const useDataItem = () => {

  const context = useContext(DataItemContext);
  if (!context) {
    throw new Error("useDataItem must be used within a DataItemProvider"); 
  }
  return context;
};

export default DataItemProvider;