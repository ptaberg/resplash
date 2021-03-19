import { createContext, useReducer, useMemo, useContext } from "react";
import { LS_ACCESS_TOKEN } from "../constants";

export const AuthContext = createContext();

const initialState = {
  user: "",
  isLogged: false,
  user: null,
  access_token: null,
};

export const authTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SIGN_IN:
      return {
        ...state,
        isLogged: true,
        access_token: action.payload.access_token,
      };
    case authTypes.SIGN_OUT:
      localStorage.removeItem(LS_ACCESS_TOKEN)
      return {
        ...state,
        isLogged: false,
        access_token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  const [state, dispatch] = context;

  return {
    state,
    dispatch,
  };
};
