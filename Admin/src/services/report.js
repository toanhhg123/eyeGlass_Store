import api from "src/config/axios";

export const getReport = () => {
  return api.get("/report");
};
