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
    const response = await api.get("/api/notes");
    return response.data;
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
