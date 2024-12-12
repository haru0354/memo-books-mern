import axios from "axios";
import { getAuthToken } from "../lib/getAuthToken.mjs";

const expressUrl = import.meta.env.VITE_EXPRESS_URL;
const ENDPOINT_URL = `${expressUrl}contents`;

const contentApi = {
  async getAll(bookId, chapterId) {
    try {
      const token = await getAuthToken();

      const result = await axios.get(`${ENDPOINT_URL}/${bookId}/${chapterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return result.data;
    } catch (error) {
      console.error("全てのコンテンツの表示APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async get(bookId, chapterId, contentsId) {
    try {
      const token = await getAuthToken();

      const result = await axios.get(
        `${ENDPOINT_URL}/${bookId}/${chapterId}/${contentsId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return result.data;
    } catch (error) {
      console.error("個別コンテンツの表示APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async post(bookId, chapterId, contents) {
    try {
      const token = await getAuthToken();

      const result = await axios.post(
        `${ENDPOINT_URL}/${bookId}/${chapterId}`,
        contents,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("コンテンツの追加APIリクエストに失敗しました:", error);
      throw error;
    }
  },
  async patch(userId, bookId, chapterId, contentsId, contents) {
    const result = await axios.patch(
      `${ENDPOINT_URL}/${userId}/${bookId}/${chapterId}/${contentsId}`,
      contents
    );
    return result.data;
  },
  async delete(userId, bookId, chapterId, contentsId) {
    const result = await axios.delete(
      `${ENDPOINT_URL}/${userId}/${bookId}/${chapterId}/${contentsId}`
    );
    return result.data;
  },
};

export default contentApi;
