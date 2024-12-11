import axios from "axios";
import { getAuthToken } from "../lib/getAuthToken.mjs";

const expressUrl = import.meta.env.VITE_EXPRESS_URL;
const ENDPOINT_URL = `${expressUrl}chapter`;

const chapterApi = {
  async getAll(bookId) {
    try {
      const token = await getAuthToken();

      const result = await axios.get(`${ENDPOINT_URL}/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return result.data;
    } catch (error) {
      console.error("チャプターのAPIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async get(userId, bookId, chapterId) {
    const result = await axios.get(
      `${ENDPOINT_URL}/${userId}/${bookId}/${chapterId}`
    );
    return result.data;
  },
  async post(bookId, chapter) {
    try {
      const token = await getAuthToken();

      const result = await axios.post(
        `${ENDPOINT_URL}/${bookId}`,
        chapter,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("チャプターのAPIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async patch(userId, bookId, chapterId, chapter) {
    const result = await axios.patch(
      `${ENDPOINT_URL}/${userId}/${bookId}/${chapterId}`,
      chapter
    );
    return result.data;
  },
  async delete(userId, bookId, chapterId) {
    const result = await axios.delete(
      `${ENDPOINT_URL}/${userId}/${bookId}/${chapterId}`
    );
    return result.data;
  },
};

export default chapterApi;
