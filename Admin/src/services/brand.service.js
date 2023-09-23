import api from "src/config/axios";

export const getAllBrand = (params) => {
  return api.get("/Brand", { params });
};

export const createBrand = (Brand) => {
  return api.post("/Brand", Brand);
};

export const updateBrand = (id, Brand) => {
  return api.patch(`/Brand/${id}`, Brand);
};
