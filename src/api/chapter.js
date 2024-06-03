import axios from "axios";

const ENDPOINT_URL = "http://localhost:8080/api/chapter";

const chapterApi = {
  async getAll(bookId) {
    const result = await axios.get(`${ENDPOINT_URL}/${bookId}`);
    return result.data;
  },
  async get(bookId, chapterId) {
    const result = await axios.get(`${ENDPOINT_URL}/${bookId}/${chapterId}`);
    return result.data;
  },
  async post(bookId, chapter) {
    const result = await axios.post(`${ENDPOINT_URL}/${bookId}`, chapter);
    return result.data;
  },
  async patch(bookId, chapterId, chapter) {
    const result = await axios.patch(`${ENDPOINT_URL}/${bookId}/${chapterId}`, chapter);
    return result.data;
  },
  async delete(bookId, chapterId) {
    const result = await axios.delete(`${ENDPOINT_URL}/${bookId}/${chapterId}`);
    return result.data;
  },
};

export default chapterApi