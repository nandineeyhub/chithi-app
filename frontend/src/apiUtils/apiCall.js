import axiosInt from "./axiosUtil";

const callAPI = async (endpoint, params ={}, method, data = null, header = {}) => {

  let response;
  switch (method.toLowerCase()) {
    case "get":
      response = await axiosInt.get(endpoint, { header, params });
      break;
    case "post":
      response = await axiosInt.post(endpoint, data, { header });
      break;
    case "put":
      response = await axiosInt.put(endpoint, data, { header });
      break;
    case "delete":
      response = await axiosInt.delete(endpoint, { header });
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
  return response?.data
};

export default callAPI