import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';

function TaskList(props) {
  let {tasks, dispatch} = props;
  let tasklist = _.map(tasks, (t) => {
    return <Task key={t.id} task={t} dispatch={dispatch} />
  });
  return <div className="mt-3">
    <h2>Tasks</h2>
  <div className="row mt-3">
    <div className="col-lg-3">
      <AddTask />
    </div>
    <div className="col-lg-9">
      {tasklist}
    </div>
  </div>
  </div>;
}

function Task(props) {
  let {task} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">
        {task.description} <br/>
      </p>
    </div>
  </div>;
}

function AddTask() {
  return (<form>
    <input type="text" id="task_title" placeholder="Title" className="form-control" />
      <input type="text" id="task_description" placeholder="Description" className="form-control" />
      <button className="btn btn-secondary" onClick={() => create_task()}>Create</button>
    </form>);
}

function create_task() {
  let title = document.getElementById("task_title").value;
  let description = document.getElementById("task_description").value;
  api.add_task(title, description, 1);
}

function state2props(state) {
  console.log("rerender", state);
  return {
    tasks: state.tasks
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);