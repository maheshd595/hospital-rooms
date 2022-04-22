/* eslint-disable no-undef */
import axios from 'axios';

const client = axios.create({ baseURL: 'http://192.168.29.86:5000/' });

export default {
  get: client.get,
  post: client.post,
  put: client.put,
  delete: client.delete,
};
