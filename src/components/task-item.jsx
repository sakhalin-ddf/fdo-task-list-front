import React from 'react';
import PropTypes from 'prop-types';
import noop from '../utils/noop';

function TaskItem({task, onUpdate}) {
  return (<div className="task-item">
    <form action="">
      <input type="checkbox" />
      <input type="text" />
    </form>
    <pre>{JSON.stringify(task, null, 4)}</pre>
  </div>);
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    is_checked: PropTypes.bool,
    text: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

TaskItem.defaultProps = {
  onUpdate: noop,
};

export default TaskItem;