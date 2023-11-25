import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { LogoEmail, LogoPassword, LogoScraptify, LogoIPB } from "../Logo";
import { HiasanLogin } from "../Hiasan";
import "../css/login.css";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo1, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo1) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo1]);

  return (
    <>
      <LogoScraptify />
      <div className="loginMenu">
        <h1>Sign in to continue</h1>
        <form onSubmit={submitHandler} className="loginBox">
          <div className="loginInputs">
            <div className="emailBox">
              <h4>Email</h4>
              <div className="inputs">
                <div className="logoBorder">
                  <LogoEmail />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="emailBox">
              <h4>Password</h4>
              <div className="inputs">
                <div className="logoBorder">
                  <LogoPassword />
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
              <div className="loginError">
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
              </div>
            </div>
          </div>

          <button className="signBtn" type="submit">
            <h4 style={{ color: "#ffffff" }}>Sign in</h4>
          </button>

          <Link to={`/register?redirect=${redirect}`}>
            <p className="regLink">No account? Create one</p>
          </Link>
        </form>
      </div>
      <LogoIPB />
      <HiasanLogin />
    </>
  );
}
