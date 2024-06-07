import axios from "axios";

const ENDPOINT_URL = "http://localhost:8080/api/book";

const bookApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
  async get(bookId) {
    const result = await axios.get(ENDPOINT_URL + "/" + bookId);
    return result.data;
  },
  async post(book) {
    const result = await axios.post(ENDPOINT_URL, book)
    return result.data
  },
  async patch(bookId, book) {
    const result = await axios.patch(ENDPOINT_URL + "/" + bookId, book)
    return result.data
  },
  async delete(bookId) {
    const result = await axios.delete(ENDPOINT_URL + "/" +  bookId)
    return result.data
  }
};

export default bookApi;
