import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import api from './api';
import AssignList from './assign_list';

function EditUser(props) {
  let {user} = props;
  if (!user) {
    api.fetch_user(props.match.params.id);
  }
  
  function saveUser() {
    let email = document.getElementById("user-email").value;
    let password = document.getElementById("user-password").value;
    let first_name = document.getElementById("user-firstname").value;
    let last_name = document.getElementById("user-lastname").value;
    api.update_user(user.id, email, password, first_name, last_name);
  }

  if (user == null) {
    return <div className="row mt-3">
        <div className="col-lg-12">
        <div className="alert alert-danger" role="alert">
          Error finding user.
        </div>
        </div>
        </div>;
  } else {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Link to={'/users'} className="btn btn-primary">Back</Link>
          <div className="card mt-2">
            <h3 className="card-header">Edit Task </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <form>
                    <strong>Email: </strong>
                    <input type="email" className="form-control" id="user-email" defaultValue={user.email} /> <br />
                    <strong>Reset Password: </strong>
                    <input type="text" className="form-control" id="user-password" /> <br />
                    <strong>First Name: </strong>
                    <input type="text" className="form-control" id="user-firstname" defaultValue={user.first_name} /> <br />
                    <strong>Last Name: </strong>
                    <input type="text" className="form-control" id="user-lastname" defaultValue={user.last_name} /> <br />
                    <button type="submit" className="btn btn-success" 
                      onClick={() => saveUser()}>Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return {
    user: state.user
  };
}

export default connect(state2props)(EditUser);