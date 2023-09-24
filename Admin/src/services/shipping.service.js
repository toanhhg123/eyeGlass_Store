import api from "src/config/axios";

export const getAllShipping = () => {
  return api.get("/Shipping");
};

export const createShipping = (Shipping) => {
  return api.post("/Shipping", Shipping);
};

export const updateShipping = (id, Shipping) => {
  return api.patch(`/Shipping/${id}`, Shipping);
};
