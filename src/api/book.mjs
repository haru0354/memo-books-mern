import axios from "axios";
import { getAuthToken } from "../lib/getAuthToken.mjs";

const expressUrl = import.meta.env.VITE_EXPRESS_URL;
const ENDPOINT_URL = `${expressUrl}book`;

const bookApi = {
  async getAll() {
    try {
      const token = await getAuthToken();

      const result = await axios.get(`${ENDPOINT_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return result.data;
    } catch (error) {
      console.error("全ての本の取得APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async get(bookId) {
    try {
      const token = await getAuthToken();

      const result = await axios.get(`${ENDPOINT_URL}/${userId}/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return result.data;
    } catch (error) {
      console.error("個別の本の取得APIリクエストに失敗しました:", error);
      throw error;
    }
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
      console.error("本の追加APIリクエストに失敗しました:", error);
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
      console.error("本の編集APIリクエストに失敗しました:", error);
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
      console.error("本の削除APIリクエストに失敗しました:", error);
      throw error;
    }
  },
};

export default bookApi;
