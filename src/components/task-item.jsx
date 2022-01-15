import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noop from '../utils/noop';

function TaskItem({task, onUpdate, onRemove}) {
  const [isChecked, setIsChecked] = useState(task.is_checked);
  const [text, setText] = useState(task.text);

  function handleOnChangeIsChecked(e) {
    setIsChecked(e.target.checked);
    onUpdate(task.id, {
      is_checked: e.target.checked,
    });
  }

  function handleOnChangeText(e) {
    setText(e.target.value);
    onUpdate(task.id, {
      text: e.target.value,
    });
  }

  function handleRemove() {
    onRemove(task.id);
  }

  return (
    <div className="task-item">
      <span className="task-id">#{task.id}</span>

      <label className={`task-checkbox-input ${isChecked ? 'checked' : ''}`}>
        <input
          type="checkbox"
          onChange={handleOnChangeIsChecked}
          checked={isChecked}
        />
      </label>

      <div className="task-text-input">
        <input
          type="text"
          onChange={handleOnChangeText}
          value={text}
          placeholder="Task text..."
          required
        />
      </div>

      <div className="task-controls">
        <button onClick={handleRemove}>Remove</button>
      </div>

      <div className="task-time">
        {new Date(task.created_at).toLocaleTimeString()}
      </div>
    </div>
  );
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
  onRemove: PropTypes.func,
};

TaskItem.defaultProps = {
  onUpdate: noop,
  onRemove: noop,
};

export default TaskItem;