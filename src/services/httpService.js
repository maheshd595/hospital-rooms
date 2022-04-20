/* eslint-disable no-undef */
import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000/' });

export default {
  get: client.get,
  post: client.post,
  put: client.put,
  delete: client.delete,
};
