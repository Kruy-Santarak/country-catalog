import CountryDTO from "../model/CountryDTO";
import { countryAPI } from "../api";

const countryMapper = (payload) => {
  const nativeNameFirstObjKey = Object.keys(payload.name.nativeName || {})[0];

  // get official native name
  const officialNativeName =
    nativeNameFirstObjKey &&
    payload.name.nativeName[nativeNameFirstObjKey].official;

  return new CountryDTO(
    payload.name.official,
    payload.altSpellings,
    officialNativeName,
    payload.flags.png,
    payload.idd,
    payload.cca2,
    payload.cca3,
    payload.capital,
    payload.area,
    payload.maps?.googleMaps
  );
};

const loadCountriesHandler = async () => {
  try {
    const response = await countryAPI.fetchCountries();
    console.log(response.data);
    if (response.statusText !== "OK") {
      throw new Error("Something went wrong!");
    } else {
      if (response.data.length > 0) {
        const responseData = response.data.map((item) => countryMapper(item));
        response.data = responseData;
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loadCountryDetailsHandler = async (name = "") => {
  try {
    if (!name.trim().length) {
      throw new Error("Invalid country name. Please check again!");
    }
    const response = await countryAPI.fetchCountryByName(name);
    if (response.statusText !== "OK") {
      throw new Error("Something went wrong!");
    } else {
      if (response.data) {
        const responseData = response.data.map((item) => countryMapper(item));
        response.data = responseData[0];
      }
    }
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  loadCountriesHandler,
  loadCountryDetailsHandler,
};
