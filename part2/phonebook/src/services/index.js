import Axios from 'axios'

const { REACT_APP_HOST } = process.env
const client = Axios.create({
  baseURL: REACT_APP_HOST,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
