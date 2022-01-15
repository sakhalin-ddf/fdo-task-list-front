import { useState } from 'react';
import PropTypes from 'prop-types';
import noop from '../utils/noop';
import apiClient from '../api/api-client';

function TaskForm({onCreate}) {
  const [text, setText] = useState('');

  function resetForm() {
    setText('');
  }

  function handleChangeText(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    apiClient
      .postTask({text})
      .then(({data: task}) => {
        resetForm();

        onCreate(task);
      });
  }

  return <div className="task-form">
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChangeText}
      />

      <button type="submit">Create task</button>
    </form>
  </div>;
}

TaskForm.propTypes = {
  onCreate: PropTypes.func,
};

TaskForm.defaultProps = {
  onCreate: noop,
};

export default TaskForm;