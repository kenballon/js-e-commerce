import axios from "axios";
import { apiUrl } from "./config";

export const getProduct = async (id) => {
  try {
    const res = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.statusText !== "OK") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (err) {
    console.log(err);
    return {
      error: err.message,
    };
  }
};
