import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import api from './api';
import Header from './header';
import UserList from './user_list';
import TaskList from './task_list';

export default function root_init(node, store) {
  let tasks = window.tasks;
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    //api.create_session("admin@gmail.com", "test");
    api.fetch_tasks();
    api.fetch_users();
    // this.state = {
    //   login_form: {email: "", password: ""},
    //   session: null,
    //   tasks: props.tasks,
    //   users: [],
    // };

    //this.fetch_products();
  }


  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <Route path="/" exact={true} render={() =>
            <TaskList />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList />
          } />
        </div>
      </Router>
    </div>;
  }
}