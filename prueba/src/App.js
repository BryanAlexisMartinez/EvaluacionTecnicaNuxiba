import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, selectUser, getUserPosts, getUserTodos, addUserTodo, ADD_USER_TODO } from './actions';
import axios from 'axios';


const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const selectedUser = useSelector(state => state.selectedUser);
  const posts = useSelector(state => state.posts);
  let todos = useSelector(state => state.todos);

  const [showPosts, setShowPosts] = useState(false);
  const [showTodos, setShowTodos] = useState(false);
  const [showNewTodoForm, setShowNewTodoForm] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoCompleted, setNewTodoCompleted] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleUserSelect = user => {
    dispatch(selectUser(user));
    setShowPosts(false);
    setShowTodos(false);
    setShowNewTodoForm(false);
  };

  const handleUserPosts = () => {
    dispatch(getUserPosts(selectedUser.id));
    setShowPosts(true);
    setShowTodos(false);
    setShowNewTodoForm(false);
  };

  const handleUserTodos = () => {
    dispatch(getUserTodos(selectedUser.id));
    setShowTodos(true);
    setShowPosts(false);
    setShowNewTodoForm(true);
  };

  const handleAddTodo = async () => {
    if (newTodoTitle.trim() !== '') {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
          userId: selectedUser.id,
          title: newTodoTitle,
          completed: newTodoCompleted
        });
        const newTodo = { id: response.data.id, userId: selectedUser.id, title: newTodoTitle, completed: newTodoCompleted };
        dispatch({ type: ADD_USER_TODO, payload: newTodo });
        setNewTodoTitle('');
        setNewTodoCompleted(false);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  todos = todos.sort((a, b) => b.id - a.id);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">User Management System</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            {users.map(user => (
              <button
                key={user.id}
                className={`list-group-item list-group-item-action ${selectedUser && selectedUser.id === user.id ? 'active' : ''}`}
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-8">
          {selectedUser && (
            <div>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title"><strong>Name:</strong> {selectedUser.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted"><strong>Username:</strong> {selectedUser.username}</h6>
                  <p className="card-text"><strong>Email:</strong> {selectedUser.email}</p>
                  <p className="card-text"><strong>Address:</strong> {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}</p>
                  <p className="card-text"><strong>Phone:</strong> {selectedUser.phone}</p>
                  <p className="card-text"><strong>Website:</strong> {selectedUser.website}</p>
                  <p className="card-text"><strong>Company:</strong> {selectedUser.company.name} - {selectedUser.company.catchPhrase}</p>
                  <div className="btn-group" role="group">
                    <button className="btn btn-primary" onClick={handleUserPosts}>Posts</button>
                    <button className="btn btn-primary" onClick={handleUserTodos}>Todos</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showPosts && posts.length > 0 && (
            <div className="mt-4">
              <h2>User Posts</h2>
              <ul className="list-group">
                {posts.map(post => (
                  <li key={post.id} className="list-group-item">{post.title} - {post.body}</li>
                ))}
              </ul>
            </div>
          )}
          {showTodos && todos.length > 0 && (
            <div className="mt-4">
              <h2>User Todos</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map(todo => (
                    <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.completed.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showNewTodoForm && (
                <div className="mt-4">
                  <h2>Add New Todo</h2>
                  <form onSubmit={handleAddTodo}>
                    <div className="mb-3">
                      <label htmlFor="newTodoTitle" className="form-label">Title</label>
                      <input type="text" className="form-control" id="newTodoTitle" value={newTodoTitle} onChange={e => setNewTodoTitle(e.target.value)} />
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="newTodoCompleted" checked={newTodoCompleted} onChange={e => setNewTodoCompleted(e.target.checked)} />
                      <label className="form-check-label" htmlFor="newTodoCompleted">Completed</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

