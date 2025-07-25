import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/bugs",
});

export const getBugs = async () => {
  const res = await API.get("/");
  return res.data;
};

export const createBug = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};

export const updateBug = async (id, data) => {
  const res = await API.put(`/${id}`, data);
  return res.data;
};

export const deleteBug = async (id) => {
  await API.delete(`/${id}`);
};
