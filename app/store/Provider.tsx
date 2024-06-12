import React, { useReducer, ReactNode } from "react";
import { StoreContext } from "./context";
import { reducer, initialState } from "./reducer";

interface ProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
