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
      console.error("全てのチャプターの取得APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async get(bookId, chapterId) {
    try {
      const token = await getAuthToken();

      const result = await axios.get(
        `${ENDPOINT_URL}/${bookId}/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("個別チャプターの取得APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async post(bookId, chapter) {
    try {
      const token = await getAuthToken();

      const result = await axios.post(`${ENDPOINT_URL}/${bookId}`, chapter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data;
    } catch (error) {
      console.error("チャプターの追加APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async patch(bookId, chapterId, chapter) {
    try {
      const token = await getAuthToken();

      const result = await axios.patch(
        `${ENDPOINT_URL}/${bookId}/${chapterId}`,
        chapter,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("チャプターの編集APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async delete(bookId, chapterId) {
    try {
      const token = await getAuthToken();

      const result = await axios.delete(
        `${ENDPOINT_URL}/${bookId}/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("チャプターの削除APIリクエストに失敗しました:", error);
      throw error;
    }
  },
};

export default chapterApi;
