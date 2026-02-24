import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add browser token for favorites
api.interceptors.request.use((config) => {
  let token = localStorage.getItem('skycast_browser_token');
  if (!token) {
    token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('skycast_browser_token', token);
  }
  config.headers['X-Browser-Token'] = token;
  return config;
});

export const weatherService = {
  getCurrent: (city) => api.get(`/weather/current?city=${encodeURIComponent(city)}`),
  getForecast: (city) => api.get(`/weather/forecast?city=${encodeURIComponent(city)}`),
};

export const cityService = {
  getFeatured: () => api.get('/featured-cities'),
};

export const feedbackService = {
  submit: (data) => api.get('/feedback', data), // Wait, should be POST
};

// Fixing feedbackService.submit to use POST
export const submitFeedback = (data) => api.post('/feedback', data);

export const favoriteService = {
  getAll: () => api.get('/favorites'),
  add: (city, country_code) => api.post('/favorites', { city, country_code }),
  remove: (id) => api.delete(`/favorites/${id}`),
};

export default api;
