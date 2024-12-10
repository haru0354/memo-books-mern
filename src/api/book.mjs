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
  async post(book) {
    try {
      const token = await getAuthToken();

      const result = await axios.post(`${ENDPOINT_URL}`, book, {
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
  async patch(bookId, book) {
    try {
      const token = await getAuthToken();

      const result = await axios.patch(`${ENDPOINT_URL}/${bookId}`, book, {
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
  async delete(bookId) {
    try {
      const token = await getAuthToken();

      const result = await axios.delete(`${ENDPOINT_URL}/${bookId}`, {
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
};

export default bookApi;
