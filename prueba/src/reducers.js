import { combineReducers } from 'redux';
import {
  GET_USERS,
  SELECT_USER,
  GET_USER_POSTS,
  GET_USER_TODOS
} from './actions';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
};

const selectedUserReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.payload;
    default:
      return state;
  }
};

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_POSTS:
      return action.payload;
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_TODOS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  users: usersReducer,
  selectedUser: selectedUserReducer,
  posts: postsReducer,
  todos: todosReducer
});
