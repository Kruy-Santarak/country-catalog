import { readonly, ref } from "vue";

const useState = (initialState) => {
  // initial state as vue reactive state
  const state = ref(initialState);
  // assign new state value
  const setState = (newState) => {
    state.value = newState;
  };

  return [readonly(state), setState];
};

export default useState;
