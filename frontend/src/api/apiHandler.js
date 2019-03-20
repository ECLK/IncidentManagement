import axios from 'axios';
import {API_BASE_URL} from '../config';

const handler = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6eyJzZXZlcml0eSI6Mywic3RhdHVzIjozfSwiaWQiOiIxMjMiLCJuYW1lIjoic3VwZXJ2aWNvciJ9.KVsQKyWRg18NxElk5jGcqo7O8DgmEQRpBgkomiCQr1o'
  },
});

export default handler;