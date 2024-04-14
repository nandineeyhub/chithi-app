import axiosInt from "./axiosUtil";

const callAPI = async (
  endpoint,
  params = {},
  method,
  data = null,
  headers = {}
) => {
 
  let response;
  switch (method.toLowerCase()) {
    case "get":
      response = await axiosInt.get(endpoint, { headers, params });
      break;
    case "post":
      response = await axiosInt.post(endpoint, data, { headers });
      break;
    case "put":
      response = await axiosInt.put(endpoint, data, { headers });
      break;
    case "delete":
      response = await axiosInt.delete(endpoint, { headers });
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
  return response?.data;
};

export default callAPI;
