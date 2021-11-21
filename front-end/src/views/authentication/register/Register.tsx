import React from "react";

import { Redirect } from "react-router-dom";

interface registro {
  email: string;
  name: string;
  password: string;
  remember: boolean;
  token: string;
  userExists: boolean;
}

class Register extends React.Component<registro, registro, registro> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      remember: false,
      token: "",
      userExists: false,
    };
  }

  registerUser = async () => {
    const response = await fetch("https://authenti-api.herokuapp.com/user/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(this.state),
    });
    var dataJson = await response.json();
    if ((await dataJson.result) === "user-exists") {
      this.setState({ userExists: true });
    }
    if (dataJson.token === undefined) return;
    this.setState({ token: dataJson.token });
    if (this.state.remember) {
      localStorage.setItem("token", this.state.token);
    } else {
      sessionStorage.setItem("token", this.state.token);
    }
  };

  componentDidMount() {
    document
      .getElementsByTagName("button")[0]
      .addEventListener("click", async (e) => {
        await this.registerUser();
      });
  }

  componentWillUnmount() {
    window.location.reload();
  }

  render() {
    if (this.state.userExists)
      return <Redirect to="/user/login" exact></Redirect>;
    if (this.state.token !== "") {
      return <Redirect to="/" exact></Redirect>;
    }
    return (
      <div className="cotainer">
        <div className="form-group m-5">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control" pattern="@gmail.com"
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>
          <div className="mb-3">
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
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="remember"
                  onChange={(e) => {
                    this.setState({ remember: e.target.checked });
                  }}
                />
                Remember Login
              </label>
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Registrar
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
