import axios from "axios";

const expressUrl = import.meta.env.VITE_EXPRESS_URL;
const ENDPOINT_URL = `${expressUrl}chapter`;

const chapterApi = {
  async getAll(userId, bookId) {
    const result = await axios.get(`${ENDPOINT_URL}/${userId}/${bookId}`);
    return result.data;
  },
  async get(userId, bookId, chapterId) {
    const result = await axios.get(`${ENDPOINT_URL}/${userId}/${bookId}/${chapterId}`);
    return result.data;
  },
  async post(userId, bookId, chapter) {
    const result = await axios.post(`${ENDPOINT_URL}/${userId}/${bookId}`, chapter);
    return result.data;
  },
  async patch(userId, bookId, chapterId, chapter) {
    const result = await axios.patch(`${ENDPOINT_URL}/${userId}/${bookId}/${chapterId}`, chapter);
    return result.data;
  },
  async delete(userId, bookId, chapterId) {
    const result = await axios.delete(`${ENDPOINT_URL}/${userId}/${bookId}/${chapterId}`);
    return result.data;
  },
};

export default chapterApi