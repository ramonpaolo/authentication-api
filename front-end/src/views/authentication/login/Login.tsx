import React from "react";
import { Redirect } from "react-router-dom";

interface _ {
  _?: boolean;
}

interface login {
  email: string;
  password: string;
  remember: boolean;
  logged: boolean;
  errorLogin: boolean;
}

class Login extends React.Component<_, login> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      logged: false,
      remember: false,
      errorLogin: false,
    };
  }

  componentDidMount() {
    document
      .querySelector(".btn-primary")!
      .addEventListener("click", async () => {
        await this.loginUser();
      });
  }

  loginUser = async () => {
    const response = await fetch("https://authenti-api.herokuapp.com/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(this.state),
    });
    const data = await response.json();
    if (response.status === 401) {
      this.setState({ errorLogin: true });
      return;
    }
    if (this.state.remember) localStorage.setItem("token", data.token);
    else sessionStorage.setItem("token", data.token);

    this.setState({ logged: true });
  };

  componentWillUnmount() {
    window.location.reload();
  }

  render() {
    if (this.state.logged) return <Redirect to="/" exact></Redirect>;
    return (
      <div className="container">
        {this.state.errorLogin && (
          <div
            className="mt-5 alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Error Login.</strong> Usuário com o email{" "}
            <strong>{this.state.email}</strong> não existe
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => this.setState({ errorLogin: false })}
            ></button>
          </div>
        )}
        <div className="mb-3 row mt-5">
          <div className="form-group">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelpId"
              placeholder=""
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
            <small id="emailHelpId" className="form-text text-muted">
              Exemplo: joaopedro@gmail.com
            </small>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.state.password}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="remember"
                  value="checkedValue"
                  onChange={(e) =>
                    this.setState({ remember: e.target.checked })
                  }
                />
                Remember Login
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              data-toggle="button"
              aria-pressed="false"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
