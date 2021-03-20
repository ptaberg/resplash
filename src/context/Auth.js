import { createContext } from "react";
import { LS_ACCESS_TOKEN } from "../constants";
import { useReducer, useMemo } from "react";

export const AuthContext = createContext();

const initialState = {
  isLogged: false,
  access_token: null,
};

export const authTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

export const signIn = (payload) => ({
  type: authTypes.SIGN_IN,
  payload: {
    ...payload,
  },
});

export const signOut = () => ({
  type: authTypes.SIGN_OUT,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SIGN_IN:
      return {
        ...state,
        isLogged: true,
        access_token: action.payload.access_token,
      };
    case authTypes.SIGN_OUT:
      localStorage.removeItem(LS_ACCESS_TOKEN);
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
