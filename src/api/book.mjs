import axios from "axios";
import { getAuthToken } from "../lib/getAuthToken.mjs";

const expressUrl = import.meta.env.VITE_EXPRESS_URL;
const ENDPOINT_URL = `${expressUrl}book`;

const bookApi = {
  async getAll(userId) {
    try {
      const token = await getAuthToken();
      
      const result = await axios.get(`${ENDPOINT_URL}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return result.data;
    } catch (error) {
      console.error("APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async get(userId, bookId) {
    const result = await axios.get(`${ENDPOINT_URL}/${userId}/${bookId}`);
    return result.data;
  },
  async post(userId, book) {
    const result = await axios.post(`${ENDPOINT_URL}/${userId}`, book);
    return result.data;
  },
  async patch(userId, bookId, book) {
    const result = await axios.patch(
      `${ENDPOINT_URL}/${userId}/${bookId}`,
      book
    );
    return result.data;
  },
  async delete(userId, bookId) {
    const result = await axios.delete(`${ENDPOINT_URL}/${userId}/${bookId}`);
    return result.data;
  },
};

export default bookApi;
