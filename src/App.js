import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { SearchResults, Home, UserAuth } from "./pages";
import { useAuth } from "./hooks";
import { useEffect } from "react";
import { signIn } from "./context";
import { LS_ACCESS_TOKEN } from "./constants";

export default function App() {
  const { state, dispatch } = useAuth();
  useEffect(() => {
    const savedToken = localStorage.getItem(LS_ACCESS_TOKEN);
    if (savedToken) {
      dispatch(
        signIn({
          access_token: savedToken,
        })
      );
    }
  }, []);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/auth" component={UserAuth} />
        <Route path="/search/:q" component={SearchResults} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }
