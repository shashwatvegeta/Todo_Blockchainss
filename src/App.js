import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [todoList, setTodoList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  async function loadBlockchainData() {
    const web3 = new Web3("http://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const todoListContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    setTodoList(todoListContract);

    await loadTasks(todoListContract);
  }

  async function loadTasks(contract = todoList) {
    const taskCount = await contract.methods.taskCount().call();
    let tasksArray = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await contract.methods.tasks(i).call();
      tasksArray.push(task);
    }
    setTasks(tasksArray);
  }

  async function addTask(e) {
    e.preventDefault();
    if (newTask && todoList) {
      await todoList.methods.createTask(newTask).send({ from: account });
      setNewTask('');
      await loadTasks();
    }
  }

  async function toggleTaskCompletion(taskId) {
    if (todoList) {
      await todoList.methods.toggleCompleted(taskId).send({ from: account });
      await loadTasks();
    }
  }

  async function deleteTask(taskId) {
    if (todoList) {
      await todoList.methods.deleteTask(taskId).send({ from: account });
      await loadTasks();
    }
  }

  return (
    <div className="container">
      <div className="todo-card">
        <h1 className="title">Blockchain Todo List</h1>
        <div className="account">
          Connected Account: <span className="account-address">{account}</span>
        </div>

        <form onSubmit={addTask} className="add-task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="task-input"
          />
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>

        <div className="task-list">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : 'pending'}`}
            >
              <div className="task-content">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="status-icon"
                >
                  {task.completed ? '✓' : '○'}
                </button>
                <span className="task-text">{task.content}</span>
              </div>
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`status-button ${task.completed ? 'completed' : 'pending'}`}
              >
                {task.completed ? 'Completed' : 'Pending'}
              </button>
              {/* <button
                onClick={() => deleteTask(task.id)} 
                className="delete-button"
              >
                Delete
              </button> */}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;
