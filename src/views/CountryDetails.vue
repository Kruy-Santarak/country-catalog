<script setup>
import { computed, onMounted } from "vue";
import { useAlert, useState } from "../hooks";
import store from "../store";
import { country } from "../controller";

import { useRoute, useRouter } from "vue-router";
import ErrorModal from "../components/ui/modal/ErrorModal.vue";
import BaseCard from "../components/ui/card/BaseCard.vue";
import CountryDetailsItem from "../components/country/details/CountryDetailsItem.vue";

const route = useRoute();
const [errorMessage, setErrorMessage] = useState(null);
const [loading, setLoading] = useState(false);
const [countryDetails, setCountryDetails] = useState(null);

const countryFetched = computed(
  () => store.getters["country/isCountriesFetched"]
);

const {
  alertIsVisible: errorIsVisible,
  showAlert: showError,
  hideAlert: hideError,
} = useAlert();

const loadCountryByNameHandler = async () => {
  try {
    const { name } = route.params;
    let countryFounded = null;
    setLoading(true);
    if (countryFetched.value) {
      countryFounded = store.getters["country/getCountryByName"](name);
    } else {
      const response = await country.loadCountryDetailsHandler(name);
      countryFounded = response.data;
    }

    if (countryFounded) {
      setCountryDetails(countryFounded);
    } else {
    }
  } catch (error) {
    console.log(error);
    showError();
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
};

onMounted(() => {
  loadCountryByNameHandler();
});
</script>

<template>
  <!-- error modal popup -->
  <ErrorModal
    :message="errorMessage"
    :show="errorIsVisible"
    @close="hideError"
  />
  <!-- details card -->
  <BaseCard class="p-8">
    <CountryDetailsItem :data="countryDetails" :loading="loading" />
  </BaseCard>
</template>

<style lang="scss" scoped></style>
