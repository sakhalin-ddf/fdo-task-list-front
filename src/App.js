import React from 'react';
import './style/layout.scss';
import TaskList from './components/task-list';

function App() {
  return (
    <div className="page-wrapper">
      <TaskList />
    </div>
  );
}

export default App;
