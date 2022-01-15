import apiClient from '../api/api-client';
import TaskForm from './task-form';

export default function TaskList() {
    apiClient
        .getTasks()
        .then(({data}) => {
            console.log(data);
        });

    function handleOnCreate() {

    }

    return <div className="task-list">
        <h1>FDO Task list</h1>
        <TaskForm />
    </div>;
}
