import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const update = async (id, updatedPerson) => {
  try {
    const currentState = await axios.get(`${baseUrl}/${id}`);
    if (!currentState.data) {
      throw new Error("Person not found");
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 404 ||
      error.message === "Person not found"
    ) {
      const notFoundError = new Error("Person not found");
      notFoundError.name = "NotFoundError";
      throw notFoundError;
    }
    throw error;
  }
};

const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    if (error.response?.status === 404) {
      return;
    }
    throw error;
  }
};

export default { getAll, create, update, remove };
