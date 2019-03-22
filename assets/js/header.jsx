import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';
import UserName from './user_name';

function Header(props) {
  let {root, session, dispatch} = props;
  let session_info;
  if (session == null) {
    session_info = <div className="form-inline my-2">
      <input type="email" id="login_email" placeholder="email" className="form-control" />
      <input type="password" id="login_password" placeholder="password" className="form-control" />
      <button className="btn btn-secondary" onClick={() => login()}>Login</button>
    </div>;
  } else {
    session_info = <div className="my-2">
    <span className="navbar-text">
      Logged in as <UserName user_id={session.user_id} /> &nbsp; <Link to={"/"} onClick={() => api.end_session()} >Log Out</Link>
    </span>
    </div>
  }
  return (<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
      <a className="navbar-brand" href="/">Task Tracker</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">Tasks</Link>
          </li>
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">Users</Link>
          </li>
        </ul>
      </div>
      {session_info}
    </nav>);
}

function login() {
  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;
  api.create_session(email, password);
}

function state2props(state) {
  return { session: state.session };
}

export default connect(state2props)(Header);