import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function root_init(node) {
  let users = window.users;
  ReactDOM.render(<Root users={users} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_form: {email: "", password: ""},
      session: null,
      tasks: props.tasks,
      users: [],
    };

    //this.fetch_products();
  }

  fetch_tasks() {
    $.ajax("/api/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      },
    });
  }

  fetch_users() {
    $.ajax("/api/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      },
    });
  }
  
  login() {
    $.ajax("/api/auth", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(this.state.login_form),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      }
    });
  }
  
  update_login_form(data) {
    let form1 = _.assign({}, this.state.login_form, data);
    let state1 = _.assign({}, this.state, { login_form: form1 });
    this.setState(state1);
  }


  render() {
    return <div>
      <Router>
        <div>
          <Header session={this.state.session} root={this} />
          <Route path="/" exact={true} render={() =>
            <TaskList tasks={this.state.tasks} />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  let {root, session} = props;
  let session_info;
  if (session == null) {
    session_info = <div className="form-inline my-2">
      <input type="email" placeholder="email" className="form-control"
             onChange={(ev) => root.update_login_form({email: ev.target.value})} />
      <input type="password" placeholder="password" className="form-control"
             onChange={(ev) => root.update_login_form({password: ev.target.value})} />
      <button className="btn btn-secondary" onClick={() => root.login()}>Login</button>
    </div>;
  } else {
    session_info = <div className="my-2">
    <span class="navbar-text">
      Logged in as {session.user_id}
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
            <Link to={"/tasks"} className="nav-link" onClick={root.fetch_tasks.bind(root)}>Tasks</Link>
          </li>
          <li className="nav-item">
            <Link to={"/users"} className="nav-link" onClick={root.fetch_users.bind(root)}>Users</Link>
          </li>
        </ul>
      </div>
      {session_info}
    </nav>);
}

function TaskList(props) {
  let tasks = _.map(props.tasks, (pp) => <Task key={pp.id} task={pp} />);
  return <div className="row">
    {tasks}
  </div>;
}

function Task(props) {
  let {task} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">
        {task.description} <br/>
        time: {task.time}
      </p>
    </div>
  </div>;
}

function UserList(props) {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="row mt-5">
    <div className="col-12">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Admin?</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
}

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
    <td>{user.first_name}</td>
    <td>{user.last_name}</td>
    <td>{user.admin ? "yes" : "no"}</td>
  </tr>;
}
