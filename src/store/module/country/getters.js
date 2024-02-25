import { CountryStore } from ".";

const getCountries = (state = new CountryStore()) => {
  return state.items;
};

const getCountryByName = (state = new CountryStore()) => {
  if (state.items.length) {
    return (name) =>
      state.items.find(
        (item) => item.officialName.toLowerCase() === name.toLowerCase()
      );
  }
};

const isCountriesFetched = (state = new CountryStore()) => {
  return state.fetched;
};

export const COUNTRY_STORE_GETTERS = {
  GET_COUNTRIES: "getCountries",
  IS_FETCHED: "isCountriesFetched",
};

export default {
  getCountries,
  getCountryByName,
  isCountriesFetched,
};
