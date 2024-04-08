export const baseURL = "http://localhost:8000/api/";

export const apiUrls = {
  login: "users/login",
  register: "users/register",
  uploadProfilePicture: "users/upload-picture",
  removeProfilePicture: "users/remove-picture",
};

const token = localStorage.getItem("userData")?.token;

export const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json", // example header
};
