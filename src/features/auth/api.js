const { default: axios } = require("axios");

export const signup = async ({ name, email, password }) => {
  try {
    const resp = await axios.post("/users/register", { name, email, password });
    return { status: resp.status, data: resp.data };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    if (error.isAxiosError) {
      throw new Error(error.toJSON().message);
    }
    throw new Error(error);
  }
};

export const login = async ({ email, password }) => {
  try {
    const resp = await axios.post("/users/login", { email, password });
    return { status: resp.status, data: resp.data };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    if (error.isAxiosError) {
      throw new Error(error.toJSON().message);
    }
    throw new Error(error);
  }
};
