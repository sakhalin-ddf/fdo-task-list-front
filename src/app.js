import React, { useEffect, useState } from 'react';
import apiClient from './api/api-client';
import TaskList from './components/task-list';
import TaskForm from './components/task-form';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    apiClient
      .getTasks()
      .then(({data}) => {
        setTasks(data);
      });
  }, []);

  function handleOnCreate(task) {
    setTasks([...tasks, task]);
  }

  function handleOnUpdate(task) {

  }

  return (
    <div className="page-wrapper">
      <TaskForm onCreate={handleOnCreate} />
      <TaskList tasks={tasks} onUpdate={handleOnUpdate} />
    </div>
  );
}

export default App;
