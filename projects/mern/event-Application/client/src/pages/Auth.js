import React, { Component, Fragment } from "react";
import authContext from "../context/authContext";
import "./css/auth.css";

export default class Auth extends Component {
  state = {
    isLogin: true,
  };

  static contexType = authContext;

  constructor(props) {
    super(props);

    this.nameEl = React.createRef();
    this.emailEl = React.createRef();
    this.passswordEl = React.createRef();
  }

  switchModehandller = () => {
    this.setState((prestate) => {
      return { isLogin: !prestate.isLogin };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    let name = null;
    const email = this.emailEl.current.value;
    const password = this.passswordEl.current.value;

    let reqBody = null;

    if (this.state.isLogin) {
      if (!email === 0 || !password) {
        alert("All fields are required");
        return;
      }
    } else {
      name = this.nameEl.current.value;
      if (!name || !email || !password) {
        alert("All fields are required");
        return;
      }
    }

    if (this.state.isLogin) {
      reqBody = {
        query: `
          query{
            login(email:"${email}",password:"${password}"){
              token
            }
          }
        `,
      };
    } else {
      reqBody = {
        query: `
          mutation{
            createUser(userInput:{name:"${name}",email:"${email}",password:"${password}"}){
              _id,
              userid
            }
          }
        `,
      };
    }

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data.login);
        if(data.login.token){
          this.context.login(data.login.token,data.login)
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!");
      });
  };

  render() {
    return (
      <Fragment>
        <form className="auth-form" onSubmit={this.submitHandler}>
          {!this.state.isLogin && (
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                ref={this.nameEl}
                placeholder="Enter name"
              />
            </div>
          )}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              ref={this.emailEl}
              placeholder="Enter Email"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              ref={this.passswordEl}
              placeholder="Enter password"
            />
          </div>
          <div className="form-action">
            <button type="submit">Submit</button>
            <button type="button" onClick={this.switchModehandller}>
              Switch to {this.state.isLogin ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
