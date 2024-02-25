import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export class CountryStore {
  constructor(items = [], fetched = false) {
    this.items = items || [];
    this.fetched = fetched || false;
  }
}

export default {
  namespaced: true,
  state: new CountryStore(),
  actions,
  mutations,
  getters,
};
