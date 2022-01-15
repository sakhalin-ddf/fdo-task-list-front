import { useState } from 'react';
import PropTypes from 'prop-types';
import noop from '../utils/noop';

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

    onCreate({text});

    resetForm();
  }

  return <div className="task-form">
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChangeText}
        placeholder="Input new task name here..."
        required
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