import axios from "axios";

export const getAllUsers = async (search, page, limit) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/getUsers?page=${page}&search=${search}&limit=${limit}`
    );
    console.log("data", response);
    return response.data;
  } catch (err) {
    console.log("error fetch data", err);
  }
};
