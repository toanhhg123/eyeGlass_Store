import api from "src/config/axios";

export const getAllBlog = (params) => {
  return api.get("/Blog", { params });
};

export const createBlog = (Blog) => {
  return api.post("/Blog", Blog);
};

export const updateBlog = (id, Blog) => {
  return api.patch(`/Blog/${id}`, Blog);
};

export const removeBlog = (id) => {
  return api.delete(`/Blog/${id}`);
};
