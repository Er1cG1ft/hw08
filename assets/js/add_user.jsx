import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import api from './api';

function AddUser() {
  return (<form>
    <h2>Register</h2>
    <input type="text" id="user_email" placeholder="Email" className="form-control" /> <br />
    <input type="password" id="user_password" placeholder="Password" className="form-control" /> <br />
    <input type="text" id="user_firstname" placeholder="First Name" className="form-control" /> <br />
    <input type="text" id="user_lastname" placeholder="Last Name" className="form-control" /> <br />
    <button className="btn btn-success" onClick={() => create_user()}>Create</button>
    </form>);
}

function create_user() {
  let email = document.getElementById("user_email").value;
  let password = document.getElementById("user_password").value;
  let first_name = document.getElementById("user_firstname").value;
  let last_name = document.getElementById("user_lastname").value;
  api.add_user(email, password, first_name, last_name);
}
function state2props(state) {
  return {
    task: state.task
  };
}

export default connect(state2props)(AddUser);