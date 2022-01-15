import React from 'react';
import TaskItem from './task-item';
import PropTypes from 'prop-types';
import noop from '../utils/noop';

function TaskList({tasks, onUpdate}) {
  return <div className="task-list">
    <ul>
      {
        tasks.map(task => (
          <li key={task.id}>
            <TaskItem task={task} onUpdate={onUpdate} />
          </li>
        ))
      }
    </ul>
  </div>;
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    is_checked: PropTypes.bool,
    text: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  })),
  onUpdate: PropTypes.func,
};

TaskList.defaultProps = {
  onUpdate: noop,
};

export default TaskList;