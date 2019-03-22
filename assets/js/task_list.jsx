import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { Link } from 'react-router-dom';
import AssignList from './assign_list';
import UserName from './user_name';

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
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Time</th>
            <th>Assignee</th>
            <th>Completed?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasklist}
        </tbody>
      </table>
    </div>
  </div>
  </div>;
}

function Task(props) {
  let {task} = props;
  return  <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.time} mins</td>
      <td><Link to={'/users/' + task.user_id}><UserName user_id={task.user_id}/></Link></td>
      <td>{task.completed ? 'yes' : 'no'}</td>
      <td>
        <Link to={'/tasks/' + task.id} className="btn btn-primary">Show</Link>
        <Link to={'/tasks/edit/' + task.id} className="btn btn-warning">Edit</Link>
        <button className="btn btn-danger"
          onClick={() => api.delete_task(task.id)}>Delete</button>
      </td>
    </tr>
}

function AddTask() {
  return (<form>
    <p>Add a Task</p>
    <input type="text" id="task_title" placeholder="Title" className="form-control" /> <br />
      <input type="text" id="task_description" placeholder="Description" className="form-control" /> <br />
      <select className="form-control" id="task-assignee">
        <AssignList />
      </select> <br />
      <button className="btn btn-success" onClick={() => create_task()}>Create</button>
    </form>);
}

function create_task() {
  let title = document.getElementById("task_title").value;
  let description = document.getElementById("task_description").value;
  let assignee = document.getElementById("task-assignee").value;
  api.add_task(title, description, assignee, 0);
}

function state2props(state) {
  console.log("rerender", state);
  return {
    tasks: state.tasks
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);