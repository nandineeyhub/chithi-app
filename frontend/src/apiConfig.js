export const baseURL = "http://localhost:8000/api/";

export const apiUrls = {
    login:"users/login",
    register:"users/register"
}

const token = localStorage.getItem("userData")?.token

export const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // example header
  };

export const headerwithoutauth = {
    "Content-Type": "application/json",
  };