import { CountryStore } from ".";

const setCountries = (state = new CountryStore(), payload = []) => {
  if (payload.length > 0) {
    state.items.push(...payload);
    state.fetched = true;
  }
};

// const sortItems = (state = new CountryStore(), asc = true) => {};

const clearCountries = (state = new CountryStore()) => {
  state.items = [];
};

export default {
  setCountries,
  clearCountries,
};
