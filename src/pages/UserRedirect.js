import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth, authTypes } from "../context";

export const UserRedirect = () => {
  const location = useLocation();
  const history = useHistory();
  const code = new URLSearchParams(location.search).get("code");
  const [isLoading, setLoading] = useState(false);
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const getToken = async (cd) => {
      const config = {
        client_id: "TkeJv_IfuDDUxigAJw93c7Fa4dnJq1PGjdVEm7kvTs8",
        client_secret: "0D55tcExjUMF5fvpVjK5vhjufWL5LS9l1yDMy5ukKJs",
        redirect_uri: "http://localhost:3000/auth",
        code: cd,
        grant_type: "authorization_code",
      };

      const request = await axios.post(
        "https://unsplash.com/oauth/token",
        config
      );
      localStorage.setItem("access_token", request.data.access_token);

      dispatch({
        type: authTypes.SIGN_IN,
        payload: {
          access_token: request.data.access_token,
          isLogged: true,
        },
      });
      history.push("/");
    };

    if (code) {
      getToken(code);
    }
  }, [code, dispatch, history]);

  if (isLoading) return <div>Loading...</div>;

  return <div>Success!</div>;
};
