import React from "react";
import { Link } from "react-router-dom";

interface _ {
  userLogged: boolean;
}

interface user {
  userLogged: boolean;
}

export default class Home extends React.Component<_, user> {
  constructor(props: any) {
    super(props);
    this.state = {
      userLogged: props.userLogged,
    };
  }

  componentDidMount() {
    document.getElementById("deslogar")?.addEventListener("click", (e) => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.reload();
    });
  }

  render() {
    if (this.state.userLogged)
      return (
        <div className="container text-center mt-5">
          <h1>Você está logado : )</h1>
          <button type="button" className="btn btn-primary me-3" id="deslogar">
            Deslogar
          </button>
        </div>
      );
    return (
      <div className="container text-center mt-5">
        <h1>Você não está logado : (</h1>
        <Link to="/user/login" className="btn btn-primary me-3">
          Logar
        </Link>
        <Link to="/user/register" className="btn btn-primary">
          Registrar
        </Link>
      </div>
    );
  }
}
