<script setup>
import { computed, onMounted } from "vue";
import { useAlert, useState } from "../hooks";
import store from "../store";
import { country } from "../controller";

import BaseSpinner from "../components/ui/BaseSpinner.vue";
import BaseText from "../components/ui/text/BaseText.vue";
import BaseImage from "../components/ui/image/BaseImage.vue";
import { useRoute, useRouter } from "vue-router";
import ErrorModal from "../components/ui/modal/ErrorModal.vue";
import CountryDetailRecord from "../components/country/details/CountryDetailRecord.vue";
import BaseCard from "../components/ui/card/BaseCard.vue";
import CountryDetailsItem from "../components/country/details/CountryDetailsItem.vue";

const route = useRoute();
const router = useRouter();
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
    const { name = "" } = route.params;
    let countryFounded = null;
    setLoading(true);
    if (countryFetched.value) {
      countryFounded = store.getters["country/getCountryByName"](name);
    } else {
      countryFounded = await country.loadCountriesHandler(name);
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
