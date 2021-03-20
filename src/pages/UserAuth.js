import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { config, LS_ACCESS_TOKEN } from "../constants";
import { authTypes } from "../context";

export const UserAuth = () => {
  const location = useLocation();
  const history = useHistory();
  const code = new URLSearchParams(location.search).get("code");
  const [isLoading, setLoading] = useState(false);
  const { dispatch } = useAuth();

  useEffect(() => {
    setLoading(true);
    const getToken = async (cd) => {
      const request = await axios.post("https://unsplash.com/oauth/token", {
        client_id: config.access_key,
        client_secret: config.secret_key,
        redirect_uri: "http://localhost:3000/auth",
        code: cd,
        grant_type: "authorization_code",
      });
      localStorage.setItem(LS_ACCESS_TOKEN, request.data.access_token);

      dispatch({
        type: authTypes.SIGN_IN,
        payload: {
          access_token: request.data.access_token,
          isLogged: true,
        },
      });
      setLoading(false);
      history.push("/");
    };

    if (code) {
      getToken(code);
    }
  }, [code, dispatch, history]);

  if (isLoading) return <div>Loading...</div>;

  return <div>Success!</div>;
};
