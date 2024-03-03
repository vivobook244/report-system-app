import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:442/api',
});