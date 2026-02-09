import axios from "axios";
import { auth } from "../config/firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add auth token to all requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Note {
  _id: string;
  title: string;
  content: string;
  userEmail: string;
  createdAt: string;
}

export const notesApi = {
  getAll: async (): Promise<Note[]> => {
    try {
      const response = await api.get("/api/notes");
      // Ensure we always return an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.error("API did not return an array:", response.data);
      return [];
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      throw error;
    }
  },

  create: async (title: string, content: string): Promise<Note> => {
    const response = await api.post("/api/notes", { title, content });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/notes/${id}`);
  },
};

export default api;
