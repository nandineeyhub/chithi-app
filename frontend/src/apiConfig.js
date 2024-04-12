export const baseURL = "http://localhost:8000/api/";
export const imgUrl = "http://localhost:8000/api/users/images/"
export const apiUrls = {
  login: "users/login",
  register: "users/register",
  uploadProfilePicture: "users/upload-picture",
  removeProfilePicture: "users/remove-picture",
  updateProfile: "users/update-me",
};

const token = JSON.parse(localStorage.getItem("user"))?.token;

export const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json", // example header
};

export const headerwithoutauth = {
  "Content-Type": "application/json",
};

export const multiPartHeader = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
};
