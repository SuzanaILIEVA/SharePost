import axios from "axios";
import { toast } from "react-toastify";

export const registerAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/register",
      authData
    );

    dispatch({ type: "REGISTER", payload: data });

    window.location = "/";
  } catch (error) {
    toast(
      error.response?.data?.message ||
        "Bir hata oluştu. Lütfen tekrar deneyin.",
      {
        position: "top-right",
        autoClose: 5000,
      }
    );
  }
};

export const loginAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/login", authData);

    dispatch({ type: "LOGIN", payload: data });

    window.location = "/";
  } catch (error) {
    toast(error.response.data.message, {
      position: "top-right",
      autoClose: 5000,
    });
  }
};
