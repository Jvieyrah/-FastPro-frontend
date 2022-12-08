import axios from 'axios';

const httpRequest = axios.create({
  baseURL: 'https://fastpro-backend-production.up.railway.app',
});

export default httpRequest;