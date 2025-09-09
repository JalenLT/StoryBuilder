import axios from 'axios';

// Create a new Axios instance with our desired configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    withCredentials: true, // Crucial for sending cookies cross-domain
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    }
});

// We can also add a function to ensure the CSRF cookie is set.
// This should be called once when the application loads.
export const initializeApi = async () => {
    try {
        await apiClient.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Could not fetch CSRF cookie. API calls may fail.', error);
    }
};

export default apiClient;
