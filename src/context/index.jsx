import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    user: {},
    experiences: [],
    files: []
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
