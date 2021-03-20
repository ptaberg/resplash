import styled from "styled-components";
import { useAuth } from "../hooks";
import { signOut } from "../context/actions";
import { config } from "../constants";
import { Button } from "./Button";

const LogSpan = styled.span`
  font-family: "Poppins", sans-serif;
`;

export const UserLog = () => {
  const { state, dispatch } = useAuth();
  return (
    <>
      {!state.isLogged && (
        <Button
          type="secondary"
          onClick={() => {
            window.location.href = `https://unsplash.com/oauth/authorize?client_id=${config.access_key}&redirect_uri=http://localhost:3000/auth&response_type=code&scope=public+read_user+write_likes`;
          }}
        >
          Sign in
        </Button>
      )}
      {state.isLogged && (
        <Button
          type="secondary"
          onClick={() => {
            dispatch(signOut());
          }}
        >
          Sign out
        </Button>
      )}
    </>
  );
};
