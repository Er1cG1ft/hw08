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

  fetch_tasks() {
    this.fetch_path(
      "/api/tasks",
      (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
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
  
  add_task(title, description, user_id) {
    let state = store.getState();
    console.log("add task", state);
    this.send_post(
      "/api/tasks",
      {task: {title, description, user_id}},
      (resp) => {
        this.fetch_tasks();
      },
    );
  }

  add_task_time(task_id, time) {
    let state = store.getState();
    let user_id = state.session.user_id;
    console.log("add task time", state);
    this.send_post(
      "/api/task_times",
      {task_time: {task_id, user_id, time}},
      (resp) => {
        //this.fetch_task();
      },
    );
  }

  delete_task_time(id) {
    $.ajax('/api/task_times/' + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'CART_DELETE',
          cart_item_id: id,
        });
      }
    });
  }
}

export default new TheServer();