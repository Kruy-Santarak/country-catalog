import { CountryStore } from ".";
import { country } from "../../../controller/index";

const loadCountries = async ({ commit, state = new CountryStore() }) => {
  try {
    const response = await country.loadCountriesHandler();
    commit("setCountries", response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const clearCountries = async () => {};

export default {
  loadCountries,
  clearCountries,
};
