import axiosInstance from "../service";

const fetchCountries = async () => {
  const response = await axiosInstance().get("/all");
  return response;
};

const fetchCountryByName = async (name) => {
  const response = await axiosInstance().get(`/name/${name}`);
  return response;
};

export default {
  fetchCountries,
  fetchCountryByName,
};
