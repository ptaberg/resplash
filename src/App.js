import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { SearchResults, Home, UserRedirect } from "./pages";
import { useAuth } from "./context";
import { useEffect } from "react";
import { signIn } from "./context/actions";
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
        <Route path="/auth" component={UserRedirect} />
        <Route path="/search/:q" component={SearchResults} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }
