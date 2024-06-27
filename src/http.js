import axios from "axios";

// Set the base URL from environment variables
axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// You can set other default configurations here
// For example, setting default headers
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default axios;
