import axios from "axios";

const expressUrl = import.meta.env.VITE_EXPRESS_URL;
const ENDPOINT_URL = `${expressUrl}contents`;

const contentApi = {
  async getAll(bookId, chapterId) {
    const result = await axios.get(`${ENDPOINT_URL}/${bookId}/${chapterId} `);
    return result.data;
  },
  async get(bookId, chapterId, contentsId) {
    const result = await axios.get(
      `${ENDPOINT_URL}/${bookId}/${chapterId}/${contentsId}`
    );
    return result.data;
  },
  async post(bookId, chapterId, contents) {
    const result = await axios.post(
      `${ENDPOINT_URL}/${bookId}/${chapterId}`,
      contents
    );
    return result.data;
  },
  async patch(bookId, chapterId, contentsId, contents) {
    const result = await axios.patch(
      `${ENDPOINT_URL}/${bookId}/${chapterId}/${contentsId}`,
      contents
    );
    return result.data;
  },
  async delete(bookId, chapterId, contentsId) {
    const result = await axios.delete(
      `${ENDPOINT_URL}/${bookId}/${chapterId}/${contentsId}`
    );
    return result.data;
  },
};

export default contentApi;
