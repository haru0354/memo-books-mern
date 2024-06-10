import axios from "axios";

const expressUrl = import.meta.env.VITE_EXPRESS_URL;
const ENDPOINT_URL = `${expressUrl}book`;

const bookApi = {
  async getAll(userId) {
    const result = await axios.get(`${ENDPOINT_URL}/${userId}`);
    return result.data;
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
    const result = await axios.patch(`${ENDPOINT_URL}/${userId}/${bookId}`, book);
    return result.data;
  },
  async delete(userId, bookId) {
    const result = await axios.delete(`${ENDPOINT_URL}/${userId}/${bookId}`);
    return result.data;
  },
};

export default bookApi;
