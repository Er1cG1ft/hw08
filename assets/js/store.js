import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASK_LIST':
      return action.data;
    default:
      return state;
  }
}

function task(state = null, action) {
  switch (action.type) {
    case 'TASK_SHOW':
      return action.data;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  default:
    return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case 'USER_SHOW':
      return action.data;
    default:
      return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  default:
    return state;
  }
}

let login_form0 = {email: "", password: ""};
function login_form(state = login_form0, action) {
  return state;
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, task, users, user, session, login_form});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;