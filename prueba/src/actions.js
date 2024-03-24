import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const SELECT_USER = 'SELECT_USER';
export const GET_USER_POSTS = 'GET_USER_POSTS';
export const GET_USER_TODOS = 'GET_USER_TODOS';
export const ADD_USER_TODO = 'ADD_USER_TODO';

export const getUsers = () => async dispatch => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch({ type: GET_USERS, payload: response.data });
};

export const selectUser = user => ({
  type: SELECT_USER,
  payload: user
});

export const getUserPosts = userId => async dispatch => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  dispatch({ type: GET_USER_POSTS, payload: response.data });
};

export const getUserTodos = userId => async dispatch => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
  const todos = response.data.sort((a, b) => b.id - a.id);
  dispatch({ type: GET_USER_TODOS, payload: todos });
};

export const addUserTodo = (userId, title, completed) => async dispatch => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      userId,
      title,
      completed
    });
    const newTodo = { id: response.data.id, userId, title, completed };
    dispatch({ type: ADD_USER_TODO, payload: newTodo });
  } catch (error) {
  }
};