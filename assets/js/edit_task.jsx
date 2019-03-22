import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import api from './api';
import AssignList from './assign_list';

function EditTask(props) {
  let {task} = props;
  if (!task) {
    api.fetch_task(props.match.params.id);
  }
  
  // let disabled = true;
  // if (task.user_id == props.)
  
  function saveTask() {
    let title = document.getElementById("task-title").value;
    let description = document.getElementById("task-description").value;
    let time = document.getElementById("task-time").value;
    let user_id = document.getElementById("task-assignee").value;
    let completed = document.getElementById("task-completed").checked;
    api.update_task(task.id, title, description, time, user_id, completed);
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
            <h3 className="card-header">Edit Task </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <form>
                    <strong>Title: </strong>
                    <input type="text" className="form-control" id="task-title" defaultValue={task.title} /> <br />
                    <strong>Description: </strong>
                    <input type="text" className="form-control" id="task-description" defaultValue={task.description} /> <br />
                    <strong>Time: </strong>
                    <input type="number" className="form-control" id="task-time" defaultValue={task.time} /> <br />
                    <strong>Assignee: </strong>
                    <select className="form-control" id="task-assignee" defaultValue={task.user_id}>
                      <AssignList />
                    </select> <br />
                    <strong>Completed: </strong>
                    <input type="checkbox" id="task-completed" defaultChecked={task.completed} /> <br />
                    <button type="submit" className="btn btn-success" 
                      onClick={() => saveTask()}>Save</button>
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
    task: state.task
  };
}

export default connect(state2props)(EditTask);