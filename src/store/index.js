import { createStore } from "vuex";
import country from "./module/country";

const store = createStore({
  namespaced: true,
  modules: {
    country,
  },
});

export default store;
