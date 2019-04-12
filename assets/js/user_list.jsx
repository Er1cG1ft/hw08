import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { Link } from 'react-router-dom';

export default connect(({users}) => { return {users};})((props) => {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="row mt-5">
    <div className="col-lg-3">
      <AddUser />
    </div>
    <div className="col-9">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
});

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
    <td>{user.first_name}</td>
    <td>{user.last_name}</td>
    <td>
      <Link to={'/users/' + user.id} className="btn btn-primary">Show</Link>
      <Link to={'/users/edit/' + user.id} className="btn btn-warning">Edit</Link>
        <button className="btn btn-danger"
          onClick={() => api.delete_user(user.id)}>Delete</button>
    </td>
  </tr>;
}

function AddUser() {
  return (<form>
    <p>Add a User</p>
    <input type="text" id="user_email" placeholder="Email" className="form-control" /> <br />
    <input type="password" id="user_password" placeholder="Password" className="form-control" /> <br />
    <input type="text" id="user_firstname" placeholder="First Name" className="form-control" /> <br />
    <input type="text" id="user_lastname" placeholder="Last Name" className="form-control" /> <br />
    <button className="btn btn-success" onClick={() => create_user()}>Create</button>
    </form>);
}

function create_user() {
  event.preventDefault();
  let email = document.getElementById("user_email").value;
  let password = document.getElementById("user_password").value;
  let first_name = document.getElementById("user_firstname").value;
  let last_name = document.getElementById("user_lastname").value;
  api.add_user(email, password, first_name, last_name);
  document.getElementById("user_email").value = "";
  document.getElementById("user_password").value = "";
  document.getElementById("user_firstname").value = "";
  document.getElementById("user_lastname").value = "";
}