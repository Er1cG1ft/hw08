import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import api from './api';
import UserName from './user_name';

function ShowTask(props) {
  let {task} = props;
  if (!task) {
    api.fetch_task(props.match.params.id);
  }

  if (task == null) {
    return <div className="row mt-3">
        <div className="col-lg-12">
        <div className="alert alert-danger" role="alert">
          Error finding task.
        </div>
        </div>
        </div>;
  } else {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Link to={'/'} className="btn btn-primary">Back</Link>
          <div className="card mt-2">
            <h3 className="card-header">Show Task 
            <Link to={'/tasks/edit/' + task.id}>
              <button className="btn btn-warning right-btn"
                onClick={() => api.fetch_task(task.id)}>
                Edit
              </button>
            </Link>
            <button className="btn btn-danger right-btn"
              onClick={() => api.delete_task(task.id)}>Delete</button>
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <strong>Title: </strong>
                  {task.title} <br />
                  <strong>Description: </strong>
                  {task.description} <br />
                  <strong>Time: </strong>
                  {task.time} mins<br />
                  <strong>Assignee: </strong>
                  <Link to={'/users/' + task.user_id}><UserName user_id={task.user_id}/></Link> <br />
                  <strong>Completed: </strong>
                  {task.completed ? 'yes' : 'no'}
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
    task: state.task
  };
}

export default connect(state2props)(ShowTask);