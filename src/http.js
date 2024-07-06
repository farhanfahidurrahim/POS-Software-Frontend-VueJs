import axios from "axios";

// Set the base URL from environment variables
axios.defaults.baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// You can set other default configurations here
// For example, setting default headers

const auth_token = localStorage.getItem('authToken')
axios.defaults.headers.common['Authorization'] = `Bearer ${auth_token}`;


export default axios;