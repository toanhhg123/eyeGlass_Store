import api from "src/config/axios";

export const getAllUser = (params) => {
  return api.get("/user", params);
};

export const createuser = (body) => {
  return api.post("/user", body);
};

export const updateUser = (id, body) => {
  return api.patch(`/user/${id}`, body);
};

export const updateProfile = (body) => {
  return api.patch(`/user/updateProfile`, body);
};

export const changePasswordUser = (id, body) => {
  return api.patch(`/user/changePasswordUser/${id}`, body);
};

export const deleteUser = (id) => {
  return api.delete(`/user/${id}`);
};
