import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import api from './api';

function ShowUser(props) {
  let {user} = props;
  if (!user) {
    api.fetch_user(props.match.params.id);
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
          <Link to={'/'} className="btn btn-primary">Back</Link>
          <div className="card mt-2">
            <h3 className="card-header">Show User 
            <Link to={'/users/edit/' + user.id}>
              <button className="btn btn-warning right-btn"
                onClick={() => api.fetch_user(user.id)}>
                Edit
              </button>
            </Link>
            <button className="btn btn-danger right-btn"
              onClick={() => api.delete_user(user.id)}>Delete</button>
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <strong>Email: </strong>
                  {user.email} <br />
                  <strong>First Name: </strong>
                  {user.first_name} <br />
                  <strong>Assignee: </strong>
                  {user.last_name} <br />
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

export default connect(state2props)(ShowUser);