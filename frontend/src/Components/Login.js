import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { apiUrls, baseURL } from "../apiConfig";

const Login = ({ setAccount }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceupdate] = useState();

  const handleCredentials = (e) => {
    setCredentials((value) => {
      return { ...value, [e.target.name]: e.target.value };
    });
  };

  const checkFormValidation = (e) => {
    e.preventDefault();
    const isValid = simpleValidator.current.allValid();
    if (!isValid) {
      simpleValidator.current.showMessages();
      forceupdate(1);
    } else handleLogin();
  };

  const header = {
    "Content-Type": "application/json",
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        baseURL + apiUrls.login,
        credentials,
        header
      );
    } catch (error) {}
  };

  return (
    <div className="wrapper-container">
      <div className="wrapper">
        <h2>Login to chat</h2>
        <form onSubmit={checkFormValidation}>
          <div className="input-box">
            <input
              type="text"
              name="email"
              value={credentials?.email}
              onChange={handleCredentials}
              placeholder="Enter email"
            />
            <div className="error">
              {simpleValidator.current.message(
                "email",
                credentials?.email,
                "required"
              )}
            </div>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={credentials?.password}
              onChange={handleCredentials}
              placeholder="Enter password"
            />
            <div className="error">
              {simpleValidator.current.message(
                "password",
                credentials?.password,
                "required"
              )}
            </div>
          </div>

          <div className="input-box button">
            <input type="Submit" role="button" value="Login" />
          </div>
          <div className="text">
            <h3>
              Do not have an account?{" "}
              <Link
                onClick={() => {
                  setAccount(false);
                }}>
                Create an account
              </Link>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
