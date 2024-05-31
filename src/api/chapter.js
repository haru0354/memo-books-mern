import axios from "axios";

const ENDPOINT_URL = "http://localhost:8080/api/chapter";

const chapterApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
  async get(id) {
    const result = await axios.get(ENDPOINT_URL + "/" + id);
    return result.data;
  },
  async post(chapter) {
    const result = await axios.post(ENDPOINT_URL, chapter);
    return result.data;
  },
  async patch(chapter) {
    const result = await axios.patch(ENDPOINT_URL + "/" + chapter._id, chapter);
    return result.data;
  },
  async delete(chapter) {
    const result = await axios.delete(ENDPOINT_URL + "/" + chapter._id);
  },
};

export default chapterApi
