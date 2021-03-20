import { authTypes } from "./Auth";

export const signIn = (payload) => ({
  type: authTypes.SIGN_IN,
  payload: {
    ...payload,
  },
});

export const signOut = () => ({
  type: authTypes.SIGN_OUT,
});
