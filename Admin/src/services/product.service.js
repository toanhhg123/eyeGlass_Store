import api from "src/config/axios";

export const getAllProduct = (params) => {
  return api.get("/product", { params });
};

export const createProduct = (product) => {
  return api.post("/product", product);
};

export const updateProduct = (id, product) => {
  return api.patch(`/product/${id}`, product);
};

export const getAllBrand = () => {
  return api.get("/brand");
};

export const getAllCategory = () => {
  return api.get("/category");
};

export const removeProduct = (id) => {
  return api.delete(`/product/${id}`);
};
