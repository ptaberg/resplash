import styled from "styled-components";
import api from "../services/api";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { signOut } from "../context/actions";

const LogSpan = styled.span`
  font-family: "Poppins", sans-serif;
`;

export const UserLog = () => {
  const { state, dispatch } = useAuth();

  //   useEffect(() => {
  //     state
  //     getUser();
  //   }, []);

  console.log(state);

  return (
    <>
      {!state.isLogged && (
        <LogSpan
          onClick={() => {
            window.location.href = `https://unsplash.com/oauth/authorize?client_id=TkeJv_IfuDDUxigAJw93c7Fa4dnJq1PGjdVEm7kvTs8&redirect_uri=http://localhost:3000/auth&response_type=code&scope=public+read_user+write_likes`;
          }}
        >
          Sign in
        </LogSpan>
      )}
      {state.isLogged && (
        <LogSpan>
          {state.user?.first_name} {state.user?.last_name}{" "}
          <span
            onClick={() => {
              dispatch(signOut());
            }}
          >
            (Sign out)
          </span>
        </LogSpan>
      )}
    </>
  );
};
