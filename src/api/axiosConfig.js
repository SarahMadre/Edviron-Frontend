import axios from "axios";

const api = axios.create({
  baseURL: "https://edviron-school-payment-dashboard-backend.onrender.com/api", // adjust if deployed
});

export default api;
