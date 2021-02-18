const axios = require("axios");

export const searchCategories = async (name) => {
  try {
    const resp = await axios.get(`/categories/search?search=${name}`);
    return { status: resp.status, categories: resp.data };
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

export const addOrder = async ({ itemName, categoryId }) => {
  try {
    const resp = await axios.post("/orders", { itemName, categoryId });
    return { status: resp.status, order: resp.data };
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
