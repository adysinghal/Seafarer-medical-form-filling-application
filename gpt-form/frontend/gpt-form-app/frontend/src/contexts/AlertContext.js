import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export default function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const  showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  

  return <AlertContext.Provider value={{alert, showAlert}}>{children}</AlertContext.Provider>
}
