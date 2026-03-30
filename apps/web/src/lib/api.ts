import axios from 'axios';

const fallbackBaseUrl =
  typeof window === 'undefined' ? 'http://localhost:3001/api' : '/api';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || fallbackBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});
