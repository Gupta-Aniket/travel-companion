import { useContext, useState, createContext } from "react";

const DataItemContext = createContext(null);

export const DataItemProvider = ({ children }) => {
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
    <DataItemContext.Provider value = {{item, openBottomSheet, closeBottomSheet, isSheetVisible}}>
      {children}
    </DataItemContext.Provider>
  ) ;

};

export const useDataItem = () => {

  const context = useContext(DataItemContext);
  if (!context) {
    throw new Error("useDataItem must be used within a DataItemProvider"); 
  }
  return context;
};
