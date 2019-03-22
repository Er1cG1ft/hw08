import store from './store';

class TheServer {
  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }
  
  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }
  
  send_put(path, data, callback) {
    $.ajax(path, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  fetch_tasks() {
    this.fetch_path(
      "/api/tasks",
      (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data
        });
      }
    );
  }
  
  fetch_task(id) {
    this.fetch_path(
      "/api/tasks/" + id,
      (resp) => {
        store.dispatch({
          type: 'TASK_SHOW',
          data: resp.data
        });
      }
    );
  }
  
  fetch_user(id) {
    this.fetch_path(
      "/api/users/" + id,
      (resp) => {
        store.dispatch({
          type: 'USER_SHOW',
          data: resp.data
        });
      }
    );
  }
  
  delete_user(id) {
    return $.ajax('/api/users/' + id, {
      method: 'delete',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: _resp => {
        this.fetch_users();
      }
    });
  }
  
  update_user(id, email, password, first_name, last_name) {
    let state = store.getState();
    console.log("update user", state);
    this.send_put(
      "/api/users/" + id,
      {user: {email, password, first_name, last_name}},
      (resp) => {
        this.fetch_users();
      },
    );
  }
  
  update_task(id, title, description, time, user_id, completed) {
    let state = store.getState();
    console.log("update task", state);
    this.send_put(
      "/api/tasks/" + id,
      {task: {title, description, user_id, time, completed}},
      (resp) => {
        this.fetch_tasks();
      },
    );
  }
  
  delete_task(id) {
    return $.ajax('/api/tasks/' + id, {
      method: 'delete',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: _resp => {
        window.location = '/';
      }
    });
  }

  fetch_users() {
    this.fetch_path(
      "/api/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data
        });
      }
    );
  }

  create_session(email, password) {
    this.send_post(
      "/api/auth",
      {email, password},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    );
  }
  
  end_session() {
    store.dispatch({
      type: 'END_SESSION',
      data: null
    });
  }
  
  add_task(title, description, user_id, time) {
    let state = store.getState();
    console.log("add task", state);
    this.send_post(
      "/api/tasks",
      {task: {title, description, user_id, time}},
      (resp) => {
        this.fetch_tasks();
      },
    );
  }
  
  add_user(email, password, first_name, last_name) {
    let state = store.getState();
    console.log("add user", state);
    this.send_post(
      "/api/users",
      {user: {email, password, first_name, last_name}},
      (resp) => {
        this.fetch_users();
      },
    );
  }
}

export default new TheServer();