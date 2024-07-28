import axios from "axios";
import { User, Post, Todo, Album, Photo, Comment } from "../types/types";
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getUser = async (userId: number): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getUserTodos = async (userId: number): Promise<Todo[]> => {
  try {
    const response = await api.get<Todo[]>(`/todos?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user todos:", error);
    throw error;
  }
};

export const getUserAlbums = async (userId: number): Promise<Album[]> => {
  try {
    const response = await api.get<Album[]>(`/albums?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user albums:", error);
    throw error;
  }
};

export const getUserPhotos = async (albumId: number): Promise<Photo[]> => {
  try {
    const response = await api.get<Photo[]>(`/photos?albumId=${albumId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user Photos:", error);
    throw error;
  }
};

export const getUserPostComments = async (
  postId: number
): Promise<Comment[]> => {
  try {
    const response = await api.get<Comment[]>(`/comments?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user Photos:", error);
    throw error;
  }
};
export default api;
