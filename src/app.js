import React, { useEffect, useState } from 'react';
import apiClient from './api/api-client';
import TaskList from './components/task-list';
import TaskForm from './components/task-form';
import imgLogo from './images/logo.png';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    apiClient
      .getTasks()
      .then(({data}) => {
        setTasks(data);
      });
  }, []);

  function handleOnCreate(fields) {
    apiClient
      .postTask(fields)
      .then(({data: task}) => {
        setTasks([...tasks, task]);
      });
  }

  function handleOnUpdate(id, fields) {
    apiClient
      .putTask(id, fields)
      .then(({data: task}) => {
        const index = tasks.findIndex(({id: filterId}) => task.id === filterId);
        const modifierTasks = [...tasks];

        modifierTasks.splice(index, 1, task);

        setTasks(modifierTasks);
      });
  }

  function handleOnRemove(id) {
    apiClient
      .deleteTask(id)
      .then(() => {
        const index = tasks.findIndex(({id: filterId}) => id === filterId);
        const modifierTasks = [...tasks];

        modifierTasks.splice(index, 1);

        setTasks(modifierTasks);
      });
  }

  return (
    <div className="page-wrapper">
      <div className="logo-wrapper">
        <img src={imgLogo} alt="" />
      </div>

      <h1>Tusur FDO task list</h1>

      <TaskForm
        onCreate={handleOnCreate}
      />

      <TaskList
        tasks={tasks}
        onUpdate={handleOnUpdate}
        onRemove={handleOnRemove}
      />
    </div>
  );
}

export default App;
