//---- Packages
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//---- Views
import Login from "./views/authentication/login/Login";
import Register from "./views/authentication/register/Register";
import Home from "./views/home/Home";
import PageNotFound from "./views/pageNotFound/PageNotFound";

interface Istate {
  _?: boolean | null;
}
interface Istate2 {
  isAuthenticated: boolean | null;
}

class Routes extends React.Component<Istate, Istate2, Istate> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAuthenticated: null,
    };
  }

  async componentDidMount() {
    this.setState({ isAuthenticated: await isPrivate() });
  }

  render() {
    if (this.state.isAuthenticated == null) {
      return (
        <div>
          <h1>Carregando</h1>
        </div>
      );
    }
    if (!this.state.isAuthenticated) {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home userLogged={false} />
            </Route>
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/user/register" component={Register} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      );
    } else
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home userLogged={true}></Home>
            </Route>
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      );
  }
}

async function isPrivate(): Promise<boolean> {
  var token: string | null = null;
  token = localStorage.getItem("token");
  if (token == null) token = sessionStorage.getItem("token");
  if (token != null)
    return await fetch("https://authenti-api.herokuapp.com/user/verifyAccount", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then(async (r) => {
        var dataJson = await r.json();
        if (dataJson.result === "ok") {
          return true;
        }
        return false;
      })
      .catch((e) => {
        return false;
      });
  return false;
}

export default Routes;
