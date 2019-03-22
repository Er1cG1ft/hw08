import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import api from './api';
import Header from './header';
import UserList from './user_list';
import TaskList from './task_list';
import ShowTask from './show_task';
import ShowUser from './show_user';
import EditTask from './edit_task';
import EditUser from './edit_user';
import AddUser from './add_user';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    api.fetch_tasks();
    api.fetch_users();
  }


  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact={true} render={() =>
              <TaskList />
            } />
            <Route path="/users" exact={true} render={() =>
              <UserList />
            } />
            <Route path="/tasks/:id" exact={true} component={ShowTask} />
            <Route path="/register" exact={true} component={AddUser} />
            <Route path="/users/:id" exact={true} component={ShowUser} />
            <Route path="/tasks/edit/:id" exact={true} component={EditTask} />
            <Route path="/users/edit/:id" exact={true} component={EditUser} />
          </Switch>
        </div>
      </Router>
    </div>;
  }
}