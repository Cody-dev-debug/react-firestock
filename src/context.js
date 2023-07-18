import { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import Firestore from "./handlers/firestore";
import { SET_ITEMS } from "./constants";

export const Context = createContext();

const { readDocs } = Firestore;

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const read = async () => {
    const items = await readDocs("stocks");
    dispatch({ type: SET_ITEMS, payload: { items } });
  };
  return (
    <Context.Provider value={{ state, dispatch, read }}>
      {children}
    </Context.Provider>
  );
};
export const useGlobalContext = () => useContext(Context)

export default Provider;
