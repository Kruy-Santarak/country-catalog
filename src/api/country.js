import axiosInstance from "../service";

const fetchCountries = async () => {
  const response = await axiosInstance().get("/all");
  return response;
};

const fetchCountryByName = async (name) => {
  const response = await axiosInstance().get(`/name/${name}`);
  return response;
  // try {

  // } catch (error) {
  //   console.log(error);
  //   throw error;
  // }
};

export default {
  fetchCountries,
  fetchCountryByName,
};
