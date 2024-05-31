import axios from "axios";

const ENDPOINT_URL = "/api/book";

const bookApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
  async get(id) {
    const result = await axios.get(ENDPOINT_URL + "/" + id);
    return result.data;
  },
  async post(book) {
    const result = await axios.post(ENDPOINT_URL, book)
    return result.data
  },
  async patch(book) {
    const result = await axios.patch(ENDPOINT_URL + "/" + book._id, book)
    return result.data
  },
  async delete(book) {
    const result = await axios.delete(ENDPOINT_URL + "/" +  book._id)
  }
};

export default bookApi;
