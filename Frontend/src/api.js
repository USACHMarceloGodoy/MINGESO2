import axios from 'axios';

export default axios.create({
  baseURL: 'http://gateway-service:8080'
});
