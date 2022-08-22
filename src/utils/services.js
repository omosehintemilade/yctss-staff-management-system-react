import { axiosInstance } from "./axios";

export const getUserProfileData = () => {
  return axiosInstance.get("users/me");
};

export const createUser = (data) => {
  return axiosInstance.post("users/create", data);
};

export const loginFn = (data) => {
  return axiosInstance.post("users/login", data);
};

export const uploadProfilePicsFn = (data) => {
  return axiosInstance.post("users/profile/upload", data);
};

export const editBiodataFn = (data) => {
  return axiosInstance.patch("users/biodata", data);
};

export const createExperienceFn = (data) => {
  return axiosInstance.post("users/experience/create", data);
};

export const getExperiences = () => {
  return axiosInstance.get("users/experience");
};

export const deleteExperience = (eId) => {
  return axiosInstance.delete(`users/experience/${eId}`);
};

export const fetchFiles = () => {
  return axiosInstance.get("users/files");
};

export const deleteFile = (fId) => {
  return axiosInstance.delete(`users/files/${fId}`);
};

export const uploadFile = (data) => {
  return axiosInstance.post("users/files/upload", data);
};

export const fetchAllUsers = () => {
  return axiosInstance.get("admins/users");
};

export const adminFetchUser = (userId) => {
  return axiosInstance.get("admins/user/" + userId);
};

export const updateDocumentStatus = (userId, data) => {
  return axiosInstance.patch(`admins/user/${userId}/document`, data);
};

export const adminEditUser = (userId, data) => {
  return axiosInstance.patch(`admins/user/${userId}`, data);
};
