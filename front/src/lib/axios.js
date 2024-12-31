import axios from "axios";
// Export axios instance with baseURL and withCredentials
export const axiosInstance = axios.create({
  baseURL: `http://localhost:5001/api`, //this is the backend url
  withCredentials: true, //this is to send the cookie to the backend
});
