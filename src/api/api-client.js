import RestClient from './rest-client';

class ApiClient extends RestClient {
  getTasks() {
    return this.httpGET('/api/task');
  }

  postTask(fields) {
    return this.httpPOST('/api/task', null, fields);
  }

  putTask(id, fields) {
    return this.httpPUT(`/api/task/${id}`, null, fields);
  }

  deleteTask(id) {
    return this.httpDELETE(`/api/task/${id}`);
  }
}

export default new ApiClient();
