import api from "src/config/axios";

export const getAllOrder = (params) => {
  return api.get("/Order", { params });
};

export const createOrder = (Order) => {
  return api.post("/Order", Order);
};

export const updateOrder = (id, Order) => {
  return api.patch(`/Order/${id}`, Order);
};

export const deleteOrder = (id) => {
  return api.delete(`/Order/${id}`);
};
