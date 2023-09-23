import api from "src/config/axios";

export const getAllCategory = (params) => {
  return api.get("/Category", { params });
};

export const createCategory = (Category) => {
  return api.post("/Category", Category);
};

export const updateCategory = (id, Category) => {
  return api.patch(`/Category/${id}`, Category);
};
